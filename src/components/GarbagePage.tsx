import { useState } from 'react';
import { garbageData, type GarbageSearchItem } from '../data/garbageData';

interface GarbagePageProps {
  onNavigate: (page: string) => void;
}

export const GarbagePage = ({ onNavigate }: GarbagePageProps) => {
  const now = new Date();

  // 種類別の出し方タップ切替 (デフォルト: 燃えるごみ 'burnable')
  const [activeCategoryTab, setActiveCategoryTab] = useState<'burnable' | 'plastic' | 'recycle' | 'nonburnable'>('burnable');

  // ゴミ分別検索ステート
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GarbageSearchItem[]>([]);

  const nextGarbage = garbageData.getNextGarbageDay(now);
  const yearGarbageMonths = garbageData.yearGarbageMonths;
  const upcomingItems = garbageData.getUpcomingGarbageDays(now, 6);
  const isPlasticsChanged = now >= new Date(2026, 9, 1);

  // 人気のクイック検索ワード
  const popularKeywords = ['傘', '電池', '布団', 'スプレー缶', '小型家電', '段ボール'];

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setSearchResults(garbageData.searchGarbageItems(q));
  };

  // 分別カテゴリごとの次回収集日を取得
  const getCategoryNextDate = (categoryName: string) => {
    const match = upcomingItems.find((item) => item.category.includes(categoryName) || (categoryName.includes('燃える') && item.category.includes('燃える')));
    return match ? `${match.dateStr}（${match.weekday.substring(0, 1)}）` : '近日中';
  };

  return (
    <div className="page-container">
      {/* ─── ページヘッダー (水彩アイコン付き) ─── */}
      <header className="page-header">
        <span className="eyebrow">掛川区域・グループK（令和8年度）</span>
        <h1>ゴミの日・分別案内</h1>
      </header>

      {/* ─── １．次のゴミ収集日カード（本日・明日・あと〇日バッジ付き） ─── */}
      {nextGarbage && nextGarbage.daysLeft !== -1 && (
        <div
          className="unified-card"
          style={{
            background: nextGarbage.daysLeft === 0
              ? 'linear-gradient(135deg, #17365d, #1e40af)'
              : 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
            color: 'var(--white)',
            border: 'none',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.9, letterSpacing: '0.05em' }}>
              🗑️ 次のゴミ収集日
            </span>
            {/* バッジ表示：本日 / 明日 / あと○日 */}
            {nextGarbage.daysLeft === 0 ? (
              <span style={{ background: 'var(--accent)', color: 'var(--primary-dark)', fontSize: '0.82rem', fontWeight: 800, padding: '3px 10px', borderRadius: '6px' }}>
                🚨 本日収集日
              </span>
            ) : nextGarbage.daysLeft === 1 ? (
              <span style={{ background: '#f59e0b', color: '#fff', fontSize: '0.82rem', fontWeight: 800, padding: '3px 10px', borderRadius: '6px' }}>
                🌟 明日
              </span>
            ) : (
              <span style={{ background: 'rgba(255,255,255,0.22)', color: '#fff', fontSize: '0.82rem', fontWeight: 700, padding: '3px 10px', borderRadius: '6px' }}>
                あと {nextGarbage.daysLeft} 日
              </span>
            )}
          </div>

          <h2 style={{ color: 'var(--white)', border: 'none', padding: 0, margin: '6px 0 4px', fontSize: '1.75rem', fontFamily: 'var(--font-sans)', fontWeight: 800 }}>
            {nextGarbage.date}（{nextGarbage.dayOfWeek}）
          </h2>
          <p style={{ color: 'var(--white)', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>
            {nextGarbage.category}
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', background: 'rgba(255,255,255,0.18)', padding: '4px 10px', borderRadius: '6px' }}>
            <span>⏰</span>
            <span>朝8:30までに集積所へ出してください</span>
          </div>
        </div>
      )}

      {/* ─── ２．「これ何ゴミ？」分別クイック検索（最上部繰り上げ＆人気タグ） ─── */}
      <section className="unified-card" style={{ borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.3rem' }}>🔍</span>
          <h2 style={{ margin: 0, padding: 0, border: 'none', fontSize: '1.15rem', color: 'var(--primary-dark)', fontWeight: 800 }}>
            これ何ゴミ？ 分別クイック検索
          </h2>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.45 }}>
          品名を入力するか、よく調べる品目をタップすると分別方法と次回収集日がわかります。
        </p>

        {/* 人気ワードのクイック検索ボタン */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, alignSelf: 'center' }}>よく検索:</span>
          {popularKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => handleSearchChange(kw)}
              style={{
                background: searchQuery === kw ? 'var(--primary)' : 'var(--bg)',
                color: searchQuery === kw ? 'var(--white)' : 'var(--primary)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {kw}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="品名を入力（例: 傘、フライパン、電池）..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: '8px',
            border: '1.5px solid var(--border)',
            fontSize: '0.95rem',
            outline: 'none',
            background: 'var(--bg)'
          }}
        />

        {searchResults.length > 0 ? (
          <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {searchResults.map((item, i) => (
              <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--text)' }}>{item.name}</strong>
                  <span style={{ background: 'var(--primary-soft)', color: 'var(--primary)', fontSize: '0.84rem', padding: '3px 10px', borderRadius: '6px', fontWeight: 700, flexShrink: 0 }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  📅 <strong>次回収集日目安:</strong> {getCategoryNextDate(item.category)} <br />
                  💡 <strong>出し方の注意:</strong> {item.note}
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery.trim() !== '' ? (
          <div style={{ marginTop: '12px', padding: '14px', background: 'var(--bg)', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            ⚠️ <strong>「{searchQuery}」に一致する品目が見つかりませんでした。</strong>
            <ul style={{ paddingLeft: '1.2em', margin: '6px 0 0 0' }}>
              <li>別の名称で検索してみてください（例: 「乾電池」「充電池」）</li>
              <li>画面下部の「掛川市 ゴミ分別検索↗」をご参照ください</li>
              <li>自治会または市役所へお問い合わせください</li>
            </ul>
          </div>
        ) : null}
      </section>

      {/* ─── ３．直近のゴミの日（次の1件を薄い藍色背景で強調） ─── */}
      <div className="unified-card" style={{ borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '12px' }}>
          📅 直近のゴミの日
        </h2>
        <div className="garbage-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {upcomingItems.map((item, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={item.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: isFirst ? '12px 14px' : '10px 12px',
                  background: isFirst ? 'var(--primary-soft)' : 'var(--bg)',
                  borderRadius: '8px',
                  borderLeft: isFirst ? '4px solid var(--primary)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: isFirst ? 'var(--primary-dark)' : 'var(--text-muted)' }}>
                    {item.dateStr}（{item.weekday.substring(0, 1)}）
                  </span>
                  {isFirst && (
                    <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.75rem', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      次
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)' }}>
                  <span>{item.icon}</span>
                  <span>{item.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── ５．種類別の出し方（タップ切り替えアコーディオン） ─── */}
      <div className="unified-card" style={{ borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '12px' }}>
          👀 種類別の正しい出し方
        </h2>

        {/* タップ選択ボタン */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '14px' }}>
          {[
            { id: 'burnable',    label: '🗑️ 燃えるごみ',   color: '#dc2626' },
            { id: 'plastic',     label: '♻️ プラスチック', color: '#2563eb' },
            { id: 'recycle',     label: '🥫 資源ごみ',     color: '#b45309' },
            { id: 'nonburnable', label: '🔋 燃えないごみ', color: '#4b5563' },
          ].map((tab) => {
            const isActive = activeCategoryTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryTab(tab.id as any)}
                style={{
                  padding: '10px 6px',
                  borderRadius: '8px',
                  border: isActive ? `2px solid ${tab.color}` : '1.5px solid var(--border)',
                  background: isActive ? 'var(--card-bg)' : 'var(--bg)',
                  color: isActive ? tab.color : 'var(--text)',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* タップされた詳細内容 */}
        <div style={{ background: 'var(--bg)', padding: '14px', borderRadius: '8px' }}>
          {activeCategoryTab === 'burnable' && (
            <div>
              <strong style={{ color: '#dc2626', fontSize: '1rem', display: 'block', marginBottom: '8px' }}>🗑️ 燃えるごみ（毎週 火・金曜日）</strong>
              <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text)' }}>
                <p style={{ margin: '0 0 6px 0' }}><strong>✅ 出せるもの:</strong> 生ごみ、紙くず、衣類、木くずなど</p>
                <p style={{ margin: '0 0 6px 0' }}><strong>📦 出し方:</strong> 掛川市指定ごみ袋（赤文字）に入れて出してください</p>
                <p style={{ margin: 0, color: 'var(--danger)' }}><strong>🚫 いれてはいけないもの:</strong> スプレー缶、電池、金属製品</p>
              </div>
            </div>
          )}

          {activeCategoryTab === 'plastic' && (
            <div>
              <strong style={{ color: '#2563eb', fontSize: '1rem', display: 'block', marginBottom: '8px' }}>♻️ プラスチック（毎週 水曜日）</strong>
              <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text)' }}>
                <p style={{ margin: '0 0 6px 0' }}><strong>✅ 出せるもの:</strong> プラマークのある容器包装、トレイ、パック類</p>
                <p style={{ margin: '0 0 6px 0' }}><strong>📦 出し方:</strong> 汚れをサッと洗って落とし、集積所の青ネット袋へ直接出してください</p>
                {isPlasticsChanged ? (
                  <p style={{ margin: 0, color: 'var(--primary)' }}><strong>💡 お知らせ:</strong> バケツ・ハンガーなどの製品プラスチックも一緒に回収されます。</p>
                ) : (
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}><strong>※注意:</strong> バケツやハンガーなどの製品プラスチックは2026年10月1日より回収開始予定です。</p>
                )}
              </div>
            </div>
          )}

          {activeCategoryTab === 'recycle' && (
            <div>
              <strong style={{ color: '#b45309', fontSize: '1rem', display: 'block', marginBottom: '8px' }}>🥫 資源ごみ（毎月 第3水曜日）</strong>
              <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text)' }}>
                <p style={{ margin: '0 0 6px 0' }}><strong>✅ 出せるもの:</strong> 空き缶（アルミ・スチール）、空きびん、ペットボトル</p>
                <p style={{ margin: '0 0 6px 0' }}><strong>📦 出し方:</strong> 中を軽く洗ってキャップを取り、専用の回収コンテナへ分別して出してください</p>
              </div>
            </div>
          )}

          {activeCategoryTab === 'nonburnable' && (
            <div>
              <strong style={{ color: '#4b5563', fontSize: '1rem', display: 'block', marginBottom: '8px' }}>🔋 燃えないごみ（毎月 第2月曜日）</strong>
              <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text)' }}>
                <p style={{ margin: '0 0 6px 0' }}><strong>✅ 出せるもの:</strong> 金属類、ガラス、陶器、小型家電、電球など</p>
                <p style={{ margin: '0 0 6px 0' }}><strong>📦 出し方:</strong> 品目別のコンテナや指定袋に入れて出してください</p>
                <p style={{ margin: 0, color: 'var(--danger)' }}><strong>⚠️ 重要:</strong> モバイルバッテリーや充電池は事故防止のため乾電池用コンテナへ！</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── ５．年間カレンダー（12か月を一覧表示） ─── */}
      <div className="unified-card annual-garbage-calendar">
        <h2>🗓️ 年間カレンダー</h2>

        <div className="annual-garbage-grid">
          {yearGarbageMonths.map((monthData, idx) => {
            const burnableDays = garbageData.getRegularCollectionDays(monthData.year, monthData.month, [2, 5]);
            const plasticDays  = garbageData.getRegularCollectionDays(monthData.year, monthData.month, [3]);
            return (
              <div key={idx} className="annual-garbage-month">
                <strong>{monthData.label}</strong>
                <span className="annual-garbage-type annual-garbage-burnable">燃える {burnableDays}</span>
                <span className="annual-garbage-type annual-garbage-plastic">プラ {plasticDays}</span>
                <span className="annual-garbage-type annual-garbage-recycle">資源 {monthData.recycle}日</span>
                <span className="annual-garbage-type annual-garbage-nonburnable">不燃 {monthData.nonburnable}日</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── ７．注意事項（すっきり整理） ─── */}
      <div className="info-box blue" style={{ borderRadius: '8px' }}>
        <div className="info-icon">💡</div>
        <div className="info-content">
          <h3>出し方の共通ルール</h3>
          <p>前日や夜間のゴミ出しは動物の荒らしの原因になります。必ず当日の朝8時30分までに出すようご協力をお願いします。</p>
        </div>
      </div>

      <div className="info-box red" style={{ borderRadius: '8px' }}>
        <div className="info-icon">⚠️</div>
        <div className="info-content">
          <h3>火災事故防止のお願い</h3>
          <p>モバイルバッテリー等の充電池は発火の危険があるため、燃えないごみ袋に入れず、乾電池回収用コンテナへお出しください。</p>
        </div>
      </div>

      {/* ─── ８．掛川市公式リンク ─── */}
      <div className="unified-card" style={{ borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '12px' }}>
          🔗 掛川市公式リンク
        </h2>
        <div className="links-grid">
          <a href="https://www.city.kakegawa.shizuoka.jp/gyosei/docs/26024.html" target="_blank" rel="noopener noreferrer" className="external-link-btn">
            掛川市 ゴミ収集カレンダー <span className="icon">↗</span>
          </a>
          <a href="https://www.city.kakegawa.shizuoka.jp/gyosei/docs/7646.html" target="_blank" rel="noopener noreferrer" className="external-link-btn">
            掛川市 ゴミ分別検索 <span className="icon">↗</span>
          </a>
        </div>
      </div>

      <div className="back-btn-action" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => onNavigate('home_menu')} className="back-btn secondary">📋 自治会メニューに戻る</button>
        <button onClick={() => onNavigate('home')} className="back-btn">🏠 ホームに戻る</button>
      </div>
    </div>
  );
};

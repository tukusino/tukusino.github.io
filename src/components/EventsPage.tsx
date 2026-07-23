import { useState } from 'react';
import { eventData, type SimpleEvent } from '../data/eventData';

interface EventsPageProps {
  onNavigate: (page: string) => void;
}

export const EventsPage = ({ onNavigate }: EventsPageProps) => {
  const now = new Date();
  const currentMonthNum = now.getMonth() + 1; // 1-12

  const [activeTab, setActiveTab] = useState<'tsukushino' | 'wadaoka' | 'org'>('tsukushino');
  // 各種団体タブは現在月を初期オープン
  const [openOrgMonth, setOpenOrgMonth] = useState<number | null>(currentMonthNum);

  // 一覧内のタップで詳細展開するイベントのIDステート
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  // 過去行事の折りたたみ表示ステート
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false);

  // ポスタータップ全画面表示モーダル用のステート
  const [selectedPosterImage, setSelectedPosterImage] = useState<string | null>(null);

  const toggleOrgMonth = (month: string | number) => {
    const parsedMonth = parseInt(String(month).replace(/[^0-9]/g, ''), 10);
    if (Number.isNaN(parsedMonth)) return;
    setOpenOrgMonth(openOrgMonth === parsedMonth ? null : parsedMonth);
  };

  const toggleEventExpand = (id: string) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  // 直近の「次の行事」を取得
  const nextEvent = eventData.getNextHomeEvent(now);

  // つくし野区の行事を分類（みんなの行事 / 自治会運営予定 / 過去行事）
  const tsukushinoResidentEvents: SimpleEvent[] = [];
  const tsukushinoManagementEvents: SimpleEvent[] = [];
  const tsukushinoPastEvents: SimpleEvent[] = [];

  eventData.tsukushinoEvents.forEach((ev) => {
    const status = eventData.getEventStatus(ev.startDate || ev.dateVal, ev.endDate, ev.isDateUndecided, now);
    if (status === 'finished') {
      tsukushinoPastEvents.push(ev);
    } else if (ev.categoryType === 'management') {
      tsukushinoManagementEvents.push(ev);
    } else {
      tsukushinoResidentEvents.push(ev);
    }
  });

  // 和田岡地区の行事を分類（今度〜未来 / 過去）
  const wadaokaUpcomingEvents: SimpleEvent[] = [];
  const wadaokaPastEvents: SimpleEvent[] = [];

  eventData.wadaokaEvents.forEach((ev) => {
    const status = eventData.getEventStatus(ev.startDate || ev.dateVal, ev.endDate, ev.isDateUndecided, now);
    if (status === 'finished') {
      wadaokaPastEvents.push(ev);
    } else {
      wadaokaUpcomingEvents.push(ev);
    }
  });

  // イベント1件の描画コンポーネント
  const renderEventCard = (event: SimpleEvent, idx: number, prefix: string) => {
    const eventId = `${prefix}-${idx}`;
    const isExpanded = expandedEventId === eventId;
    const status = eventData.getEventStatus(event.startDate || event.dateVal, event.endDate, event.isDateUndecided, now);
    const isToday = status === 'today';

    return (
      <div
        key={eventId}
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '12px 0',
          background: isToday ? '#fffbeb' : 'transparent',
          borderRadius: isToday ? '6px' : '0'
        }}
      >
        <div
          onClick={() => toggleEventExpand(eventId)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {status === 'today' && (
                <span style={{ background: 'var(--danger)', color: '#fff', fontSize: '0.72rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                  🚨 本日開催
                </span>
              )}
              <span style={{ fontSize: '0.82rem', color: 'var(--primary-dark)', fontWeight: 700 }}>{event.dateStr}</span>
              {event.time && <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({event.time})</span>}
            </div>
            <h3 style={{ fontSize: '1.05rem', margin: '2px 0 4px', color: 'var(--text)', border: 'none', padding: 0, fontWeight: 700 }}>
              {event.title}
            </h3>
            {event.location && (
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                📍 {event.location}
              </p>
            )}
          </div>

          {/* 自治会行事の水彩サンプル画像サムネイル */}
          {event.image && (
            <img
              src={`${import.meta.env.BASE_URL}${event.image}`}
              alt={event.title}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPosterImage(`${import.meta.env.BASE_URL}${event.image}`);
              }}
              style={{
                width: '72px',
                height: '54px',
                borderRadius: '6px',
                objectFit: 'cover',
                border: '1px solid var(--border)',
                flexShrink: 0,
                cursor: 'pointer'
              }}
              title="タップで拡大表示"
            />
          )}

          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </div>

        {/* アコーディオン詳細展開部分 */}
        {isExpanded && (
          <div
            style={{
              marginTop: '10px',
              padding: '12px',
              background: 'var(--bg)',
              borderRadius: '8px',
              fontSize: '0.86rem',
              lineHeight: 1.6,
              color: 'var(--text)'
            }}
          >
            {event.image && (
              <div style={{ marginBottom: '12px', textAlign: 'center' }}>
                <img
                  src={`${import.meta.env.BASE_URL}${event.image}`}
                  alt={event.title}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPosterImage(`${import.meta.env.BASE_URL}${event.image}`);
                  }}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '350px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    cursor: 'pointer'
                  }}
                  title="タップで拡大表示"
                />
                <span style={{ display: 'block', fontSize: '0.76rem', color: 'var(--primary)', marginTop: '4px', fontWeight: 700 }}>
                  🔍 タップで全画面表示
                </span>
              </div>
            )}
            {event.location && <p style={{ margin: '0 0 4px 0' }}>📍 <strong>会場:</strong> {event.location}</p>}
            {event.target && <p style={{ margin: '0 0 4px 0' }}>👥 <strong>対象:</strong> {event.target}</p>}
            {event.fee && <p style={{ margin: '0 0 4px 0' }}>💰 <strong>参加費:</strong> {event.fee}</p>}
            {event.belongings && <p style={{ margin: '0 0 4px 0' }}>🎒 <strong>持ち物:</strong> {event.belongings}</p>}
            {event.application && <p style={{ margin: '0 0 4px 0' }}>📝 <strong>申込み:</strong> {event.application}</p>}
            {event.rain && <p style={{ margin: '0 0 4px 0', color: 'var(--primary-dark)' }}>☔ <strong>雨天時:</strong> {event.rain}</p>}
            {!event.location && !event.target && !event.belongings && (
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>詳細情報は決まり次第回覧板またはサイトにて案内いたします。</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="page-container">
      {/* ─── ページヘッダー ─── */}
      <header className="page-header">
        <span className="eyebrow">地域の行事・予定</span>
        <h1>行事予定</h1>
      </header>

      {/* ─── １．冒頭に「次の行事」カードを大きくフィーチャー（添付ポスター画像ダイレクト表示） ─── */}
      {nextEvent && nextEvent.daysLeft !== -1 && (
        <div
          className="unified-card"
          style={{
            background: 'linear-gradient(135deg, var(--primary-dark), #1e3a8a)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '20px',
            padding: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.05em' }}>
              🌟 次の地域行事（注目イベント）
            </span>
            <span style={{ background: 'var(--accent)', color: 'var(--primary-dark)', fontSize: '0.85rem', fontWeight: 800, padding: '4px 12px', borderRadius: '6px' }}>
              {nextEvent.daysLeft === 0 ? '🚨 本日開催' : `あと ${nextEvent.daysLeft} 日`}
            </span>
          </div>

          {/* 添付ポスター画像 ＋ 行事タイトル */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <h2 style={{ color: 'var(--white)', border: 'none', padding: 0, margin: 0, fontSize: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 800, textAlign: 'center' }}>
              {nextEvent.title}
            </h2>

            {/* 和田岡地区「2026 納涼祭」にのみ2026納涼祭.pngを動的表示 */}
            {nextEvent.image && (
              <div style={{ width: '100%', maxWidth: '320px', margin: '4px 0', textAlign: 'center' }}>
                <img
                  src={`${import.meta.env.BASE_URL}${nextEvent.image}`}
                  alt={`${nextEvent.title} ポスター`}
                  onClick={() => setSelectedPosterImage(`${import.meta.env.BASE_URL}${nextEvent.image}`)}
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    display: 'block',
                    cursor: 'pointer'
                  }}
                  title="タップで全画面表示"
                />
                <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.85)', display: 'block', marginTop: '4px' }}>
                  🔍 タップで全画面表示
                </span>
              </div>
            )}

            <div style={{ width: '100%', background: 'rgba(255,255,255,0.12)', padding: '12px', borderRadius: '8px', fontSize: '0.88rem', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 4px 0', color: '#fff', fontWeight: 700 }}>
                📅 <strong>日時:</strong> {nextEvent.date} {nextEvent.time ? `${nextEvent.time}` : ''}
              </p>
              {nextEvent.location && (
                <p style={{ margin: '0 0 4px 0', color: '#fff', fontWeight: 700 }}>
                  📍 <strong>会場:</strong> {nextEvent.location}
                </p>
              )}
              {nextEvent.target && (
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.92)' }}>
                  👥 <strong>対象:</strong> {nextEvent.target}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── ２．生活者向け3タブ ＋ 補足説明 ─── */}
      <div className="tab-bar" style={{ display: 'flex', gap: '4px', marginBottom: '6px', background: 'var(--border)', padding: '4px', borderRadius: '8px' }}>
        <button
          className={`tab-btn${activeTab === 'tsukushino' ? ' active' : ''}`}
          onClick={() => setActiveTab('tsukushino')}
          style={{
            flex: 1,
            padding: '8px 0',
            border: 'none',
            borderRadius: '6px',
            background: activeTab === 'tsukushino' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'tsukushino' ? 'var(--white)' : 'var(--text-muted)',
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '0.85rem',
            lineHeight: 1.2,
            transition: 'all 0.15s'
          }}
        >
          自治会の行事
          <span style={{ fontSize: '0.7rem', display: 'block', opacity: 0.85, fontWeight: 500 }}>（つくし野区）</span>
        </button>
        <button
          className={`tab-btn${activeTab === 'wadaoka' ? ' active' : ''}`}
          onClick={() => setActiveTab('wadaoka')}
          style={{
            flex: 1,
            padding: '8px 0',
            border: 'none',
            borderRadius: '6px',
            background: activeTab === 'wadaoka' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'wadaoka' ? 'var(--white)' : 'var(--text-muted)',
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '0.85rem',
            lineHeight: 1.2,
            transition: 'all 0.15s'
          }}
        >
          地区の行事
          <span style={{ fontSize: '0.7rem', display: 'block', opacity: 0.85, fontWeight: 500 }}>（和田岡地区）</span>
        </button>
        <button
          className={`tab-btn${activeTab === 'org' ? ' active' : ''}`}
          onClick={() => setActiveTab('org')}
          style={{
            flex: 1,
            padding: '8px 0',
            border: 'none',
            borderRadius: '6px',
            background: activeTab === 'org' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'org' ? 'var(--white)' : 'var(--text-muted)',
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '0.85rem',
            lineHeight: 1.2,
            transition: 'all 0.15s'
          }}
        >
          団体・サークル
          <span style={{ fontSize: '0.7rem', display: 'block', opacity: 0.85, fontWeight: 500 }}>（各種団体）</span>
        </button>
      </div>

      {/* タップ補足注記 */}
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '16px' }}>
        {activeTab === 'tsukushino' && '📍 つくし野区自治会が主催する催し・会議・作業予定'}
        {activeTab === 'wadaoka' && '🌐 和田岡地区全体で行われる催し・スポーツ交流・まち協予定'}
        {activeTab === 'org' && '👥 子ども会・シニアクラブ・専門部会・各種団体の活動'}
      </div>

      {/* ─── ３．タブコンテンツ ─── */}
      <div className="tab-content">
        {/* === 自治会の行事 タブ === */}
        {activeTab === 'tsukushino' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* A. みんなの行事（イベント・催し物） */}
            <div className="unified-card" style={{ borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '10px' }}>
                🎉 みんなの行事・催し物
              </h2>
              <div>
                {tsukushinoResidentEvents.map((ev, idx) => renderEventCard(ev, idx, 'resident'))}
              </div>
            </div>

            {/* B. 自治会運営予定（会議・総会） */}
            <div className="unified-card" style={{ borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '10px' }}>
                📋 自治会運営予定（役員会・総会）
              </h2>
              <div>
                {tsukushinoManagementEvents.map((ev, idx) => renderEventCard(ev, idx, 'mgmt'))}
              </div>
            </div>

            {/* C. 年間通して行われる定期活動（次回日明示 ＆ 3分類） */}
            <div className="unified-card" style={{ borderRadius: '12px', borderTop: '3.5px solid var(--primary)' }}>
              <h2 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '12px' }}>
                🔄 年間通して行われる定期活動
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* どなたでも参加 */}
                <div>
                  <strong style={{ fontSize: '0.86rem', color: '#166534', display: 'block', marginBottom: '6px' }}>
                    🍵 どなたでも気軽にご参加できます
                  </strong>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '8px' }}>
                    <div style={{ background: '#f0fdf4', padding: '8px 10px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                      <strong style={{ fontSize: '0.82rem', color: '#15803d', display: 'block' }}>なごみ茶ロン</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>毎月第3土曜 (次回 8/15)</span>
                    </div>
                    <div style={{ background: '#f0fdf4', padding: '8px 10px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                      <strong style={{ fontSize: '0.82rem', color: '#15803d', display: 'block' }}>筋ちゃん体操</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>第1・第3水曜 (次回 8/5)</span>
                    </div>
                    <div style={{ background: '#f0fdf4', padding: '8px 10px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                      <strong style={{ fontSize: '0.82rem', color: '#15803d', display: 'block' }}>草刈りボランティア</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>5月〜11月期間</span>
                    </div>
                  </div>
                </div>

                {/* 役員・当番向け */}
                <div>
                  <strong style={{ fontSize: '0.86rem', color: '#1e40af', display: 'block', marginBottom: '6px' }}>
                    🚸 役員・当番・地区担当向け
                  </strong>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '8px' }}>
                    <div style={{ background: '#eff6ff', padding: '8px 10px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                      <strong style={{ fontSize: '0.82rem', color: '#1d4ed8', display: 'block' }}>街頭指導</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>毎月1日・15日 (組長)</span>
                    </div>
                    <div style={{ background: '#eff6ff', padding: '8px 10px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                      <strong style={{ fontSize: '0.82rem', color: '#1d4ed8', display: 'block' }}>公民館清掃</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>月2回 (当番制)</span>
                    </div>
                    <div style={{ background: '#eff6ff', padding: '8px 10px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                      <strong style={{ fontSize: '0.82rem', color: '#1d4ed8', display: 'block' }}>児童見守り</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>登校日朝</span>
                    </div>
                  </div>
                </div>

                {/* 防災活動 */}
                <div>
                  <strong style={{ fontSize: '0.86rem', color: '#b45309', display: 'block', marginBottom: '6px' }}>
                    🚨 防災活動
                  </strong>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '8px' }}>
                    <div style={{ background: '#fffbeb', padding: '8px 10px', borderRadius: '8px', border: '1px solid #fde68a' }}>
                      <strong style={{ fontSize: '0.82rem', color: '#b45309', display: 'block' }}>自主防災訓練</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>組別・毎月</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* D. 終了した過去の行事（折りたたみ収納） */}
            {tsukushinoPastEvents.length > 0 && (
              <div className="unified-card" style={{ borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-muted)', margin: 0 }}>
                    📁 終了した過去の行事 ({tsukushinoPastEvents.length} 件)
                  </h2>
                  <button
                    onClick={() => setShowPastEvents(!showPastEvents)}
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    {showPastEvents ? '閉じる ▲' : '表示する ▼'}
                  </button>
                </div>
                {showPastEvents && (
                  <div style={{ marginTop: '10px', opacity: 0.65 }}>
                    {tsukushinoPastEvents.map((ev, idx) => renderEventCard(ev, idx, 'past'))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* === 地区の行事 タブ === */}
        {activeTab === 'wadaoka' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="unified-card" style={{ borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '12px' }}>
                🌐 和田岡地区 全体予定
              </h2>
              
              {/* 添付ポスター画像付き 特大フィーチャー（8/9 納涼祭） */}
              <div
                style={{
                  background: 'var(--bg)',
                  border: '2px solid var(--primary)',
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.82rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 800 }}>
                    注目地区イベント
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
                    8月9日（日）17:00〜
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '0 0 10px 0' }}>
                  2026 和田岡地区 納涼祭
                </h3>

                {/* ユーザー添付ポスター画像ダイレクト全幅表示 */}
                <div style={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
                  <img
                    src={`${import.meta.env.BASE_URL}icons/nouryousai_poster.jpg`}
                    alt="8/9 納涼祭 公式チラシ・ポスター"
                    onClick={() => setSelectedPosterImage(`${import.meta.env.BASE_URL}icons/nouryousai_poster.jpg`)}
                    style={{
                      width: '100%',
                      maxWidth: '360px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      border: '1px solid var(--border)',
                      display: 'block',
                      margin: '0 auto',
                      cursor: 'pointer'
                    }}
                    title="タップで全画面表示"
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                    🔍 タップで全画面表示
                  </span>
                </div>

                <div style={{ fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--text)' }}>
                  <p style={{ margin: '0 0 4px 0' }}>📍 <strong>会場:</strong> 和田岡小学校 体育館・グラウンド</p>
                  <p style={{ margin: '0 0 4px 0' }}>🍧 <strong>出店:</strong> 夜店・キッチンカー・会場イルミネーション</p>
                  <p style={{ margin: '0 0 4px 0' }}>🎆 <strong>企画:</strong> 子どもの手持ち花火・大人も子供も当たる大抽選会！</p>
                  <p style={{ margin: 0 }}>🎈 <strong>ゲスト:</strong> NEW STEP（バルーン）、瑞穂会（踊り）、チーム愛野公園（フットボール）</p>
                </div>
              </div>

              <div>
                {wadaokaUpcomingEvents
                  .filter((ev) => !ev.title.includes('納涼祭'))
                  .map((ev, idx) => renderEventCard(ev, idx, 'wadaoka'))}
              </div>
            </div>

            {wadaokaPastEvents.length > 0 && (
              <div className="unified-card" style={{ borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-muted)', margin: 0 }}>
                    📁 終了した過去の行事 ({wadaokaPastEvents.length} 件)
                  </h2>
                  <button
                    onClick={() => setShowPastEvents(!showPastEvents)}
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    {showPastEvents ? '閉じる ▲' : '表示する ▼'}
                  </button>
                </div>
                {showPastEvents && (
                  <div style={{ marginTop: '10px', opacity: 0.65 }}>
                    {wadaokaPastEvents.map((ev, idx) => renderEventCard(ev, idx, 'wadaoka-past'))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* === 団体・サークル タブ === */}
        {activeTab === 'org' && (
          <div className="unified-card" style={{ borderRadius: '12px' }}>
            <h2 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '12px' }}>
              👥 各種団体・サークルの月別活動
            </h2>
            <div className="accordion">
              {eventData.organizationMonths.map((org, idx) => {
                const monthNum = parseInt(String(org.month).replace('月', ''), 10);
                const isOpen = openOrgMonth === monthNum;
                const isCurrentMonth = monthNum === currentMonthNum;

                return (
                  <div
                    key={idx}
                    className={`accordion-item${isOpen ? ' open' : ''}`}
                    style={{
                      borderLeft: isCurrentMonth ? '4px solid var(--primary)' : '1px solid var(--border)'
                    }}
                  >
                    <button
                      className="accordion-header"
                      onClick={() => toggleOrgMonth(org.month)}
                      aria-expanded={isOpen}
                      style={{
                        background: isCurrentMonth ? 'var(--primary-soft)' : 'transparent',
                        color: 'var(--primary-dark)',
                        minHeight: '44px',
                        height: 'auto'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {isCurrentMonth && <span style={{ fontSize: '0.75rem', background: 'var(--primary)', color: 'var(--white)', padding: '2px 6px', borderRadius: '4px', flexShrink: 0 }}>今月</span>}
                        {org.month}の活動
                      </span>
                      <span className="accordion-icon">▼</span>
                    </button>
                    {isOpen && (
                      <div className="accordion-content">
                        <div className="event-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {(org.events ?? org.groups).map((event, eIdx) => (
                            <div key={eIdx} style={{ fontSize: '0.85rem', padding: '6px 0', borderBottom: eIdx < (org.events ?? org.groups).length - 1 ? '1px solid var(--border)' : 'none' }}>
                              <strong style={{ color: 'var(--primary)' }}>{event.group ?? event.groupName}:</strong> {event.activity}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="back-btn-action" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
        <button onClick={() => onNavigate('home_menu')} className="back-btn secondary">📋 自治会メニューに戻る</button>
        <button onClick={() => onNavigate('home')} className="back-btn">🏠 ホームに戻る</button>
      </div>

      {/* ─── 🖼️ ポスター画像 全画面表示モーダル ─── */}
      {selectedPosterImage && (
        <div
          onClick={() => setSelectedPosterImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          <div style={{ position: 'relative', maxWidth: 'calc(100vw - 16px)', maxHeight: 'calc(100dvh - 16px)' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedPosterImage(null)}
              style={{
                position: 'fixed',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.94)',
                color: '#1a202c',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700
              }}
              title="閉じる"
            >
              ✕
            </button>
            <img
              src={selectedPosterImage}
              alt="ポスター全画面表示"
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(100dvh - 16px)',
                borderRadius: '2px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};


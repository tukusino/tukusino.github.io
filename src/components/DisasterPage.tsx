import React, { useState, useEffect } from 'react';

interface DisasterPageProps {
  onNavigate: (page: string) => void;
}

export const DisasterPage: React.FC<DisasterPageProps> = ({ onNavigate }) => {
  // メインカテゴリタブ: 'emergency' (災害が起きたとき) | 'stock' (日頃の備え)
  const [mainTab, setMainTab] = useState<'emergency' | 'stock'>('emergency');

  // 災害別行動ガイドタブ: 'earthquake' | 'rain' | 'fire'
  const [disasterType, setDisasterType] = useState<'earthquake' | 'rain' | 'fire'>('earthquake');

  // 備蓄品世帯別タブ: 'basic' | 'home' | 'senior' | 'baby' | 'pet'
  const [householdTab, setHouseholdTab] = useState<'basic' | 'home' | 'senior' | 'baby' | 'pet'>('basic');

  // 持ち出し品チェックリストの状態（ローカルストレージ保存）
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('tukushino_disaster_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tukushino_disaster_checklist', JSON.stringify(checkedItems));
    } catch {
      // ignore
    }
  }, [checkedItems]);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-container">
      {/* ページヘッダー */}
      <header className="page-header">
        <span className="eyebrow">地域の安心・安全のために</span>
        <h1>防災・安全情報</h1>
      </header>

      {/* 1. 現在の防災情報バナー（最上部） */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #1b365d 0%, #2b4c7e 100%)', 
          color: '#ffffff', 
          borderRadius: '12px', 
          padding: '16px 20px', 
          marginBottom: '20px',
          boxShadow: '0 4px 12px rgba(27, 54, 93, 0.15)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '3px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 600 }}>
            平常運用中
          </span>
          <span style={{ fontSize: '0.78rem', opacity: 0.85 }}>
            最終確認: 2026年7月23日 10:30
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>📢</span>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0 }}>現在、自治会からの緊急発表はありません</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, margin: '2px 0 0', lineHeight: 1.4 }}>
              ※この情報は平常時の案内です。実際の災害発生時は掛川市の最新避難情報を優先してください。
            </p>
          </div>
        </div>

        {/* 公式最新情報リンクボタン (指示通りに修正) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginTop: '12px' }}>
          <a
            href="https://www.city.kakegawa.shizuoka.jp/gyosei/docs/10928.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem', textDecoration: 'none', textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 600 }}
          >
            掛川市 洪水・土砂災害ハザードマップ ↗
          </a>
          <a
            href="https://sipos.pref.shizuoka.jp/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem', textDecoration: 'none', textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 600 }}
          >
            静岡県 防災サイポス ↗
          </a>
        </div>
      </div>

      {/* 2. 4大クイックアクセスボタン (2列×2段) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => { setMainTab('emergency'); setTimeout(() => scrollToSection('sec-shelter'), 100); }}
          style={{ background: '#fff', border: '2px solid var(--primary)', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
        >
          <span style={{ fontSize: '1.6rem' }}>🏫</span>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-dark)' }}>避難場所</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>和田岡小学校・公園</div>
          </div>
        </button>

        <button 
          onClick={() => { setMainTab('emergency'); setTimeout(() => scrollToSection('sec-phone'), 100); }}
          style={{ background: '#fff', border: '2px solid #e53e3e', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
        >
          <span style={{ fontSize: '1.6rem' }}>📞</span>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#c53030' }}>緊急連絡先</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>110 / 119 / 市役所</div>
          </div>
        </button>

        <button 
          onClick={() => { setMainTab('emergency'); setTimeout(() => scrollToSection('sec-guide'), 100); }}
          style={{ background: '#fff', border: '2px solid #dd6b20', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
        >
          <span style={{ fontSize: '1.6rem' }}>🏃</span>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#c05621' }}>まず取る行動</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>地震・大雨・火災の備え</div>
          </div>
        </button>

        <button 
          onClick={() => { setMainTab('stock'); setTimeout(() => scrollToSection('sec-stock'), 100); }}
          style={{ background: '#fff', border: '2px solid #319795', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
        >
          <span style={{ fontSize: '1.6rem' }}>🎒</span>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#234e52' }}>持ち出し品チェック</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>非常袋・家庭備蓄・世帯別</div>
          </div>
        </button>
      </div>

      {/* 3. メインカテゴリ切り替えタブ（［災害が起きたとき］ ［日頃の備え］） */}
      <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: '10px', padding: '4px', marginBottom: '20px' }}>
        <button
          onClick={() => setMainTab('emergency')}
          style={{
            flex: 1,
            padding: '12px 10px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: mainTab === 'emergency' ? 'var(--primary)' : 'transparent',
            color: mainTab === 'emergency' ? '#ffffff' : '#4a5568',
            boxShadow: mainTab === 'emergency' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          🚨 災害が起きたとき (緊急時)
        </button>
        <button
          onClick={() => setMainTab('stock')}
          style={{
            flex: 1,
            padding: '12px 10px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: mainTab === 'stock' ? '#2b6cb0' : 'transparent',
            color: mainTab === 'stock' ? '#ffffff' : '#4a5568',
            boxShadow: mainTab === 'stock' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          🎒 日頃の備え (平常時)
        </button>
      </div>

      {/* ─── A. 災害が起きたとき タブコンテンツ ─── */}
      {mainTab === 'emergency' && (
        <>
          {/* ① 冒頭：まず取る行動 5つのステップ */}
          <div id="sec-guide" className="unified-card" style={{ borderLeft: '5px solid #dd6b20' }}>
            <h2 style={{ color: '#c05621', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🏃</span> 災害が起きたら（命を守る5つの行動）
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
              {[
                { step: '1', title: 'まず自分と家族の安全を最優先確保', desc: '姿勢を低くし、頭部を保護。無理に動かず揺れや危険が収まるのを待つ。' },
                { step: '2', title: '火元と周囲の危険を確認', desc: '揺れが収まったらストーブ等の消火。家具の転倒やガラス散乱に注意。' },
                { step: '3', title: '市・自治会の最新情報を確認', desc: 'テレビ・ラジオ・市防災メール・当Webサイト等で正確な情報を収集。' },
                { step: '4', title: '危険を感じたら早めに安全な場所へ避難', desc: '浸水や家屋倒壊等の危険がある場合、明るいうちに避難を開始。' },
                { step: '5', title: '隣近所で声を掛け合い安否確認', desc: '高齢者や避難行動要支援者に声をかけ、地域全体で助け合う。' }
              ].map(item => (
                <div key={item.step} style={{ display: 'flex', gap: '12px', background: '#fffaf0', padding: '12px', borderRadius: '8px', border: '1px solid #feebc8' }}>
                  <div style={{ background: '#dd6b20', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontSize: '0.9rem' }}>
                    {item.step}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.92rem', color: '#7b341e', display: 'block' }}>{item.title}</strong>
                    <span style={{ fontSize: '0.83rem', color: '#4a5568', lineHeight: 1.4, display: 'block', marginTop: '2px' }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ② 災害別の行動ガイド（［地震］［大雨・台風］［火災］） */}
          <div className="unified-card">
            <h2>🛡️ 災害別の行動ガイド</h2>
            <div style={{ display: 'flex', gap: '6px', margin: '12px 0' }}>
              {(['earthquake', 'rain', 'fire'] as const).map(type => {
                const labels = { earthquake: '🏠 地震', rain: '🌧️ 大雨・台風', fire: '🔥 火災' };
                const active = disasterType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setDisasterType(type)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      border: active ? '2px solid var(--primary)' : '1px solid var(--border)',
                      background: active ? 'var(--primary-light)' : '#fff',
                      color: active ? 'var(--primary-dark)' : 'var(--text)',
                      fontWeight: active ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    {labels[type]}
                  </button>
                );
              })}
            </div>

            <div style={{ background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              {disasterType === 'earthquake' && (
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  <li><strong>頭を守る</strong>：机の下に隠れるか、クッション等で頭部を極力保護してください。</li>
                  <li><strong>家具から離れる</strong>：倒れてくる可能性のある大型家具やガラス窓から離れます。</li>
                  <li><strong>揺れが収まってから火元確認</strong>：慌てて火を消しに行かず、揺れが止まってから元栓を切ります。</li>
                  <li><strong>ブロック塀や瓦に注意</strong>：屋外に出る際は落下物や倒壊した壁に近づかないでください。</li>
                  <li><strong>一時集合場所へ移動</strong>：自宅の安全を確認後、安否確認のため「つくしの公園」等へ集合します。</li>
                </ul>
              )}
              {disasterType === 'rain' && (
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  <li><strong>川や水路に近づかない</strong>：増水した用水路や河川の見張りは大変危険ですので避けてください。</li>
                  <li><strong>浸水前に早めに避難</strong>：道路が冠水する前に、明るいうちの安全な移動を心がけてください。</li>
                  <li><strong>夜間・冠水後の無理な移動を回避</strong>：道路状況が見えない場合は、無理に外に出ず建物の上階へ垂直避難します。</li>
                  <li><strong>自宅上階への垂直避難</strong>：浸水の危険が迫っている場合、2階以上の安全な部屋へ移動します。</li>
                  <li><strong>市の避難情報に注視</strong>：掛川市からの避難指示・警戒レベル情報を常時ご確認ください。</li>
                </ul>
              )}
              {disasterType === 'fire' && (
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  <li><strong>大声で周囲へ知らせる</strong>：「火事だー！」と大声で叫び、近隣住民へいち早く異変を伝えます。</li>
                  <li><strong>速やかに119番通報</strong>：落ち着いて住所・火災の状況を伝えます。</li>
                  <li><strong>初期消火は安全な範囲のみ</strong>：天井に火が届く前に消火器を使用。危険を感じたら即退避します。</li>
                  <li><strong>煙を吸わない低い姿勢</strong>：ハンカチ等で口鼻を覆い、姿勢を低くして避難します。</li>
                  <li><strong>一度避難したら絶対に戻らない</strong>：荷物やペットを取りに再入場することは非常に危ないため厳禁です。</li>
                </ul>
              )}
            </div>
          </div>

          {/* ③ 緊急連絡先（タップ発信はNGのため完全テキスト表示） */}
          <div id="sec-phone" className="unified-card">
            <h2>📞 緊急連絡先・通報窓口</h2>
            
            {/* 区分1: 事故・火災・急病（緊急通報） */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e53e3e', marginBottom: '6px', letterSpacing: '0.05em' }}>
                🚨 事故・火災・急病（緊急時）
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div 
                  style={{
                    background: '#fff5f5',
                    border: '2px solid #feb2b2',
                    borderRadius: '10px',
                    padding: '14px 10px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: '#e53e3e', fontWeight: 700, display: 'block' }}>警察（事件・事故）</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#c53030' }}>110番</span>
                </div>

                <div 
                  style={{
                    background: '#fff5f5',
                    border: '2px solid #feb2b2',
                    borderRadius: '10px',
                    padding: '14px 10px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: '#e53e3e', fontWeight: 700, display: 'block' }}>消防・火災・救急</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#c53030' }}>119番</span>
                </div>
              </div>
            </div>

            {/* 区分2: 行政相談・防犯情報 */}
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '6px', letterSpacing: '0.05em' }}>
                🏢 掛川市役所・行政相談
              </div>
              <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--text)' }}>掛川市役所（代表）</strong>
                    <div style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', fontWeight: 700, marginTop: '2px' }}>0537-21-1111</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ④ 避難場所のご案内（和田岡小学校のみ地図案内を維持、その他シンプル化） */}
          <div id="sec-shelter" className="unified-card">
            <h2>🏫 避難場所のご案内</h2>
            
            {/* 用語解説カード */}
            <div style={{ background: '#ebf8ff', padding: '12px', borderRadius: '8px', border: '1px solid #bee3f8', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.82rem', color: '#2b6cb0', lineHeight: 1.5 }}>
                💡 <strong>避難場所の違いについて</strong><br />
                ・<strong>一時集合場所</strong>：近隣住民の安否確認や避難状況を確認するため、まず最初に集まる場所。<br />
                ・<strong>指定避難所</strong>：自宅に戻れない場合などに、一定期間生活を送る施設。
              </div>
            </div>

            {/* 1. つくし野区の一時集合場所 (地図ボタン除外) */}
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '0.98rem', color: 'var(--primary-dark)', margin: '0 0 8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🛝</span> 【つくし野区の一時集合場所】
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>つくしの公園（つくし野区公園）</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>区内の広場・一次避難集合場所</p>
                </div>

                <div style={{ background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>つくし野公民館（つくし野区公会堂）</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>集会施設・災害情報拠点</p>
                </div>
              </div>
            </div>

            {/* 2. 広域避難所（掛川市指定・和田岡小学校のみ） */}
            <div>
              <h3 style={{ fontSize: '0.98rem', color: 'var(--primary-dark)', margin: '0 0 8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🏫</span> 【広域避難所（掛川市指定）】
              </h3>

              <div style={{ background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <strong style={{ fontSize: '1.02rem', color: 'var(--primary-dark)' }}>和田岡小学校</strong>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text)', margin: '4px 0 0' }}>所在地: 掛川市吉岡639番地の2</p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-dark)', fontWeight: 700, display: 'block', marginTop: '4px' }}>
                      ※掛川市公式指定：つくし野区の対象広域避難所です。
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=掛川市立和田岡小学校" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ background: 'var(--primary)', color: '#fff', padding: '6px 10px', borderRadius: '5px', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}
                    >
                      🗺️ 地図を表示
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 避難時の経路選択における安全上の注意書き */}
            <div style={{ marginTop: '12px', background: '#fffaf0', padding: '10px 12px', borderRadius: '6px', border: '1px solid #feebc8', fontSize: '0.8rem', color: '#7b341e', lineHeight: 1.45 }}>
              ⚠️ <strong>経路選択の注意</strong>：実際の避難時は、道路の倒壊・冠水や周辺状況を確認し、常に安全な経路を選択してください。
            </div>
          </div>
        </>
      )}

      {/* ─── B. 日頃の備え タブコンテンツ ─── */}
      {mainTab === 'stock' && (
        <>
          {/* ① 非常用持ち出し品 ＆ 家庭備蓄 チェックリスト (インタラクティブ) */}
          <div id="sec-stock" className="unified-card">
            <h2>🎒 非常用持ち出し品 ＆ 家庭備蓄チェックリスト</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 12px' }}>
              タップするとチェックが入ります（準備状況が自動保存されます）。
            </p>

            {/* 世帯別タブ切替 ［基本持ち出し袋］［家庭備蓄］［高齢者］［乳幼児］［ペット］ */}
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '12px' }}>
              {[
                { id: 'basic', label: '🎒 持ち出し袋 (身につける)' },
                { id: 'home', label: '🏠 家庭備蓄 (自宅保管)' },
                { id: 'senior', label: '👴 高齢者' },
                { id: 'baby', label: '👶 乳幼児' },
                { id: 'pet', label: '🐾 ペット' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setHouseholdTab(tab.id as any)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: householdTab === tab.id ? '2px solid #2b6cb0' : '1px solid var(--border)',
                    background: householdTab === tab.id ? '#ebf8ff' : '#fff',
                    color: householdTab === tab.id ? '#2b6cb0' : 'var(--text)',
                    fontWeight: householdTab === tab.id ? 700 : 500,
                    fontSize: '0.82rem',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* チェックリスト本体 */}
            <div style={{ background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              {householdTab === 'basic' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: 'c1', label: '飲料水（500mlペットボトル数本）' },
                    { id: 'c2', label: '非常食（アルファ米、栄養補助食品）' },
                    { id: 'c3', label: '懐中電灯・予備電池' },
                    { id: 'c4', label: '携帯ラジオ（情報収集用）' },
                    { id: 'c5', label: '常備薬・お薬手帳' },
                    { id: 'c6', label: 'モバイルバッテリー・充電コード' },
                    { id: 'c7', label: '現金（小銭含む）・身分証のコピー' },
                    { id: 'c8', label: 'マスク・消毒液・雨具' }
                  ].map(item => (
                    <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={!!checkedItems[item.id]} 
                        onChange={() => toggleCheck(item.id)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }} 
                      />
                      <span style={{ textDecoration: checkedItems[item.id] ? 'line-through' : 'none', color: checkedItems[item.id] ? 'var(--text-muted)' : 'var(--text)' }}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {householdTab === 'home' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: 'h1', label: '飲料水（1人1日3L × 3日〜7日分）' },
                    { id: 'h2', label: '非常食・保存食（3日〜7日分）' },
                    { id: 'h3', label: 'カセットコンロ・予備ボンベ' },
                    { id: 'h4', label: '簡易トイレ（パック式・処理袋）' },
                    { id: 'h5', label: '生活用水（お風呂の水の汲み置き等）' },
                    { id: 'h6', label: 'トイレットペーパー・ポリ袋・ラップ' }
                  ].map(item => (
                    <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={!!checkedItems[item.id]} 
                        onChange={() => toggleCheck(item.id)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }} 
                      />
                      <span style={{ textDecoration: checkedItems[item.id] ? 'line-through' : 'none', color: checkedItems[item.id] ? 'var(--text-muted)' : 'var(--text)' }}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {householdTab === 'senior' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: 's1', label: 'お薬手帳・持病の常備薬' },
                    { id: 's2', label: '補聴器・予備電池' },
                    { id: 's3', label: '予備の眼鏡・老眼鏡' },
                    { id: 's4', label: '介護用品・大人用おむつ' },
                    { id: 's5', label: '緊急連絡カード（かかりつけ医・家族連絡先）' }
                  ].map(item => (
                    <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={!!checkedItems[item.id]} 
                        onChange={() => toggleCheck(item.id)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }} 
                      />
                      <span style={{ textDecoration: checkedItems[item.id] ? 'line-through' : 'none', color: checkedItems[item.id] ? 'var(--text-muted)' : 'var(--text)' }}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {householdTab === 'baby' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: 'b1', label: '粉ミルク・液体ミルク・哺乳瓶' },
                    { id: 'b2', label: '紙おむつ・おしりふき' },
                    { id: 'b3', label: '母子健康手帳' },
                    { id: 'b4', label: '抱っこひも' },
                    { id: 'b5', label: '離乳食・おやつ' }
                  ].map(item => (
                    <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={!!checkedItems[item.id]} 
                        onChange={() => toggleCheck(item.id)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }} 
                      />
                      <span style={{ textDecoration: checkedItems[item.id] ? 'line-through' : 'none', color: checkedItems[item.id] ? 'var(--text-muted)' : 'var(--text)' }}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {householdTab === 'pet' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: 'p1', label: 'ペットフード・水（5日分以上）' },
                    { id: 'p2', label: 'キャリーバッグ・ケージ' },
                    { id: 'p3', label: '首輪・リード' },
                    { id: 'p4', label: 'ワクチンの接種記録・写真' }
                  ].map(item => (
                    <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={!!checkedItems[item.id]} 
                        onChange={() => toggleCheck(item.id)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }} 
                      />
                      <span style={{ textDecoration: checkedItems[item.id] ? 'line-through' : 'none', color: checkedItems[item.id] ? 'var(--text-muted)' : 'var(--text)' }}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ② 自治会の防犯・防災設備 ＆ 保管・運用ガイド */}
          <div className="unified-card">
            <h2>🎪 自治会の防災設備 ＆ 保管・運用体制</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '0 0 12px' }}>
              つくし野区自治会では、自主防災会のもとで地域住民のための資機材を整備・維持管理しています。
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', display: 'block' }}>
                  🎪 防災用大型テント ＆ 専用簡易トイレテント
                </strong>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.45, display: 'block', marginTop: '4px' }}>
                  災害発生時、公園や公会堂前で速やかに設営できる「大型防災テント」およびプライバシーを保護する「トイレ用テント（専用簡易トイレ付）」を備蓄・管理しています。
                </span>
                <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'var(--primary-dark)', background: '#fff', padding: '6px 10px', borderRadius: '4px', border: '1px dashed var(--border)' }}>
                  📍 保管場所: 自治会防災倉庫 ／ 管理: 自主防災会 ／ 使用: 災害対策本部の判断により開設
                </div>
              </div>

              <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', display: 'block' }}>
                  🔦 主な備蓄資機材（救助・発電・照明用品）
                </strong>
                <ul style={{ margin: '4px 0 0', paddingLeft: '20px', fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <li>発電機・投光器・LEDコードリール（夜間照明用）</li>
                  <li>救助用工具セット（バール、スコップ、鋸など）</li>
                  <li>大型ヘルメット・防災腕章・救急医療箱</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 4. 「防犯・交通安全」独立セクション（共通掲載） */}
      <div className="unified-card">
        <h2>🛡️ 防犯・交通安全・道路の安全</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 12px' }}>
          地域の防犯・通学路の安全および防犯灯の故障に関するお問い合わせ・対応窓口です。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <strong style={{ fontSize: '0.92rem', color: 'var(--primary-dark)', display: 'block' }}>
              📹 区入り口 防犯カメラの設置運用（防犯抑止）
            </strong>
            <span style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.45, display: 'block', marginTop: '2px' }}>
              空き巣・不審者対策および交通安全の抑止のため、つくし野区入り口に「防犯カメラ」を設置し運用しています。
            </span>
          </div>

          <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <strong style={{ fontSize: '0.92rem', color: 'var(--primary-dark)', display: 'block' }}>
              💡 防犯灯の切れ・道路の危険箇所を発見した場合
            </strong>
            <span style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.45, display: 'block', marginTop: '2px' }}>
              街路灯の球切れや道路・カーブミラーの異常を発見した場合は、お近くの組長または自治会役員へご連絡ください。
            </span>
          </div>
        </div>
      </div>

      {/* 5. 画面下部ナビゲーションボタン */}
      <div className="back-btn-action" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
        <button onClick={() => onNavigate('home_menu')} className="back-btn secondary">📋 自治会メニューに戻る</button>
        <button onClick={() => onNavigate('home')} className="back-btn">🏠 ホームに戻る</button>
      </div>
    </div>
  );
};

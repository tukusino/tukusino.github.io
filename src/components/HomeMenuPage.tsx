import React from 'react';

interface HomeMenuPageProps {
  onNavigate: (page: string) => void;
  onOpenContact?: () => void;
}

export const HomeMenuPage: React.FC<HomeMenuPageProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="page-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* ページヘッダー */}
      <header className="page-header">
        <span className="eyebrow">つくし野区のご案内</span>
        <h1>自治会メニュー</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '6px 0 0', lineHeight: 1.45 }}>
          暮らしに必要な情報や各種手続きをご案内します。
        </p>
      </header>

      {/* 1. 最上部「よく使うメニュー」4大ショートカット (2x2 グリッド) */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '8px', letterSpacing: '0.05em' }}>
          ⚡ よく使うメニュー
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
          <button 
            onClick={() => onNavigate('circular')}
            style={{
              background: '#ffffff',
              border: '2px solid var(--primary-soft)',
              borderRadius: '10px',
              padding: '12px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '1.6rem' }}>📄</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-dark)' }}>回覧板を見る</span>
          </button>

          <button 
            onClick={() => onNavigate('facility')}
            style={{
              background: '#ffffff',
              border: '2px solid var(--primary-soft)',
              borderRadius: '10px',
              padding: '12px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '1.6rem' }}>🏠</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-dark)' }}>公会堂予約</span>
          </button>

          <button 
            onClick={() => onNavigate('disaster')}
            style={{
              background: '#ffffff',
              border: '2px solid #feebc8',
              borderRadius: '10px',
              padding: '12px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '1.6rem' }}>🚨</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#c05621' }}>防災・安全</span>
          </button>

          <button 
            onClick={() => onNavigate('faq')}
            style={{
              background: '#ffffff',
              border: '2px solid var(--primary-soft)',
              borderRadius: '10px',
              padding: '12px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '1.6rem' }}>❓</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-dark)' }}>よくある質問</span>
          </button>
        </div>
      </div>

      {/* 2. メニューグループ（暮らし・手続き / 安心・安全 / 自治会について） */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* グループ① 🏡 暮らし・手続き */}
        <div className="unified-card">
          <h2 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', margin: '0 0 12px', borderBottom: '2px solid var(--primary-soft)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🏡</span> 暮らし・手続き
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {/* 1. 回覧板・配布資料を見る (強調) */}
            <button 
              className="external-link-btn" 
              onClick={() => onNavigate('circular')} 
              style={{
                width: '100%',
                cursor: 'pointer',
                textAlign: 'left',
                textDecoration: 'none',
                borderLeft: '4px solid var(--primary)',
                background: '#f8fafc'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={`${import.meta.env.BASE_URL}icons/icon_circular.jpg`} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    回覧板・配布資料を見る
                    <span style={{ fontSize: '0.68rem', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>よく使われています</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>最新の回覧板と過去の配布資料を確認</div>
                </div>
              </span>
              <span className="icon">→</span>
            </button>

            {/* 2. 公会堂を利用する (強調) */}
            <button 
              className="external-link-btn" 
              onClick={() => onNavigate('facility')} 
              style={{
                width: '100%',
                cursor: 'pointer',
                textAlign: 'left',
                textDecoration: 'none',
                borderLeft: '4px solid var(--primary)',
                background: '#f8fafc'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={`${import.meta.env.BASE_URL}icons/icon_facility.jpg`} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    公会堂を利用する
                    <span style={{ fontSize: '0.68rem', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>よく使われています</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>予約方法・利用料金・設備を確認</div>
                </div>
              </span>
              <span className="icon">→</span>
            </button>

            {/* 3. 自治会への加入・変更 */}
            <button className="external-link-btn" onClick={() => onNavigate('join')} style={{ width: '100%', cursor: 'pointer', textAlign: 'left', textDecoration: 'none' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={`${import.meta.env.BASE_URL}icons/icon_join.jpg`} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>自治会への加入案内・変更</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>入会・退会・世帯変更等の各種手続き</div>
                </div>
              </span>
              <span className="icon">→</span>
            </button>

            {/* 4. よくある質問 */}
            <button className="external-link-btn" onClick={() => onNavigate('faq')} style={{ width: '100%', cursor: 'pointer', textAlign: 'left', textDecoration: 'none' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={`${import.meta.env.BASE_URL}icons/icon_faq.jpg`} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>よくある質問（Q&A）</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>会費、ゴミ当番、役員免除などの質問集</div>
                </div>
              </span>
              <span className="icon">→</span>
            </button>
          </div>
        </div>

        {/* グループ② 🛡️ 安心・安全 */}
        <div className="unified-card">
          <h2 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', margin: '0 0 12px', borderBottom: '2px solid var(--primary-soft)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🛡️</span> 安心・安全
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {/* 5. 防災・安全情報 (強調) */}
            <button 
              className="external-link-btn" 
              onClick={() => onNavigate('disaster')} 
              style={{
                width: '100%',
                cursor: 'pointer',
                textAlign: 'left',
                textDecoration: 'none',
                borderLeft: '4px solid #dd6b20',
                background: '#fffaf0'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={`${import.meta.env.BASE_URL}icons/icon_disaster.jpg`} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.96rem', color: '#c05621', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    防災・安全情報
                    <span style={{ fontSize: '0.68rem', background: '#feebc8', color: '#c05621', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>重要</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>避難場所、緊急連絡先、防災の備え</div>
                </div>
              </span>
              <span className="icon">→</span>
            </button>

            {/* 6. 暮らしに役立つリンク */}
            <button className="external-link-btn" onClick={() => onNavigate('links')} style={{ width: '100%', cursor: 'pointer', textAlign: 'left', textDecoration: 'none' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={`${import.meta.env.BASE_URL}icons/icon_links.jpg`} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>暮らしに役立つリンク</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>掛川市役所や地域の便利外部サイト</div>
                </div>
              </span>
              <span className="icon">→</span>
            </button>
          </div>
        </div>

        {/* グループ③ ℹ️ 自治会について */}
        <div className="unified-card">
          <h2 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', margin: '0 0 12px', borderBottom: '2px solid var(--primary-soft)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>ℹ️</span> 自治会について
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {/* 7. つくし野区自治会について */}
            <button className="external-link-btn" onClick={() => onNavigate('about')} style={{ width: '100%', cursor: 'pointer', textAlign: 'left', textDecoration: 'none' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={`${import.meta.env.BASE_URL}icons/icon_about.jpg`} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>つくし野区自治会について</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>つくし野区の基本情報、沿革、活動内容</div>
                </div>
              </span>
              <span className="icon">→</span>
            </button>

            {/* 8. 役員と自治会のしくみ */}
            <button className="external-link-btn" onClick={() => onNavigate('organization')} style={{ width: '100%', cursor: 'pointer', textAlign: 'left', textDecoration: 'none' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={`${import.meta.env.BASE_URL}icons/icon_org.jpg`} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>役員と自治会のしくみ</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>役員の役割、組・専門部会の組織構成</div>
                </div>
              </span>
              <span className="icon">→</span>
            </button>
          </div>
        </div>

      </div>

      {/* 3. こんなときはこちら（目的別ガイド） */}
      <div className="unified-card" style={{ marginTop: '20px', background: '#f8fafc', border: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1rem', color: 'var(--primary-dark)', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          💡 こんなときはこちら（お困りごと別案内）
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          {[
            { q: '🏠 引っ越してきた', action: '加入・変更', target: 'join' },
            { q: '🔑 公会堂を予約したい', action: '公会堂を利用する', target: 'facility' },
            { q: '📄 回覧板を見逃した', action: '回覧板・配布資料', target: 'circular' },
            { q: '💡 防犯灯の不具合を知らせたい', action: '防災・安全情報', target: 'disaster' },
            { q: '💰 会費を確認したい', action: 'よくある質問', target: 'faq' }
          ].map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => onNavigate(item.target)}
              style={{ background: '#fff', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)' }}>{item.q}</span>
              <span style={{ fontSize: '0.76rem', color: 'var(--primary)', fontWeight: 700 }}>{item.action} ›</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 最下部 お問い合わせ導線 */}
      <div style={{ background: '#edf2f7', borderRadius: '12px', padding: '16px 20px', textAlign: 'center', marginTop: '20px' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '4px' }}>
          どこを見ればよいか分からない方へ
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 12px' }}>
          自治会活動やご近所のことでご不明な点がございましたら、お気軽にお問い合わせください。
        </p>
        <button 
          onClick={onOpenContact} 
          style={{
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            padding: '10px 24px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(23,54,93,0.2)'
          }}
        >
          ✉️ 自治会へ問い合わせる
        </button>
      </div>

      {/* 画面下部ナビゲーションボタン */}
      <div className="back-btn-action" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
        <button onClick={() => onNavigate('home')} className="back-btn">🏠 ホームに戻る</button>
      </div>
    </div>
  );
};

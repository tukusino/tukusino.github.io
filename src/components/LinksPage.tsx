import React from 'react';

interface LinksPageProps {
  onNavigate: (page: string) => void;
}

export const LinksPage: React.FC<LinksPageProps> = ({ onNavigate }) => {
  return (
    <div className="page-container" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <header className="page-header">
        <span className="eyebrow">暮らしに役立つ外部サイト</span>
        <h1>関連リンク集</h1>
      </header>

      {/* 1. 目的別 暮らしの主要リンクナビ */}
      <div className="unified-card" style={{ borderLeft: '4.5px solid var(--accent)' }}>
        <h2 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', marginBottom: '14px' }}>💡 目的から探す（暮らしの案内）</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          
          {/* 🚑 休日・夜間の救急診療 */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 14px' }}>
            <a 
              href="https://www.city.kakegawa.shizuoka.jp/gyosei/docs/8908.html" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block', marginBottom: '6px' }}
            >
              <strong style={{ fontSize: '0.98rem', color: 'var(--danger)', display: 'block', fontWeight: 700 }}>
                🚑 休日・夜間の救急診療 ↗
              </strong>
            </a>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 6px', lineHeight: 1.4 }}>
              小笠掛川急患診療所のご案内。平日夜間、日曜・祝日、年末年始の救急診療について確認できます。
            </p>
            <a 
              href="https://www.city.kakegawa.shizuoka.jp/gyosei/docs/8906.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ fontSize: '0.78rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
            >
              ・小笠医師会管内 医療機関診療のご案内 ↗
            </a>
          </div>

          {/* 🗑️ 粗大ごみ・資源処理 */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 14px' }}>
            <a 
              href="https://www.city.kakegawa.shizuoka.jp/gyosei/kurashi/gomi/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block', marginBottom: '6px' }}
            >
              <strong style={{ fontSize: '0.98rem', color: 'var(--primary-dark)', display: 'block', fontWeight: 700 }}>
                🗑️ 粗大ごみ・資源処理 ↗
              </strong>
            </a>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 6px', lineHeight: 1.4 }}>
              粗大ごみ・ごみ分別・リサイクル回収をまとめて検索できる掛川市公式ポータルです。
            </p>
            <a 
              href="https://www.city.kakegawa.shizuoka.jp/gyosei/docs/7954.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ fontSize: '0.78rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
            >
              ・環境資源ギャラリーのご案内 ↗
            </a>
          </div>

          {/* 🏛️ 市役所窓口・手続き */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 14px' }}>
            <a 
              href="https://www.city.kakegawa.shizuoka.jp/gyosei/kurashi/koseki/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block', marginBottom: '6px' }}
            >
              <strong style={{ fontSize: '0.98rem', color: 'var(--primary-dark)', display: 'block', fontWeight: 700 }}>
                🏛️ 市役所窓口・手続き ↗
              </strong>
            </a>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 6px', lineHeight: 1.4 }}>
              戸籍・住民票・印鑑登録・マイナンバーカードの手続き・市民課窓口案内。
            </p>
            <a 
              href="https://www.city.kakegawa.shizuoka.jp/gyosei/docs/7876.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ fontSize: '0.78rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
            >
              ・掛川市役所本庁舎の場所・開庁時間 ↗
            </a>
          </div>

          {/* 🚌 バス・公共交通 */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 14px' }}>
            <a 
              href="https://www.city.kakegawa.shizuoka.jp/gyosei/kurashi/kotsu/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block', marginBottom: '6px' }}
            >
              <strong style={{ fontSize: '0.98rem', color: 'var(--primary-dark)', display: 'block', fontWeight: 700 }}>
                🚌 バス・公共交通 ↗
              </strong>
            </a>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 6px', lineHeight: 1.4 }}>
              掛川市自主運行バス、デマンド型乗合タクシーなどの公共交通案内。
            </p>
            <a 
              href="https://www.city.kakegawa.shizuoka.jp/gyosei/mobile/docs/792154.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ fontSize: '0.78rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
            >
              ・自主運行バス時刻表・運賃表 ↗
            </a>
          </div>

        </div>
      </div>

      {/* 2. 掛川市公式 ＆ 防災公式ポータル */}
      <div className="unified-card">
        <h2>🏛️ 掛川市公式 ＆ 防災公式ポータル</h2>
        <div className="links-grid" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a href="https://www.city.kakegawa.shizuoka.jp/" target="_blank" rel="noopener noreferrer" className="external-link-btn">
            掛川市役所 公式ホームページ <span className="icon">↗</span>
          </a>
          <a href="https://sipos.pref.shizuoka.jp/" target="_blank" rel="noopener noreferrer" className="external-link-btn">
            静岡県 防災サイポス（サイポスレーダー） <span className="icon">↗</span>
          </a>
          <a href="https://www.city.kakegawa.shizuoka.jp/gyosei/docs/10928.html" target="_blank" rel="noopener noreferrer" className="external-link-btn">
            掛川市 洪水・土砂災害ハザードマップ <span className="icon">↗</span>
          </a>
        </div>
      </div>

      <div className="back-btn-action" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
        <button onClick={() => onNavigate('home_menu')} className="back-btn secondary">📋 自治会メニューに戻る</button>
        <button onClick={() => onNavigate('home')} className="back-btn">🏠 ホームに戻る</button>
      </div>
    </div>
  );
};

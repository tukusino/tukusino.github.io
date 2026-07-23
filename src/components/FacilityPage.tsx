import React, { useState } from 'react';

interface FacilityPageProps {
  onNavigate: (page: string) => void;
}

export const FacilityPage: React.FC<FacilityPageProps> = ({ onNavigate }) => {
  // 画像拡大表示モーダル用ステート
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);

  return (
    <div className="page-container" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <header className="page-header">
        <span className="eyebrow">地域の拠点・共有施設</span>
        <h1>公会堂・施設案内</h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '6px 0 0', lineHeight: 1.45 }}>
          つくし野区の公会堂、公園、屋台小屋、ゴミ集積所の案内と利用ルールです。
        </p>
      </header>

      {/* ─── 1. つくし野区公会堂 ─── */}
      <div className="unified-card">
        <h2 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🏛️</span> つくし野区公会堂（つくし野公民館）
        </h2>

        {/* 公会堂写真 */}
        <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto 16px', overflow: 'hidden', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}
             onClick={() => setSelectedImage({ url: `${import.meta.env.BASE_URL}hall.jpg`, caption: 'つくし野区公会堂 外観' })}>
          <img
            src={`${import.meta.env.BASE_URL}hall.jpg`}
            alt="つくし野区公会堂 外観"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textAlign: 'center', marginTop: '4px' }}>
            🔍 タップで拡大表示
          </span>
        </div>

        <div style={{ background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '14px' }}>
          <strong style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', display: 'block', marginBottom: '8px' }}>公会堂の概要・設備</strong>
          <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.88rem', lineHeight: 1.6 }}>
            <li><strong>所在地:</strong> 掛川市細谷736番地の39</li>
            <li><strong>利用・設備:</strong> 利用条件、設備、使用料は予約時に区長または組長へご確認ください。</li>
            <li><strong>駐車場:</strong> 利用時の案内に従ってください。</li>
          </ul>
        </div>

        <div style={{ background: '#ebf8ff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #bee3f8', fontSize: '0.85rem', color: '#2b6cb0', lineHeight: 1.5 }}>
          📝 <strong>公会堂の予約方法</strong>: 利用を希望される場合は、組長または区長へ空き状況と利用条件をご確認ください。使用後は清掃と原状復帰にご協力をお願いいたします。
        </div>
      </div>

      {/* ─── 2. つくしの公園（つくし野区公園） ─── */}
      <div className="unified-card">
        <h2 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🛝</span> つくしの公園（つくし野区公園）
        </h2>

        <div 
          style={{ width: '100%', maxWidth: '520px', margin: '0 auto 14px', overflow: 'hidden', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}
          onClick={() => setSelectedImage({ url: `${import.meta.env.BASE_URL}icons/facility_park.png`, caption: 'つくしの公園（つくし野区公園）' })}
        >
          <img
            src={`${import.meta.env.BASE_URL}icons/facility_park.png`}
            alt="つくしの公園"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textAlign: 'center', marginTop: '4px' }}>
            🔍 タップで拡大表示
          </span>
        </div>

        <div style={{ background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.55 }}>
            区民のお子様からシニアまで集う憩いの公園です。災害発生時には自治会の一時集合避難場所（一次避難広場）として指定されています。
          </p>
          <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <li><strong>主な設備:</strong> 滑り台（塗装改善済）、ブランコ、ベンチ設置、広場スペース</li>
            <li><strong>利用行事:</strong> 夏休みラジオ体操、総合防災訓練集合場所、地域レクリエーション</li>
            <li><strong>環境整備:</strong> 年2回の一斉草刈り奉仕作業および有志によるクリーン活動で美化を維持しています。</li>
          </ul>
        </div>
      </div>

      {/* ─── 3. 屋台小屋（お祭り屋台保管庫） ─── */}
      <div className="unified-card">
        <h2 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🏮</span> 屋台小屋（お祭り屋台保管庫）
        </h2>

        <div 
          style={{ width: '100%', maxWidth: '520px', margin: '0 auto 14px', overflow: 'hidden', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}
          onClick={() => setSelectedImage({ url: `${import.meta.env.BASE_URL}icons/facility_yatai.png`, caption: '屋台小屋（お祭り屋台保管庫）' })}
        >
          <img
            src={`${import.meta.env.BASE_URL}icons/facility_yatai.png`}
            alt="屋台小屋"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textAlign: 'center', marginTop: '4px' }}>
            🔍 タップで拡大表示
          </span>
        </div>

        <div style={{ background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.55 }}>
            秋の「つくし野区お祭り」で区内を引き回す大切な屋台（だし）や伝統の祭典用品を専用保管している保管小屋です。
          </p>
          <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <li><strong>管理主体:</strong> 祭り青年 ＆ 祭典保存会・自治会役員</li>
            <li><strong>年間行事:</strong> 毎年8月第1日曜日（8:30〜）に屋台の風通しと点検作業「屋台の虫干し」を実施しています。</li>
            <li><strong>安全管理:</strong> お祭り運行に備え、車輪・木枠・用具の定期点検と保護を行っています。</li>
          </ul>
        </div>
      </div>

      {/* ─── 4. ゴミ集積所（ごみステーション） ─── */}
      <div className="unified-card">
        <h2 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🗑️</span> ゴミ集積所（ごみステーション）
        </h2>

        <div 
          style={{ width: '100%', maxWidth: '520px', margin: '0 auto 14px', overflow: 'hidden', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}
          onClick={() => setSelectedImage({ url: `${import.meta.env.BASE_URL}icons/facility_garbage.png`, caption: 'ゴミ集積所（ごみステーション）' })}
        >
          <img
            src={`${import.meta.env.BASE_URL}icons/facility_garbage.png`}
            alt="ゴミ集積所"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textAlign: 'center', marginTop: '4px' }}>
            🔍 タップで拡大表示
          </span>
        </div>

        <div style={{ background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.55 }}>
            各組の区民の皆様が毎日気持ちよく利用できるよう、管理・清掃維持されている地域のごみ集積所です。
          </p>
          <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <li><strong>管理運営:</strong> クリーン推進員（満65歳以上75歳未満・4月1日時点の対象世帯で月替わり担当）および各組住民</li>
            <li><strong>衛生管理:</strong> カラスネットの設置、収集後の清掃、施錠・ネットの管理点検を行っています。</li>
            <li><strong>利用マナー:</strong> 朝8時までの排出厳守、分別ルールの徹底にご協力お願いいたします。</li>
          </ul>
        </div>
      </div>

      {/* 画面下部ナビゲーションボタン */}
      <div className="back-btn-action" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
        <button onClick={() => onNavigate('home_menu')} className="back-btn secondary">📋 自治会メニューに戻る</button>
        <button onClick={() => onNavigate('home')} className="back-btn">🏠 ホームに戻る</button>
      </div>

      {/* 画像全画面拡大モーダル（ライトボックス） */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
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
            padding: '20px'
          }}
        >
          <div style={{ position: 'relative', maxWidth: 'calc(100vw - 24px)', maxHeight: 'calc(100vh - 20px)' }}>
            <img
              src={selectedImage.url}
              alt={selectedImage.caption}
              style={{ width: 'auto', maxWidth: 'calc(100vw - 24px)', height: 'auto', maxHeight: 'calc(100vh - 72px)', objectFit: 'contain', borderRadius: '2px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
            />
            <p style={{ color: '#ffffff', textAlign: 'center', marginTop: '4px', fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }}>
              {selectedImage.caption}
            </p>
          </div>
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              marginTop: '16px',
              padding: '10px 24px',
              backgroundColor: '#ffffff',
              color: '#1a202c',
              border: 'none',
              borderRadius: '24px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            ✕ 閉じる
          </button>
        </div>
      )}
    </div>
  );
};

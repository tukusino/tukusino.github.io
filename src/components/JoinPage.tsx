import { useState } from 'react';

interface JoinPageProps {
  onNavigate: (page: string) => void;
}

export const JoinPage = ({ onNavigate }: JoinPageProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    { q: '賃貸マンション・アパートでも加入できますか？', a: 'はい、ご加入いただけます。アパートや賃貸住宅にお住まいの方は、規程に基づく協力金（月1,000円）でのご参加も可能です。詳しくは区長またはお住まいのエリアの組長にご相談ください。' },
    { q: '転入してきたばかりですが、いつでも加入できますか？', a: '年間を通じて随時加入を受け付けています。お引越しが完了しましたら、お気軽にお声がけください。' },
    { q: '役員や組長、当番は必ずやらなければなりませんか？', a: '組ごとの持ち回りで組長などの役割分担がありますが、自治会細則により「入居して3年未満の世帯は原則として組長免除」、また「満80歳以上の方および病気療養中の方も役員免除」と規定されています。ご安心ください。' },
    { q: '途中で退会したい場合はどうすればいいですか？', a: 'お引越しによる転出などの事情で退会される場合は、事前にお近くの組長または区長へお申し出ください。' },
  ];

  return (
    <div className="page-container">
      <header className="page-header">
        <span className="eyebrow">はじめての方へ</span>
        <h1>加入のご案内</h1>
      </header>

      <div className="unified-card">
        <h2>📋 自治会加入のメリット</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <strong>🏡 地域の生活環境を共同で維持します</strong>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>ゴミ集積所の清掃、ネットや設備の管理など、快適な生活環境を自治会活動で支えています。</p>
          </div>
          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
            <strong>🚨 防災・安全情報の迅速な共有</strong>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>災害時の緊急連絡や避難所の開設、防犯灯の維持管理による安全な夜間通行を支えています。</p>
          </div>
          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
            <strong>🎉 地域行事への参加と親睦</strong>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>夏祭りや敬老会など、大人から子供まで地域のつながりを深めるイベントに参加できます。</p>
          </div>
        </div>
      </div>

      <div className="unified-card">
        <h2>👣 加入の流れ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <strong>1. 組長にご連絡ください</strong>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>お近くの組長、または区長にお声がけください。どなたが組長かわからない場合は本サイトの役員紹介をご参照いただくか、隣家の方へご確認ください。</p>
          </div>
          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
            <strong>2. 入会申込書（区民名簿個票）の記入・提出</strong>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              必要事項をご記入のうえ提出いただきます。※ご記入いただいた個人情報は自治会運営の連絡以外には使用しません。
            </p>
            <div style={{ marginTop: '10px' }}>
              <a href={`${import.meta.env.BASE_URL}区民名簿個票変更届.pdf`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', background: 'var(--primary-soft)', color: 'var(--primary-dark)', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', border: '1px solid var(--primary-light)' }}>
                📄 区民名簿個票変更届（PDF）を開く
              </a>
            </div>
          </div>
          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
            <strong>3. 会費・積立費のご案内（明確な月額内訳）</strong>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
              つくし野区の会費は内規に基づき以下の通り定められています。<br />
              ・<strong>戸建て世帯</strong>：区費 月額 1,500円 ＋ 祭典積立費 月額 500円（合計 月額 2,000円）<br />
              ・<strong>アパート・賃貸居住者</strong>：協力金 月額 1,000円
            </p>
          </div>
          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
            <strong>4. 加入完了・回覧板の配布開始</strong>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>手続きが完了した翌月より、ゴミ当番の割り当てや、紙の回覧板の配布が開始されます。</p>
          </div>
        </div>
      </div>

      <div className="unified-card">
        <h2>❓ よくある質問 (Q&amp;A)</h2>
        <div className="accordion">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className={`accordion-item${isOpen ? ' open' : ''}`}>
                <button
                  className="accordion-header"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-faq-${idx}`}
                  style={{ minHeight: '44px', height: 'auto' }}
                >
                  <span>Q. {faq.q}</span>
                  <span className="accordion-icon">▼</span>
                </button>
                {isOpen && (
                  <div className="accordion-content" id={`accordion-panel-faq-${idx}`}>
                    <p style={{ fontSize: '0.9375rem' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="back-btn-action" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => onNavigate('home_menu')} className="back-btn secondary">📋 自治会メニューに戻る</button>
        <button onClick={() => onNavigate('home')} className="back-btn">🏠 ホームに戻る</button>
      </div>
    </div>
  );
};

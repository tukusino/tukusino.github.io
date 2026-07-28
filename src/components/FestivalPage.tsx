import { festivalParticipationNotes } from '../data/festivalData';

interface FestivalPageProps {
  onNavigate: (page: string) => void;
}

const festivalHighlights = [
  { icon: '⛩️', title: '神社のない区のお祭り', text: 'つくし野区には神社がないからこそ、区民みんなでつくり、受け継いできたお祭りです。' },
  { icon: '🎉', title: '区の一大イベント', text: '神社のないつくし野区で、世代を越えて区民が顔を合わせ、みんなで楽しむ一大イベントです。' },
  { icon: '🪚', title: '区民の大工さんがつくった屋台', text: '区民の大工さんの手でつくられた屋台は、つくし野区祭典の大切なシンボルです。' },
];

export const FestivalPage = ({ onNavigate }: FestivalPageProps) => (
  <div className="page-container festival-page">
    <header className="page-header">
      <span className="eyebrow">行事・地域</span>
      <h1>つくし野区祭典</h1>
      <p>区民みんなで楽しみ、力を合わせて受け継ぐ、つくし野区の一大イベントです。</p>
    </header>

    <section className="festival-cover" aria-labelledby="festival-cover-title">
      <img src={`${import.meta.env.BASE_URL}festival-hero.png`} alt="つくし野区祭典の屋台を囲む区民の様子" />
      <div className="festival-cover-copy">
        <p className="eyebrow">TSUKUSHINO FESTIVAL</p>
        <h2 id="festival-cover-title">世代をつなぐ、<br />つくし野区の祭典。</h2>
      </div>
    </section>

    <section className="festival-status" role="status" aria-label="今年の祭典のお知らせ">
      <strong>今年の詳しい内容は準備中です</strong>
      <span>日程・集合場所・参加方法が決まり次第、このページと回覧板でお知らせします。</span>
    </section>

    <section className="festival-overview" aria-labelledby="festival-overview-title">
      <div className="festival-section-title">
        <div>
          <p className="eyebrow">FESTIVAL GUIDE</p>
          <h2 id="festival-overview-title">祭典の見どころ</h2>
        </div>
        <span>まずは雰囲気を知る</span>
      </div>
      <div className="festival-highlight-grid">
        {festivalHighlights.map((highlight) => (
          <article className="festival-highlight-card" key={highlight.title}>
            <span aria-hidden="true">{highlight.icon}</span>
            <h3>{highlight.title}</h3>
            <p>{highlight.text}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="festival-join-flow" aria-labelledby="festival-join-title">
      <div>
        <p className="eyebrow">HOW TO JOIN</p>
        <h2 id="festival-join-title">参加するときの流れ</h2>
      </div>
      <ol>
        <li><strong>1. 最新の案内を確認</strong><span>日時・集合場所・持ち物は、確定後のお知らせをご確認ください。</span></li>
        <li><strong>2. 当日の案内に沿って集合</strong><span>安全のため、担当者の案内や交通ルールにご協力ください。</span></li>
        <li><strong>3. できる範囲で楽しむ</strong><span>体調やご都合に合わせ、無理のない参加をお願いします。</span></li>
      </ol>
    </section>

    <section className="festival-notice-card" aria-labelledby="festival-notice-title">
      <div className="festival-section-title">
        <div>
          <p className="eyebrow">IMPORTANT NOTES</p>
          <h2 id="festival-notice-title">参加にあたってのお願い・連絡事項</h2>
        </div>
        <span>安全に楽しむために</span>
      </div>
      <p className="festival-notice-lead">祭典資料をもとに、参加前に知っておきたいことをまとめました。</p>
      <ul className="festival-notice-list">
        {festivalParticipationNotes.map((note) => <li key={note}>{note}</li>)}
      </ul>
      <p className="festival-notice-footnote">集合時間・服装・持ち物など、今年の詳しい内容は正式なお知らせをご確認ください。</p>
    </section>

    <section className="festival-faq-preview" aria-labelledby="festival-faq-title">
      <div className="festival-section-title">
        <div>
          <p className="eyebrow">FESTIVAL Q&amp;A</p>
          <h2 id="festival-faq-title">祭典についてのよくある質問</h2>
        </div>
        <span>タップして開く</span>
      </div>
      <div className="festival-faq-list">
        <details>
          <summary>祭典の準備はいつ頃から始まりますか？</summary>
          <p>昨年度は8月下旬の祭典総会から準備が始まりました。今年の予定は決まり次第、このページと回覧板でお知らせします。</p>
        </details>
        <details>
          <summary>祭典の役割分担はどこで確認できますか？</summary>
          <p>祭典の組織・準備ページで、運営・屋台・会場・安全などの担当ごとの役割を確認できます。</p>
        </details>
        <details>
          <summary>掲載されている昨年度の日程は、今年も同じですか？</summary>
          <p>いいえ。掲載日程は準備の流れを知るための参考情報です。今年の確定日程や集合場所は、正式なお知らせをご確認ください。</p>
        </details>
      </div>
      <button type="button" className="festival-detail-button festival-faq-link" onClick={() => onNavigate('faq')}>
        自治会のQ&amp;Aをもっと見る <span aria-hidden="true">→</span>
      </button>
    </section>

    <section className="festival-next-card" aria-labelledby="festival-next-title">
      <div>
        <p className="eyebrow">FOR THE COMMUNITY</p>
        <h2 id="festival-next-title">祭典を支える仕組み</h2>
        <p>組織の形、担当ごとの役割、昨年度の参考日程は別ページにまとめました。個人名や連絡先は掲載していません。</p>
      </div>
      <button type="button" className="festival-detail-button" onClick={() => onNavigate('festival_organization')}>
        組織・準備を見る <span aria-hidden="true">→</span>
      </button>
    </section>

    <div className="back-btn-action festival-page-actions">
      <button type="button" onClick={() => onNavigate('events')} className="back-btn secondary">行事予定を見る</button>
      <button type="button" onClick={() => onNavigate('home')} className="back-btn">ホームに戻る</button>
    </div>
  </div>
);

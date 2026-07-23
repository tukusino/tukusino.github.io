import { useEffect, useState } from 'react';
import { getNextGarbageDay } from '../data/garbageData';
import { getNextHomeEvent } from '../data/eventData';
import { getHomeNotices, type NoticeItem } from '../data/noticeData';

type View =
  | 'home' | 'notices' | 'duty' | 'events'
  | 'about' | 'roles' | 'rules'
  | 'join' | 'disaster' | 'facility' | 'organization'
  | 'links' | 'faq' | 'circular' | 'reports';

interface HomeProps {
  onNavigate: (page: View | string) => void;
}

const QUICK_LINKS: { icon: string; label: string; note: string; page: View }[] = [
  { icon: 'icon_disaster.jpg', label: '防災・安全', note: '避難場所・備蓄', page: 'disaster' },
  { icon: 'icon_facility.jpg', label: '公会堂・施設', note: '地域の施設案内', page: 'facility' },
  { icon: 'icon_join.jpg', label: '加入案内', note: '手続き・区費', page: 'join' },
  { icon: 'icon_circular.jpg', label: '回覧板・配布物', note: '回覧の流れ', page: 'circular' },
  { icon: 'icon_faq.jpg', label: 'よくある質問', note: '暮らしのQ&A', page: 'faq' },
  { icon: 'icon_about.jpg', label: '自治会概要', note: '役割・活動内容', page: 'about' },
];

export const Home = ({ onNavigate }: HomeProps) => {
  const [garbage, setGarbage] = useState(() => getNextGarbageDay(new Date()));
  const [event, setEvent] = useState(() => getNextHomeEvent(new Date()));
  const [notices, setNotices] = useState<NoticeItem[]>(() => getHomeNotices(new Date()));
  const [showAchievements, setShowAchievements] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = new Date();
      setGarbage(getNextGarbageDay(now));
      setEvent(getNextHomeEvent(now));
      setNotices(getHomeNotices(now));
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="home-page">
      <section className="editorial-hero" aria-labelledby="home-heading">
        <div className="hero-copy">
          <span className="hero-kicker">TSUKUSHINO COMMUNITY</span>
          <h1 id="home-heading">暮らしをわかりやすく、<br />身近に。</h1>
          <p>
            つくし野区での暮らしに必要な情報を、ここからわかりやすくお届けします。
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => onNavigate('notices')}>最新のお知らせ</button>
            <button className="text-button" onClick={() => onNavigate('about')}>自治会について <span aria-hidden="true">→</span></button>
          </div>
        </div>

        <div className="hero-visual">
          <img src={`${import.meta.env.BASE_URL}festival-wide.jpg`} alt="つくし野区のお祭り屋台" />
          <span className="hero-year" aria-hidden="true">2026</span>
        </div>
      </section>

      <section className="today-rail" aria-labelledby="today-heading">
        <div className="rail-heading">
          <span className="rail-date">TODAY</span>
          <h2 id="today-heading">暮らしの予定</h2>
          <p>次に確認したい情報を、ひと目で。</p>
        </div>

        <button className="rail-item rail-event" onClick={() => onNavigate('events')}>
          <span className="rail-number">01</span>
          <span className="rail-icon" aria-hidden="true">祭</span>
          <span className="rail-content">
            <small>次の行事予定</small>
            <strong>{event.title}</strong>
            <span>{event.date}{event.time ? `　${event.time}` : ''}</span>
          </span>
          <span className="rail-arrow" aria-hidden="true">→</span>
        </button>

        <button className="rail-item rail-garbage" onClick={() => onNavigate('duty')}>
          <span className="rail-number">02</span>
          <span className="rail-icon" aria-hidden="true">暮</span>
          <span className="rail-content">
            <small>次のゴミ収集</small>
            <strong>{garbage.category}</strong>
            <span>{garbage.date}（{garbage.weekday.substring(0, 1)}）</span>
          </span>
          <span className="rail-arrow" aria-hidden="true">→</span>
        </button>
      </section>

      <div className="home-main-grid">
        <section className="news-section" aria-labelledby="news-heading">
          <div className="section-title-row">
            <div>
              <span className="section-kicker">NEWS</span>
              <h2 id="news-heading">お知らせ</h2>
            </div>
            <button className="text-button" onClick={() => onNavigate('notices')}>一覧を見る <span aria-hidden="true">→</span></button>
          </div>

          <div className="news-list">
            {notices.length === 0 ? (
              <p className="empty-message">現在お知らせはありません。</p>
            ) : notices.map((notice) => (
              <button key={notice.id} className="news-row" onClick={() => onNavigate(`notice:${notice.id}`)}>
                <span className="news-date">{notice.publishDate.replaceAll('.', '/')}</span>
                <span className={`news-category category-${notice.category}`}>{notice.categoryLabel}</span>
                <strong>{notice.title}</strong>
                <span className="news-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </section>

        <aside className="paper-guide">
          <span className="paper-guide-label">大切なお知らせ</span>
          <h2>正式な決定予定は<br />回覧板もご確認ください。</h2>
          <p>
            本Webサイトは補助的な連絡手段です。正式な情報は従来通り回覧板や配布書類でご案内します。
          </p>
          <button onClick={() => onNavigate('circular')}>回覧板について <span aria-hidden="true">→</span></button>
        </aside>
      </div>

      <section id="menu-section" className="service-section" aria-labelledby="service-heading">
        <div className="section-title-row">
          <div>
            <span className="section-kicker">LIVING GUIDE</span>
            <h2 id="service-heading">暮らしの案内</h2>
          </div>
          <p>よく使う情報をまとめました。</p>
        </div>

        <div className="service-grid">
          {QUICK_LINKS.map((item, index) => (
            <button key={item.page} className="service-card" onClick={() => onNavigate(item.page)}>
              <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
              <img src={`${import.meta.env.BASE_URL}icons/${item.icon}`} alt="" />
              <span className="service-copy">
                <strong>{item.label}</strong>
                <small>{item.note}</small>
              </span>
              <span className="service-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="activity-section" aria-labelledby="activity-heading">
        <div className="activity-photo">
          <img src={`${import.meta.env.BASE_URL}hall.jpg`} alt="つくし野区公会堂の様子" />
          <span>COMMUNITY REPORT</span>
        </div>

        <div className="activity-copy">
          <span className="section-kicker">ACTIVITY</span>
          <h2 id="activity-heading">活動レポート</h2>
          <span className="sample-label">サンプル掲載</span>
          <time>2026.07.15</time>
          <h3>夏季一斉草刈り奉仕作業を実施しました</h3>
          <p>
            区内の各組にて一斉草刈りを実施。通学路や主要道路沿いの視界確保と美化を推進いたしました。（約120名参加）
          </p>
          <button className="text-button" onClick={() => onNavigate('reports')}>活動レポートを見る <span aria-hidden="true">→</span></button>
        </div>
      </section>

      <section className="achievement-section" aria-labelledby="achievement-heading">
        <div className="section-title-row">
          <div>
            <span className="section-kicker">LOCAL IMPROVEMENTS</span>
            <h2 id="achievement-heading">地域改善実績</h2>
          </div>
          <button
            className="outline-button"
            onClick={() => setShowAchievements((shown) => !shown)}
            aria-expanded={showAchievements}
          >
            {showAchievements ? '実績を閉じる' : '12件の実績を見る'}
          </button>
        </div>

        <div className="achievement-summary">
          <strong>12</strong>
          <span>防犯カメラ設置、防災用品整備、公園設備改善など、暮らしを支える取り組みを進めています。</span>
        </div>

        {showAchievements && (
          <div className="achievement-grid">
            <article>
              <span className="achievement-mark vermilion">守</span>
              <h3>防犯・交通安全</h3>
              <ul>
                <li>つくし野区入り口に防犯カメラを設置（3月）</li>
                <li>通学路に減速用の看板を2個設置（6月）</li>
                <li>7組のT字路に一旦停止の看板を設置（8月）</li>
                <li>富部交差点に歩行者用の横断旗を設置（7月）</li>
              </ul>
            </article>
            <article>
              <span className="achievement-mark indigo">備</span>
              <h3>防災・施設・環境整備</h3>
              <ul>
                <li>防災用テントを購入（6月）</li>
                <li>公園の滑り台を塗装、ベンチ1台を設置</li>
                <li>公会堂の網戸・掲示板を修理</li>
                <li>ゴミ集積所の施錠解除と環境維持</li>
              </ul>
            </article>
            <article>
              <span className="achievement-mark gold">結</span>
              <h3>健康・福祉・生活支援</h3>
              <ul>
                <li>移動スーパー「とくし丸」の販売開始（7月）</li>
                <li>「筋ちゃん体操」の定期実施開始（9月）</li>
                <li>75歳以上の区民へ健康人生設計ノートを配布</li>
              </ul>
            </article>
          </div>
        )}
      </section>

      <aside className="sample-note">
        <span aria-hidden="true">※</span>
        <p>掲載中の一部情報は、構成確認用のサンプルです。</p>
      </aside>
    </div>
  );
};

import { useEffect, useRef, useState } from 'react';
import { Home } from './components/Home';
import { GarbagePage } from './components/GarbagePage';
import { EventsPage } from './components/EventsPage';
import { NoticesPage } from './components/NoticesPage';
import { InfoPages } from './components/InfoPages';
import { JoinPage } from './components/JoinPage';
import { DisasterPage } from './components/DisasterPage';
import { FacilityPage } from './components/FacilityPage';
import { OrganizationPage } from './components/OrganizationPage';
import { LinksPage } from './components/LinksPage';
import { FaqPage } from './components/FaqPage';
import { CircularPage } from './components/CircularPage';
import { ReportPage } from './components/ReportPage';
import { HomeMenuPage } from './components/HomeMenuPage';
import { ContactModal } from './components/ContactModal';

const LAST_UPDATED = typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : '2026年7月23日';

type ViewType =
  | 'home' | 'notices' | 'duty' | 'events'
  | 'about' | 'roles' | 'rules'
  | 'join' | 'disaster' | 'facility' | 'organization'
  | 'links' | 'menu' | 'faq' | 'circular' | 'reports';

const VALID_VIEWS: ViewType[] = [
  'home', 'notices', 'duty', 'events',
  'about', 'roles', 'rules',
  'join', 'disaster', 'facility', 'organization',
  'links', 'menu', 'faq', 'circular', 'reports',
];

const VIEW_TITLES: Record<ViewType, string> = {
  home: 'ホーム｜つくし野区自治会',
  notices: 'お知らせ｜つくし野区自治会',
  reports: '活動レポート・資料｜つくし野区自治会',
  duty: 'ゴミの日｜つくし野区自治会',
  events: '行事予定｜つくし野区自治会',
  about: '自治会概要｜つくし野区自治会',
  roles: '役員・組織｜つくし野区自治会',
  rules: '規約｜つくし野区自治会',
  join: '加入案内｜つくし野区自治会',
  disaster: '防災・安全｜つくし野区自治会',
  facility: '公会堂・施設｜つくし野区自治会',
  organization: '役員・組織｜つくし野区自治会',
  links: '関連リンク｜つくし野区自治会',
  menu: '暮らしのメニュー｜つくし野区自治会',
  faq: 'よくある質問｜つくし野区自治会',
  circular: '回覧板・配布物｜つくし野区自治会',
};

const GUIDE_VIEWS: ViewType[] = [
  'about', 'roles', 'rules', 'join', 'disaster',
  'facility', 'organization', 'links', 'faq', 'circular', 'menu',
];

function getViewFromUrl(): ViewType {
  const value = new URLSearchParams(window.location.search).get('view') as ViewType;
  return VALID_VIEWS.includes(value) ? value : 'home';
}

export default function App() {
  const [view, setView] = useState<ViewType>(getViewFromUrl);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = VIEW_TITLES[view];
  }, [view]);

  useEffect(() => {
    const handlePopState = () => setView(getViewFromUrl());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (dropdownOpen) {
        setDropdownOpen(false);
        document.getElementById('nav-dropdown-trigger')?.focus();
      }
      if (contactModalOpen) setContactModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [contactModalOpen, dropdownOpen]);

  function navigate(nextView: ViewType | string) {
    const target = nextView === 'home_menu' ? 'menu' : nextView as ViewType;
    setView(target);
    setDropdownOpen(false);

    const url = new URL(window.location.href);
    if (target === 'home') url.searchParams.delete('view');
    else url.searchParams.set('view', target);
    window.history.pushState(null, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });

    window.setTimeout(() => {
      const heading = document.querySelector<HTMLElement>('main h1');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    }, 180);
  }

  function renderPage() {
    switch (view) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'duty': return <GarbagePage onNavigate={navigate} />;
      case 'events': return <EventsPage onNavigate={navigate} />;
      case 'notices': return <NoticesPage onNavigate={navigate} />;
      case 'about':
      case 'roles':
      case 'rules': return <InfoPages page={view} onNavigate={navigate} />;
      case 'join': return <JoinPage onNavigate={navigate} />;
      case 'disaster': return <DisasterPage onNavigate={navigate} />;
      case 'facility': return <FacilityPage onNavigate={navigate} />;
      case 'organization': return <OrganizationPage onNavigate={navigate} />;
      case 'links': return <LinksPage onNavigate={navigate} />;
      case 'faq': return <FaqPage onNavigate={navigate} />;
      case 'circular': return <CircularPage onNavigate={navigate} />;
      case 'menu':
        return <HomeMenuPage onNavigate={navigate} onOpenContact={() => setContactModalOpen(true)} />;
      case 'reports': return <ReportPage onNavigate={navigate} />;
      default: return <Home onNavigate={navigate} />;
    }
  }

  const isGuideActive = GUIDE_VIEWS.includes(view);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">本文へ移動</a>

      <div className="utility-bar">
        <div className="container utility-inner">
          <span>静岡県掛川市・和田岡地区</span>
          <span>地域の暮らしを、わかりやすく。</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-main">
          <button className="brand" onClick={() => navigate('home')} aria-label="つくし野区自治会 ホームへ">
            <span className="brand-mark" aria-hidden="true">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="" />
            </span>
            <span className="brand-copy">
              <small>TSUKUSHINO COMMUNITY</small>
              <strong>つくし野区自治会</strong>
            </span>
          </button>

          <div className="header-actions">
            <span className="header-date">最終更新 {LAST_UPDATED}</span>
            <a className="line-link" href="https://lin.ee/uVJlHBH" target="_blank" rel="noreferrer">
              LINE公式
            </a>
          </div>
        </div>

        <nav className="primary-nav" aria-label="メインナビゲーション">
          <div className="container primary-nav-inner">
            <button className={view === 'home' ? 'active' : ''} onClick={() => navigate('home')} aria-current={view === 'home' ? 'page' : undefined}>ホーム</button>
            <button className={view === 'notices' ? 'active' : ''} onClick={() => navigate('notices')} aria-current={view === 'notices' ? 'page' : undefined}>お知らせ</button>
            <button className={view === 'duty' ? 'active' : ''} onClick={() => navigate('duty')} aria-current={view === 'duty' ? 'page' : undefined}>ゴミの日</button>
            <button className={view === 'events' ? 'active' : ''} onClick={() => navigate('events')} aria-current={view === 'events' ? 'page' : undefined}>行事予定</button>
            <button className={view === 'disaster' ? 'active' : ''} onClick={() => navigate('disaster')} aria-current={view === 'disaster' ? 'page' : undefined}>防災・安全</button>

            <div className="nav-guide" ref={dropdownRef}>
              <button
                id="nav-dropdown-trigger"
                className={isGuideActive ? 'active' : ''}
                onClick={() => setDropdownOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
              >
                自治会のご案内
                <span className="nav-chevron" aria-hidden="true">⌄</span>
              </button>

              {dropdownOpen && (
                <div className="nav-dropdown" role="menu">
                  <span className="dropdown-kicker">自治会について</span>
                  <button role="menuitem" onClick={() => navigate('about')}>自治会概要</button>
                  <button role="menuitem" onClick={() => navigate('organization')}>役員・組織</button>
                  <button role="menuitem" onClick={() => navigate('join')}>加入案内</button>
                  <span className="dropdown-kicker">暮らしの案内</span>
                  <button role="menuitem" onClick={() => navigate('facility')}>公会堂・施設</button>
                  <button role="menuitem" onClick={() => navigate('circular')}>回覧板・配布物</button>
                  <button role="menuitem" onClick={() => navigate('faq')}>よくある質問</button>
                  <button role="menuitem" onClick={() => navigate('links')}>関連リンク</button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main id="main-content">
        <div className="container content-shell">
          {renderPage()}
        </div>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <span className="brand-mark" aria-hidden="true">
                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="" />
              </span>
              <div>
                <small>TSUKUSHINO COMMUNITY</small>
                <h2>つくし野区自治会</h2>
              </div>
            </div>
            <p>
              つくし野区自治会ホームページです。LINE公式アカウントを入り口として、
              住民の皆様へ利便性の高い情報を発信します。
            </p>
          </div>

          <div className="footer-links">
            <h3>暮らしの情報</h3>
            <button onClick={() => navigate('duty')}>ゴミの日</button>
            <button onClick={() => navigate('events')}>行事予定</button>
            <button onClick={() => navigate('disaster')}>防災・安全</button>
            <button onClick={() => navigate('circular')}>回覧板・配布物</button>
          </div>

          <div className="footer-contact">
            <h3>つながる</h3>
            <a className="footer-line-button" href="https://lin.ee/uVJlHBH" target="_blank" rel="noreferrer">LINEで友だち追加</a>
            <button className="footer-contact-button" onClick={() => setContactModalOpen(true)}>
              ご意見・お問い合わせ（仮）
            </button>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>最終更新：{LAST_UPDATED}</span>
          <span>© 2026 つくし野区自治会</span>
        </div>
      </footer>

      <nav className="bottom-nav" aria-label="スマートフォン用ナビゲーション">
        <div className="bottom-nav-inner">
          {([
            { id: 'home', label: 'ホーム', icon: 'icon_home.jpg' },
            { id: 'duty', label: 'ゴミ', icon: 'icon_garbage.jpg' },
            { id: 'notices', label: 'お知らせ', icon: 'icon_notice.jpg' },
            { id: 'events', label: '行事', icon: 'icon_event.jpg' },
            { id: 'menu', label: 'メニュー', icon: 'icon_circular.jpg' },
          ] as { id: ViewType; label: string; icon: string }[]).map((item) => {
            const active = item.id === 'menu' ? isGuideActive : view === item.id;
            return (
              <button
                key={item.id}
                className={`bottom-nav-btn${active ? ' active' : ''}`}
                onClick={() => navigate(item.id)}
                aria-current={active ? 'page' : undefined}
              >
                <img src={`${import.meta.env.BASE_URL}icons/${item.icon}`} alt="" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
}

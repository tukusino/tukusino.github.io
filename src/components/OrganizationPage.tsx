interface OrganizationPageProps {
  onNavigate: (page: string) => void;
}

const officerGroups = [
  {
    title: '区役員',
    members: [
      ['区長（兼 自主防災会長）', ''],
      ['副区長（兼 会計）', ''],
      ['1組 組長', ''],
      ['2組 組長', ''],
      ['3組 組長', ''],
      ['5組 組長', ''],
      ['6組 組長', ''],
      ['7組 組長', ''],
      ['監事', ''],
    ],
  },
  {
    title: 'まちづくり協議会委員',
    members: [
      ['文化部委員', ''],
      ['体育部委員', ''],
      ['広報部委員', ''],
      ['交通安全部委員', ''],
      ['子育て支援部委員', ''],
      ['高齢者支援部委員', ''],
      ['親水公園サポート委員', ''],
    ],
  },
  {
    title: '掛川市委嘱委員',
    members: [
      ['防災委員', ''],
      ['クリーン推進員', ''],
    ],
  },
  {
    title: 'その他の委員',
    members: [
      ['地区消防団員', ''],
      ['民生委員・児童委員（つくし野区・高田区担当）', ''],
    ],
  },
];

const monthlyCleanDuty = [
  ['4月', ''],
  ['5月', ''],
  ['6月', ''],
  ['7月', ''],
  ['8月', ''],
  ['9月', ''],
  ['10月', ''],
  ['11月', ''],
  ['12月', ''],
  ['1月', ''],
  ['2月', ''],
  ['3月', ''],
];

export const OrganizationPage = ({ onNavigate }: OrganizationPageProps) => {
  return (
    <div className="page-container">
      <header className="page-header">
        <span className="eyebrow">自治会の組織</span>
        <h1>役員・組織紹介</h1>
      </header>

      {/* 組織図カード */}
      <div className="unified-card">
        <h2>👥 つくし野区 自治会組織図</h2>
        <div className="org-chart" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: 'var(--bg)', padding: '20px', borderRadius: '5px' }}>
          <div className="org-box-top" style={{ background: 'var(--primary-dark)', color: 'var(--white)', padding: '8px 24px', borderRadius: '5px', fontSize: '0.9375rem', fontWeight: 700 }}>区長</div>
          <div style={{ width: '2px', height: '16px', background: 'var(--border)' }}></div>
          <div className="org-box" style={{ background: 'var(--primary-soft)', border: '1px solid var(--primary-light)', color: 'var(--primary-dark)', padding: '8px 20px', borderRadius: '5px', fontSize: '0.9375rem', fontWeight: 700 }}>副区長</div>
          <div style={{ width: '2px', height: '16px', background: 'var(--border)' }}></div>
          <div className="org-row" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="org-box" style={{ background: 'var(--primary-soft)', border: '1px solid var(--primary-light)', color: 'var(--primary-dark)', padding: '6px 12px', borderRadius: '5px', fontSize: '0.875rem', fontWeight: 700 }}>会計</div>
            <div className="org-box" style={{ background: 'var(--primary-soft)', border: '1px solid var(--primary-light)', color: 'var(--primary-dark)', padding: '6px 12px', borderRadius: '5px', fontSize: '0.875rem', fontWeight: 700 }}>組長 (各組1名)</div>
            <div className="org-box" style={{ background: 'var(--primary-soft)', border: '1px solid var(--primary-light)', color: 'var(--primary-dark)', padding: '6px 12px', borderRadius: '5px', fontSize: '0.875rem', fontWeight: 700 }}>監事</div>
          </div>
        </div>
      </div>

      <div className="unified-card organization-roles-card">
        <span className="section-kicker">令和8年度</span>
        <h2>🧭 役員・専門委員</h2>
        <p className="organization-intro">地域の運営、安全、環境美化、文化・スポーツなどの活動を、役員・専門委員が分担して進めています。</p>
        <div className="organization-roster-grid">
          {officerGroups.map((group) => (
            <section className="organization-roster-group" key={group.title}>
              <h3>{group.title}</h3>
              <dl>
                {group.members.map(([role, name]) => (
                  <div className="organization-roster-row" key={role}>
                    <dt>{role}</dt>
                    {name && <dd>{name}</dd>}
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
        <details className="organization-duty-list">
          <summary>当番クリーン推進員（4月〜翌3月）</summary>
          <dl>
            {monthlyCleanDuty.map(([month, name]) => (
              <div className="organization-roster-row" key={month}>
                <dt>{month}</dt>
                {name && <dd>{name}</dd>}
              </div>
            ))}
          </dl>
        </details>
        <p className="organization-note">民生委員・児童委員の任期は令和10年11月までです。個別のご連絡は、自治会のメールまたはお問い合わせフォームをご利用ください。</p>
      </div>

      <div className="unified-card">
        <h2>🛠️ 役員の役割と担当</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '0 0 12px' }}>区長・副区長・会計（区三役）および監事の任期は2年、組長の任期は1年です。監事は再任できます。</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <strong>区長 (1名)</strong>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '2px 0 0' }}>自治会を代表し、行政（掛川市役所）や各地区活動との連絡窓口、総会・役員会の招集、区の全般的な業務管理を統括します。</p>
          </div>
          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
            <strong>副区長 (1名)</strong>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '2px 0 0' }}>区長を補佐し、区長に万一のことがあった場合の職務代行や、区内のイベント準備の指揮担当します。</p>
          </div>
          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
            <strong>会計 (1名)</strong>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '2px 0 0' }}>区費や祭典積立金の適正な出納管理、年度予算案・決算報告書の作成、および組長と連携した集金の統括を行います。</p>
          </div>
          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
            <strong>組長 (各組1名)</strong>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '2px 0 0' }}>組内（1組・2組・3組・5組・6組・7組）の回覧板の配布・回収、配布物の仕分け配布、区費の集金、住民からの連絡事項の取りまとめを担当します。</p>
          </div>
        </div>
      </div>

      {/* 役員免除規定カード */}
      <div className="unified-card" style={{ borderLeft: '4px solid var(--primary)' }}>
        <h2>🤝 役員・組長の選出とやさしい免除規定（細則 第4条）</h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 10px' }}>
          つくし野区では、住民の負担を考慮し、細則に基づき以下の明確な免除規定を定めています。
        </p>
        <ul style={{ paddingLeft: '20px', fontSize: '0.9375rem', color: 'var(--text)', lineHeight: 1.6 }}>
          <li><strong>新居入居免除</strong>: 原則として、<strong>転入・新居入居から3年を経過していない世帯は組長を免除</strong>します。</li>
          <li><strong>高齢者免除</strong>: <strong>満80歳以上の区民</strong>、および病気等やむを得ない事情のある区民は、役員および専門委員の就任を免除します。</li>
        </ul>
      </div>

      {/* 地域団体・サークル紹介 */}
      <div className="unified-card">
        <h2>👥 つくし野区の地域団体・活動組織</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '5px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🚨</span> 自主防災隊（防災委員会）
            </h3>
            <span style={{ fontSize: '0.78rem', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '5px', fontWeight: 700 }}>安全・防災</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '6px 0 0', lineHeight: 1.45 }}>防災倉庫・非常発電機の点検管理、訓練の企画実施を行っています。</p>
          </div>
          <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '5px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🍵</span> つくし野「和会」
            </h3>
            <span style={{ fontSize: '0.78rem', background: 'var(--accent-light)', color: 'var(--accent-dark)', padding: '2px 6px', borderRadius: '5px', fontWeight: 700 }}>シニア・親睦</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '6px 0 0', lineHeight: 1.45 }}>毎月のグラウンドゴルフや茶サロンなどシニア親睦を楽しんでいます。</p>
          </div>
          <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '5px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🧹</span> クリーン推進員
            </h3>
            <span style={{ fontSize: '0.78rem', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '5px', fontWeight: 700 }}>環境・衛生</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '6px 0 0', lineHeight: 1.45 }}>ゴミ集積所のクリーン環境維持を当番制で推進しています。</p>
          </div>
          <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '5px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🏮</span> 祭典委員会
            </h3>
            <span style={{ fontSize: '0.78rem', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '5px', fontWeight: 700 }}>伝統・行事</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '6px 0 0', lineHeight: 1.45 }}>秋のつくし野区祭典での屋台管理や運行を担当しています。</p>
          </div>
        </div>
      </div>

      <div className="back-btn-action" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => onNavigate('home_menu')} className="back-btn secondary">📋 自治会メニューに戻る</button>
        <button onClick={() => onNavigate('home')} className="back-btn">🏠 ホームに戻る</button>
      </div>
    </div>
  );
};

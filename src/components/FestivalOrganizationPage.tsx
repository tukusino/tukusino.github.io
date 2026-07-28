import {
  festivalParticipationNotes,
  festivalRoleGroups,
  festivalSampleSchedule,
} from '../data/festivalData';

interface FestivalOrganizationPageProps {
  onNavigate: (page: string) => void;
}

export const FestivalOrganizationPage = ({ onNavigate }: FestivalOrganizationPageProps) => (
  <div className="page-container festival-page">
    <header className="page-header">
      <span className="eyebrow">つくし野区祭典</span>
      <h1>組織・準備</h1>
      <p>祭典を安全に進めるための役割と準備の流れです。</p>
    </header>

    <section className="festival-guide" aria-labelledby="festival-organization-title">
      <div className="festival-guide-heading">
        <p className="eyebrow">FESTIVAL TEAM</p>
        <h2 id="festival-organization-title">祭典を支える役割</h2>
        <p>役割は年によって変わる場合があります。個人名・連絡先は掲載せず、担当の全体像のみをお知らせします。</p>
      </div>

      <div className="festival-flow-lead" aria-label="祭典の運営体制">
        {festivalRoleGroups[0].roles.map((role) => <span key={role}>{role}</span>)}
      </div>

      <div className="festival-role-grid" aria-label="担当グループと主な役割">
        {festivalRoleGroups.slice(1).map((group) => (
          <section className="festival-role-card" key={group.title}>
            <h3>{group.title}</h3>
            <ul>{group.roles.map((role) => <li key={role}>{role}</li>)}</ul>
          </section>
        ))}
      </div>

      <section className="festival-section festival-sample-section" aria-labelledby="festival-schedule-title">
        <div className="festival-section-title">
          <h3 id="festival-schedule-title">昨年度の準備から片付けまでの流れ</h3>
          <span className="festival-sample-badge">参考：2025年度</span>
        </div>
        <p className="festival-intro">昨年度の資料に基づく参考日程です。今年の予定ではありません。</p>
        <ol className="festival-schedule-list">
          {festivalSampleSchedule.map((item) => (
            <li key={`${item.period}-${item.activity}`}>
              <strong>{item.period}</strong><span>{item.activity}</span>{item.note && <small>{item.note}</small>}
            </li>
          ))}
        </ol>
      </section>

      <section className="festival-section" aria-labelledby="festival-safety-title">
        <h3 id="festival-safety-title">安全に参加するためのお願い</h3>
        <ul className="festival-note-list">{festivalParticipationNotes.map((note) => <li key={note}>{note}</li>)}</ul>
      </section>
    </section>

    <div className="back-btn-action festival-page-actions">
      <button type="button" onClick={() => onNavigate('festival')} className="back-btn secondary">祭典の案内へ戻る</button>
      <button type="button" onClick={() => onNavigate('menu')} className="back-btn">自治会メニューへ</button>
    </div>
  </div>
);

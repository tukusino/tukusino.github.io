// 回覧板・配布物の説明ページ

interface CircularPageProps {
  onNavigate: (page: string) => void;
}

export const CircularPage = ({ onNavigate }: CircularPageProps) => {
  return (
    <div className="page-container">
      <header className="page-header">
        <span className="eyebrow">つくし野区のご案内</span>
        <h1>回覧板・配布物について</h1>
      </header>

      {/* ─── 回覧板とは ─── */}
      <div className="unified-card" style={{ marginBottom: '16px' }}>
        <h2>📋 回覧板とは</h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text)', lineHeight: 1.8, marginBottom: '12px' }}>
          回覧板は、自治会からの大切なお知らせを組内の世帯に順番に伝えるための冊子です。
          掛川市や自治会からの行政情報・地域の行事案内・お知らせなどが入っています。
        </p>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          ※ つくし野区では毎月1〜2回程度、各組長から回覧板が回ります。
        </p>
      </div>

      {/* ─── 回覧の流れ ─── */}
      <div className="unified-card" style={{ marginBottom: '16px' }}>
        <h2>🔄 回覧の流れ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
          {[
            { icon: '🏢', label: '自治会・行政', desc: 'つくし野区・掛川市からお知らせが届く' },
            { icon: '👤', label: '区長', desc: '内容を確認し、各組長に配布' },
            { icon: '🧑‍💼', label: '組長', desc: '担当組の最初の世帯に届ける' },
            { icon: '🏠', label: '各世帯', desc: '内容を確認したら、名前欄に印またはチェックを入れて次の世帯へ' },
            { icon: '✅', label: '組長へ返却', desc: '全世帯を回ったら組長のもとへ戻る' },
          ].map((step, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '5px',
              padding: '12px 14px'
            }}>
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{step.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{step.label}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 回覧板のルール ─── */}
      <div className="info-box blue" style={{ marginBottom: '16px' }}>
        <div className="info-icon">📌</div>
        <div className="info-content">
          <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>回覧板のルール</h3>
          <ul style={{ paddingLeft: '1.2em', fontSize: '0.95rem', lineHeight: 2, margin: 0 }}>
            <li>受け取ったら、できるだけ<strong>当日〜翌日中</strong>に次の世帯へ回してください</li>
            <li>名前欄に印またはチェックを入れてから次へ渡してください</li>
            <li>内容を控えたい場合はコピーしてから回してください</li>
            <li>不在時は、ポストに入れるか翌日に回しましょう</li>
            <li>長期不在の場合は事前に組長へご連絡ください</li>
          </ul>
        </div>
      </div>

      {/* ─── 配布物の種類 ─── */}
      <div className="unified-card" style={{ marginBottom: '16px' }}>
        <h2>📦 主な配布物の種類</h2>
        <div className="circular-grid" style={{ gap: '10px', marginTop: '10px' }}>
          {[
            { icon: '📄', label: '掛川市からのお知らせ', desc: '市政情報・広報かけがわ等' },
            { icon: '🎉', label: '行事・イベント案内', desc: '祭典・防災訓練・敬老会など' },
            { icon: '💰', label: '区費集金袋', desc: '毎月の区費・祭典積立費' },
            { icon: '📝', label: '総会・役員会の報告', desc: '議事録・決算報告書など' },
            { icon: '🗑️', label: 'ゴミ・古紙回収のお知らせ', desc: '収集日程・変更情報など' },
            { icon: '🚨', label: '防災・安全情報', desc: '避難情報・防犯情報など' },
            { icon: '📅', label: '年間スケジュール', desc: '草刈り・奉仕作業の日程等' },
            { icon: '📋', label: 'アンケート・調査票', desc: '市や自治会からの調査依頼' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '5px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 転居・不在時の注意 ─── */}
      <div className="info-box amber" style={{ marginBottom: '24px' }}>
        <div className="info-icon">⚠️</div>
        <div className="info-content">
          <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>転居・長期不在の際は</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}>
            転居（転出・転入）の際は組長または区長へご連絡ください。
            回覧の順番を調整いたします。
            また、1週間以上の長期不在が予定されている場合も事前にお知らせいただくとスムーズです。
          </p>
        </div>
      </div>

      <div className="back-btn-action" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => onNavigate('home_menu')} className="back-btn secondary">📋 自治会メニューに戻る</button>
        <button onClick={() => onNavigate('home')} className="back-btn">🏠 ホームに戻る</button>
      </div>
    </div>
  );
};

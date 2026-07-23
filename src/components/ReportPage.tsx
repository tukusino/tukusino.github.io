import { useState } from 'react';
import { mockActivityReports, mockArchiveDocuments } from '../data/reportData';

interface ReportPageProps {
  onNavigate: (page: string) => void;
}

export const ReportPage = ({ onNavigate }: ReportPageProps) => {
  const [activeTab, setActiveTab] = useState<'report' | 'archive'>('report');
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const filteredReports = mockActivityReports.filter(r => r.year === selectedYear);
  const filteredArchives = mockArchiveDocuments.filter(a => a.year === selectedYear);

  return (
    <div className="page-container">
      <header className="page-header">
        <span className="eyebrow">自治会の記録とご報告</span>
        <h1>活動レポート・資料アーカイブ</h1>
      </header>

      {/* タブ切り替え */}
      <div className="tab-bar" style={{ display: 'flex', gap: '4px', marginBottom: '20px', background: 'var(--border)', padding: '4px', borderRadius: '5px' }}>
        <button
          onClick={() => setActiveTab('report')}
          style={{
            flex: 1,
            padding: '10px 0',
            border: 'none',
            borderRadius: '5px',
            background: activeTab === 'report' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'report' ? 'var(--white)' : 'var(--text-muted)',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.9rem'
          }}
        >
          📸 活動レポート（実績報告）
        </button>
        <button
          onClick={() => setActiveTab('archive')}
          style={{
            flex: 1,
            padding: '10px 0',
            border: 'none',
            borderRadius: '5px',
            background: activeTab === 'archive' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'archive' ? 'var(--white)' : 'var(--text-muted)',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.9rem'
          }}
        >
          📚 資料・記録（年度別）
        </button>
      </div>

      {/* 年度選択フィルター */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>対象年度:</span>
        {[2025, 2026].map(yr => (
          <button
            key={yr}
            onClick={() => setSelectedYear(yr)}
            style={{
              padding: '4px 12px',
              borderRadius: '5px',
              border: selectedYear === yr ? 'none' : '1px solid var(--border)',
              background: selectedYear === yr ? 'var(--primary-dark)' : 'var(--white)',
              color: selectedYear === yr ? 'var(--white)' : 'var(--text)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            {yr}年度 (令和{yr - 2018}年)
          </button>
        ))}
      </div>

      {/* コンテンツエリア */}
      {activeTab === 'report' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredReports.length === 0 ? (
            <div className="unified-card">
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>{selectedYear}年度の活動レポートはまだ登録されていません。</p>
            </div>
          ) : (
            filteredReports.map(rep => (
              <div key={rep.id} className="unified-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 700 }}>{rep.dateStr}</span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {rep.participantCount && (
                      <span style={{ background: '#f3f4f6', color: 'var(--text-muted)', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '5px', fontWeight: 700 }}>
                        {rep.participantCount}
                      </span>
                    )}
                    <span style={{ background: 'var(--primary-soft)', color: 'var(--primary)', fontSize: '0.82rem', padding: '2px 8px', borderRadius: '5px', fontWeight: 700 }}>
                      {rep.categoryLabel}
                    </span>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', margin: '0 0 8px 0', lineHeight: 1.35 }}>{rep.title}</h3>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  {rep.image && (
                    <img
                      src={`${import.meta.env.BASE_URL}${rep.image}`}
                      alt=""
                      style={{ width: '64px', height: '64px', borderRadius: '5px', objectFit: 'cover', flexShrink: 0 }}
                    />
                  )}
                  <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.55, margin: 0 }}>{rep.summary}</p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="unified-card" style={{ borderLeft: '4px solid var(--accent)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.45 }}>
              🔒 <strong>安心・プライバシー保護運用</strong><br />
              自治会資料のアーカイブには、個人名・電話番号・訃報情報などの個人情報は含まれません。公的な事業報告・全区民向け配布物のみを掲載しています。
            </p>
          </div>

          {filteredArchives.length === 0 ? (
            <div className="unified-card">
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>{selectedYear}年度の公開資料はありません。</p>
            </div>
          ) : (
            filteredArchives.map(doc => (
              <div key={doc.id} className="unified-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.82rem', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '5px', fontWeight: 700 }}>
                      {doc.categoryLabel}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>{doc.monthStr}</span>
                  </div>
                  <h4 style={{ fontSize: '0.98rem', color: 'var(--text)', margin: '0 0 4px 0', fontWeight: 700 }}>{doc.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{doc.summary}</p>
                </div>
                <button
                  style={{
                    padding: '6px 12px',
                    borderRadius: '5px',
                    border: '1px solid var(--primary)',
                    background: 'var(--white)',
                    color: 'var(--primary)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  onClick={() => alert(`「${doc.title}」の記録概要を確認しました。`)}
                >
                  詳細表示
                </button>
              </div>
            ))
          )}
        </div>
      )}

      <div className="back-btn-action" style={{ marginTop: '24px' }}>
        <button onClick={() => onNavigate('home')} className="back-btn">ホームに戻る</button>
      </div>
    </div>
  );
};

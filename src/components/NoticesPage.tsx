import { useState } from 'react';
import { getActiveNotices, type NoticeItem } from '../data/noticeData';

interface NoticesPageProps {
  onNavigate: (page: string) => void;
}

export const NoticesPage = ({ onNavigate }: NoticesPageProps) => {
  const [notices] = useState<NoticeItem[]>(() => getActiveNotices(new Date()));
  const selectedNoticeId = new URLSearchParams(window.location.search).get('notice');
  const visibleNotices = selectedNoticeId
    ? notices.filter((notice) => notice.id === selectedNoticeId)
    : notices;

  return (
    <div className="page-container">
      <header className="page-header">
        <span className="eyebrow">つくし野区から</span>
        <h1>お知らせ</h1>
      </header>

      {notices.length === 0 ? (
        <div className="unified-card">
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>現在お知らせはありません。</p>
        </div>
      ) : (
        visibleNotices.map((notice) => (
          <div key={notice.id} className="unified-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>{notice.publishDate}</span>
              <span
                className="notice-tag"
                style={{
                  background: notice.category === 'important' ? 'var(--danger)' : 'var(--primary-soft)',
                  color: notice.category === 'important' ? 'var(--white)' : 'var(--primary)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                {notice.categoryLabel}
              </span>
            </div>
            <h2 style={{ border: 'none', padding: 0, margin: '0 0 10px', fontSize: '1.15rem' }}>{notice.title}</h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.55, color: 'var(--text)', whiteSpace: 'pre-wrap', margin: '0 0 12px 0' }}>{notice.content}</p>

            {notice.image && (
              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <img
                  src={`${import.meta.env.BASE_URL}${notice.image}`}
                  alt={notice.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '400px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />
              </div>
            )}
          </div>
        ))
      )}

      {selectedNoticeId && visibleNotices.length === 0 && (
        <div className="unified-card">
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>このお知らせは見つかりませんでした。</p>
          <div style={{ textAlign: 'center' }}>
            <button className="back-btn secondary" onClick={() => onNavigate('notices')}>お知らせ一覧へ戻る</button>
          </div>
        </div>
      )}

      <div className="back-btn-action" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => onNavigate('home_menu')} className="back-btn secondary">📋 自治会メニューに戻る</button>
        <button onClick={() => onNavigate('home')} className="back-btn">🏠 ホームに戻る</button>
      </div>

    </div>
  );
};

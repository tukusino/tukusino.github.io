import { useState } from 'react';
import { getActiveNotices, type NoticeItem } from '../data/noticeData';

interface NoticesPageProps {
  onNavigate: (page: string) => void;
}

export const NoticesPage = ({ onNavigate }: NoticesPageProps) => {
  const [notices] = useState<NoticeItem[]>(() => getActiveNotices(new Date()));
  const [selectedNoticeImage, setSelectedNoticeImage] = useState<string | null>(null);
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
                  onClick={() => setSelectedNoticeImage(`${import.meta.env.BASE_URL}${notice.image}`)}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '400px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    cursor: 'pointer'
                  }}
                  title="タップで全画面表示"
                />
                <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, marginTop: '4px' }}>
                  🔍 タップでポスターを全画面拡大表示
                </span>
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

      {/* 🖼️ お知らせ用 ポスター画像 全画面表示モーダル */}
      {selectedNoticeImage && (
        <div
          onClick={() => setSelectedNoticeImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedNoticeImage(null)}
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-12px',
                background: '#ffffff',
                color: '#1a365d',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700
              }}
              title="閉じる"
            >
              ✕
            </button>
            <img
              src={selectedNoticeImage}
              alt="ポスター全画面表示"
              style={{
                width: 'min(90vw, 720px)',
                maxHeight: '85dvh',
                borderRadius: '2px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

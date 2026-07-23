import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [category, setCategory] = useState<string>('防犯灯・道路');
  const [content, setContent] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setContent('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div style={{
        background: 'var(--white)',
        borderRadius: '5px',
        maxWidth: '500px',
        width: '100%',
        padding: '24px',
        boxShadow: 'var(--shadow-lg)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>✉️</span> お問い合わせ・ご意見窓口（仮）
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
        </div>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <span style={{ fontSize: '3rem' }}>✅</span>
            <h3 style={{ color: 'var(--primary-dark)', margin: '12px 0 8px' }}>送信が完了いたしました</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              自治会役員にて内容を確認の上、対応・ご連絡させていただきます。<br />ご意見・ご連絡をいただきありがとうございました。
            </p>
            <button
              onClick={handleReset}
              style={{
                marginTop: '16px',
                padding: '10px 24px',
                background: 'var(--primary)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              閉じる
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.45 }}>
              自治会に関するご意見、防犯灯の不点灯連絡、ゴミ集積所の確認、サイトの誤記指摘などをお気軽にお寄せください。
            </p>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text)' }}>
                お問い合わせ内容の分類
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '5px',
                  border: '1px solid var(--border)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  background: 'var(--bg)'
                }}
              >
                <option value="防犯灯・道路">💡 防犯灯の球切れ・道路破損</option>
                <option value="ごみ集積所">🧹 ごみ集積所・衛生環境</option>
                <option value="公会堂">🏛 公会堂の利用・設備</option>
                <option value="入退会">📝 加入・異動手続き</option>
                <option value="行事">🍡 行事・イベントについて</option>
                <option value="ホームページの訂正">💻 サイト表示・情報の訂正</option>
                <option value="その他">💬 その他ご意見・ご質問</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text)' }}>
                具体的内容・メッセージ <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="場所（組番号・電柱番号等）や状況をご記入ください..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '5px',
                  border: '1px solid var(--border)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '10px 16px',
                  borderRadius: '5px',
                  border: '1px solid var(--border)',
                  background: 'var(--white)',
                  color: 'var(--text-muted)',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                キャンセル
              </button>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'var(--white)',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                送信する
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

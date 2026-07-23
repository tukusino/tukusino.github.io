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
    <div className="contact-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <div className="contact-modal">
        <div className="contact-modal-header">
          <h2 id="contact-modal-title" className="contact-modal-title">
            <span>✉️</span> お問い合わせ・ご意見窓口（仮）
          </h2>
          <button onClick={onClose} className="contact-modal-close" aria-label="お問い合わせ画面を閉じる">✕</button>
        </div>

        {isSubmitted ? (
          <div className="contact-modal-complete">
            <span className="contact-modal-complete-icon">✅</span>
            <h3>送信が完了いたしました</h3>
            <p>
              自治会役員にて内容を確認の上、対応・ご連絡させていただきます。<br />ご意見・ご連絡をいただきありがとうございました。
            </p>
            <button
              onClick={handleReset}
              className="contact-modal-button contact-modal-button-primary contact-modal-complete-button"
            >
              閉じる
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="contact-modal-intro">
              自治会に関するご意見、防犯灯の不点灯連絡、ゴミ集積所の確認、サイトの誤記指摘などをお気軽にお寄せください。
            </p>

            <div className="contact-modal-field">
              <label>
                お問い合わせ内容の分類
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="contact-modal-control"
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

            <div className="contact-modal-field contact-modal-field-last">
              <label>
                具体的内容・メッセージ <span className="contact-modal-required">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="場所（組番号・電柱番号等）や状況をご記入ください..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="contact-modal-control contact-modal-textarea"
              />
            </div>

            <div className="contact-modal-actions">
              <button
                type="button"
                onClick={onClose}
                className="contact-modal-button contact-modal-button-secondary"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="contact-modal-button contact-modal-button-primary"
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

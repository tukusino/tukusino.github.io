import { useCallback, useEffect, useRef } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONTACT_EMAIL = 'tsukusinoku@gmail.com';
const CONTACT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfYD9P_6WIpnIsLC7d3XeRHzMfvEUimXUJFDjajVy7801nAyQ/viewform?usp=publish-editor';
const CONTACT_MAIL_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('つくし野区自治会へのお問い合わせ')}`;

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) previouslyFocusedRef.current?.focus();
  }, [isOpen]);

  const closeModal = useCallback(() => {
    previouslyFocusedRef.current?.focus();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== 'Tab') return;

      const dialog = closeButtonRef.current?.closest('[role="dialog"]');
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="contact-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div className="contact-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="contact-modal-header">
          <h2 id="contact-modal-title" className="contact-modal-title">
            <span aria-hidden="true">✉️</span> お問い合わせ・ご意見窓口
          </h2>
          <button ref={closeButtonRef} type="button" onClick={closeModal} className="contact-modal-close" aria-label="お問い合わせ画面を閉じる">✕</button>
        </div>

        <p className="contact-modal-intro">
          自治会に関するご意見、防犯灯の不点灯連絡、ゴミ集積所の確認、サイトの誤記指摘などをお気軽にお寄せください。
        </p>

        <div className="contact-modal-options">
          <a className="contact-modal-option contact-modal-option-primary" href={CONTACT_FORM_URL} target="_blank" rel="noopener noreferrer">
            <span className="contact-modal-option-icon" aria-hidden="true">📝</span>
            <span>
              <strong>お問い合わせフォームを開く</strong>
              <small>内容を入力して自治会へ送信</small>
            </span>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="contact-modal-option" href={CONTACT_MAIL_URL}>
            <span className="contact-modal-option-icon" aria-hidden="true">✉️</span>
            <span>
              <strong>フォームが使えない場合（メール）</strong>
              <small>{CONTACT_EMAIL}</small>
            </span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="contact-modal-actions">
          <button type="button" onClick={closeModal} className="contact-modal-button contact-modal-button-secondary">閉じる</button>
        </div>
      </div>
    </div>
  );
};

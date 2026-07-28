import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './renewal.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const serviceWorkerUrl = new URL('sw.js', window.location.href).pathname;
    navigator.serviceWorker.register(serviceWorkerUrl).catch((error: unknown) => {
      console.warn('オフライン利用の準備に失敗しました。通信がある状態でご利用ください。', error);
    });
  });
}

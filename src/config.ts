// システム設定・定数管理
// 年度更新時はここを変更すると、共通の表示へ反映されます。
export const CURRENT_YEAR = 2026;
export const LAST_UPDATED = '2026年7月23日';

// Google スプレッドシート(GAS Web App)のAPI URL
// .env.local の VITE_GAS_API_URL で設定します。未設定時は同梱データを表示します。
export const GAS_API_URL = import.meta.env.VITE_GAS_API_URL?.trim() ?? '';

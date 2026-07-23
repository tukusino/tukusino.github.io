import { GAS_API_URL } from '../config';
import { defaultNotices, type NoticeItem } from '../data/noticeData';
import { tsukushinoEvents, type SimpleEvent } from '../data/eventData';

export interface GSSDataResponse {
  notices?: NoticeItem[];
  events?: SimpleEvent[];
}

let cachedData: GSSDataResponse | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60_000; // 1分間キャッシュ

/**
 * Googleスプレッドシート(GAS Web App)から最新のお知らせ・行事データを取得
 */
export async function fetchGSSData(): Promise<GSSDataResponse> {
  const now = Date.now();
  if (cachedData && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedData;
  }

  const apiUrl: string = GAS_API_URL || '';

  if (!apiUrl || apiUrl.trim() === '') {
    return {
      notices: defaultNotices,
      events: tsukushinoEvents
    };
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    const parsedNotices: NoticeItem[] = Array.isArray(data.notices)
      ? data.notices.map((item: any, idx: number) => ({
          id: item.id || `gss_${idx}`,
          publishDate: item.publishDate || '',
          title: item.title || '',
          content: item.content || '',
          category: (['important', 'info', 'disaster', 'event'].includes(item.category)
            ? item.category
            : 'info') as NoticeItem['category'],
          categoryLabel: item.categoryLabel || 'お知らせ',
          startDate: item.startDate ? new Date(item.startDate) : new Date(),
          endDate: item.endDate ? new Date(item.endDate) : new Date('2099-12-31')
        }))
      : defaultNotices;

    cachedData = {
      notices: parsedNotices.length > 0 ? parsedNotices : defaultNotices,
      events: Array.isArray(data.events) && data.events.length > 0 ? data.events : tsukushinoEvents
    };
    lastFetchTime = now;
    return cachedData;
  } catch (error) {
    console.warn('Google Sheetデータの取得に失敗したため、バックアップデータを使用します:', error);
    return {
      notices: defaultNotices,
      events: tsukushinoEvents
    };
  }
}

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

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
    const payload: unknown = await response.json();
    const data = isRecord(payload) ? payload : {};
    
    const parsedNotices: NoticeItem[] = Array.isArray(data.notices)
      ? data.notices.filter(isRecord).map((item, idx) => ({
          id: readString(item.id) || `gss_${idx}`,
          publishDate: readString(item.publishDate) || '',
          title: readString(item.title) || '',
          content: readString(item.content) || '',
          category: (['important', 'info', 'disaster', 'event'].includes(readString(item.category) || '')
            ? readString(item.category)
            : 'info') as NoticeItem['category'],
          categoryLabel: readString(item.categoryLabel) || 'お知らせ',
          startDate: readString(item.startDate) ? new Date(readString(item.startDate)!) : new Date(),
          endDate: readString(item.endDate) ? new Date(readString(item.endDate)!) : new Date('2099-12-31'),
          priority: readString(item.priority) === 'urgent' ? 'urgent' : 'normal',
          status: readString(item.status) === 'sample' || readString(item.status) === 'preparing'
            ? readString(item.status) as NoticeItem['status']
            : undefined,
        }))
      : defaultNotices;

    const parsedEvents: SimpleEvent[] = Array.isArray(data.events)
      ? data.events.filter(isRecord).flatMap((item) => {
          const title = readString(item.title);
          const dateStr = readString(item.dateStr) || readString(item.date);
          if (!title || !dateStr) return [];
          return [{
            title,
            dateStr,
            date: readString(item.date),
            description: readString(item.description),
            dateVal: readString(item.dateVal),
            startDate: readString(item.startDate),
            endDate: readString(item.endDate),
            isDateUndecided: item.isDateUndecided === true,
            time: readString(item.time),
            location: readString(item.location),
            target: readString(item.target),
            fee: readString(item.fee),
            belongings: readString(item.belongings),
            application: readString(item.application),
            rain: readString(item.rain),
            categoryType: item.categoryType === 'management' ? 'management' : 'resident',
          }];
        })
      : tsukushinoEvents;

    cachedData = {
      notices: parsedNotices.length > 0 ? parsedNotices : defaultNotices,
      events: parsedEvents.length > 0 ? parsedEvents : tsukushinoEvents
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

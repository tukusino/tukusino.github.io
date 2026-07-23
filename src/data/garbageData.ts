// つくし野区のゴミ収集スケジュールデータと判定ロジック

export interface GarbageSchedule {
  label: string;       // 表示用の月（例: '4月'）
  year: number;        // 年（例: 2026）
  month: number;       // JavaScriptのDateにおける月 (0-indexed、例: 3は4月)
  recycle: number;     // 資源ゴミ（びん・かん・ペットボトル・食用油）の収集日（日）
  nonburnable: number; // 燃えないゴミ・蛍光管・乾電池の収集日（日）
  yearEnd?: boolean;   // 年末年始の特記事項フラグ
}

export interface NextGarbageResult {
  date: string;
  weekday: string;
  dayOfWeek?: string;   // 曜日（短縮形）
  category: string;
  type?: string;        // カテゴリ種別（burnable / plastic / recycle / nonburnable）
  daysLeft: number;
}

// 令和8年度（2026年4月〜2027年3月）のスケジュールデータ
export const yearGarbageMonths: GarbageSchedule[] = [
  { label: '4月', year: 2026, month: 3, recycle: 15, nonburnable: 13 },
  { label: '5月', year: 2026, month: 4, recycle: 20, nonburnable: 11 },
  { label: '6月', year: 2026, month: 5, recycle: 17, nonburnable: 8 },
  { label: '7月', year: 2026, month: 6, recycle: 15, nonburnable: 13 },
  { label: '8月', year: 2026, month: 7, recycle: 19, nonburnable: 10 },
  { label: '9月', year: 2026, month: 8, recycle: 16, nonburnable: 14 },
  { label: '10月', year: 2026, month: 9, recycle: 21, nonburnable: 12 },
  { label: '11月', year: 2026, month: 10, recycle: 18, nonburnable: 9 },
  { label: '12月', year: 2026, month: 11, recycle: 16, nonburnable: 14, yearEnd: true },
  { label: '1月', year: 2027, month: 0, recycle: 20, nonburnable: 11, yearEnd: true },
  { label: '2月', year: 2027, month: 1, recycle: 17, nonburnable: 8 },
  { label: '3月', year: 2027, month: 2, recycle: 17, nonburnable: 8 }
];

export const weekdayNames = ["日", "月", "火", "水", "木", "金", "土"];

/**
 * カテゴリ名からtype文字列を返す
 */
function categoryToType(category: string): string {
  if (category.includes("燃えるごみ")) return "burnable";
  if (category.includes("プラスチック")) return "plastic";
  if (category.includes("びん・かん")) return "recycle";
  if (category.includes("燃えないごみ")) return "nonburnable";
  return "burnable";
}

/**
 * 指定された日から各月の通常収集日（火・金：燃えるゴミ、水：プラスチック）の文字列を生成します。
 */
export function getRegularCollectionDays(year: number, month: number, weekdays: number[]): string {
  const lastDay = new Date(year, month + 1, 0).getDate();
  const days: string[] = [];
  for (let day = 1; day <= lastDay; day++) {
    const isException = (month === 11 && day >= 29) || (month === 0 && day <= 3);
    if (!isException && weekdays.indexOf(new Date(year, month, day).getDay()) !== -1) {
      days.push(`${day}日`);
    }
  }
  return days.join('・');
}

export function getNextGarbageDay(now: Date): NextGarbageResult {
  const baseToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const start = new Date(baseToday);
  const cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 30); // 朝8:30締め切り
  
  // 朝8:30の締め切り時間を過ぎていたら翌日から検索
  if (now >= cutoff) {
    start.setDate(start.getDate() + 1);
  }

  for (let offset = 0; offset < 370; offset++) {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    
    const schedule = yearGarbageMonths.find(
      item => item.year === date.getFullYear() && item.month === date.getMonth()
    );
    if (!schedule) continue;

    const day = date.getDate();
    const weekday = date.getDay();
    // 年末年始（12/29〜1/3）は収集お休み
    const isException = (date.getMonth() === 11 && day >= 29) || (date.getMonth() === 0 && day <= 3);
    
    const categories: string[] = [];

    if (!isException) {
      if (weekday === 2 || weekday === 5) {
        categories.push("燃えるごみ");
      }
      if (weekday === 3) {
        categories.push("プラスチック");
      }
    }
    if (day === schedule.recycle) {
      categories.push("びん・かん・ペットボトル・食用油");
    }
    if (day === schedule.nonburnable) {
      categories.push("燃えないごみ・蛍光管・乾電池");
    }

    if (categories.length > 0) {
      const category = categories.join("／");
      // 本日からの正確な実残日数を算出
      const diffMs = date.getTime() - baseToday.getTime();
      const actualDaysLeft = Math.round(diffMs / (1000 * 60 * 60 * 24));

      return {
        date: `${date.getMonth() + 1}月${day}日`,
        weekday: `${weekdayNames[weekday]}曜日`,
        dayOfWeek: weekdayNames[weekday],
        category,
        type: categoryToType(category),
        daysLeft: actualDaysLeft
      };
    }
  }

  return {
    date: "日程未登録",
    weekday: "",
    dayOfWeek: "",
    category: "新しい収集予定をご確認ください",
    type: "burnable",
    daysLeft: -1
  };
}

/**
 * カテゴリ名からアイコンを返す
 */
function categoryToIcon(category: string): string {
  if (category.includes("燃えるごみ")) return "🗑️";
  if (category.includes("プラスチック")) return "♻️";
  if (category.includes("びん・かん")) return "🥫";
  if (category.includes("燃えないごみ")) return "🔋";
  return "🗑️";
}

/**
 * 直近のゴミ予定リストを複数件取得する（タイムライン用）
 */
export function getUpcomingGarbageDays(now: Date, limit: number = 6): { dateStr: string; weekday: string; category: string; type: string; icon: string; key: string }[] {
  const list: { dateStr: string; weekday: string; category: string; type: string; icon: string; key: string }[] = [];
  let currentStart = new Date(now);
  
  for (let i = 0; i < limit; i++) {
    const next = getNextGarbageDay(currentStart);
    if (next.daysLeft === -1) break;
    
    const match = next.date.match(/(\d+)月(\d+)日/);
    if (!match) break;
    
    const m = parseInt(match[1]) - 1;
    const d = parseInt(match[2]);
    let y = currentStart.getFullYear();
    if (currentStart.getMonth() === 11 && m === 0) {
      y += 1;
    } else if (currentStart.getMonth() === 0 && m === 11) {
      y -= 1;
    }
    
    const foundDate = new Date(y, m, d);
    const key = `${y}-${m+1}-${d}-${next.category}`;
    
    if (!list.some(item => item.key === key)) {
      list.push({
        dateStr: `${m + 1}月${d}日`,
        weekday: next.weekday,
        category: next.category,
        type: next.type || categoryToType(next.category),
        icon: categoryToIcon(next.category),
        key
      });
    }
    
    currentStart = new Date(foundDate.getFullYear(), foundDate.getMonth(), foundDate.getDate(), 9, 0);
  }
  
  return list;
}

export interface GarbageSearchItem {
  name: string;
  category: string;
  schedule: string;
  note: string;
}

export const garbageSearchMaster: GarbageSearchItem[] = [
  // 燃えるゴミ
  { name: '生ごみ・野菜くず・調理くず', category: '燃えるごみ', schedule: '毎週火曜日・金曜日', note: '水切りを十分に行って出してください' },
  { name: '衣類・服・布類・タオル・下着', category: '燃えるごみ', schedule: '毎週火曜日・金曜日', note: '洗って乾かしてから袋に入れて出してください' },
  { name: '靴・スリッパ・サンダル・革製品', category: '燃えるごみ', schedule: '毎週火曜日・金曜日', note: '金属バックル等は取り外すか燃えないごみへ' },
  { name: '布団・毛布・枕・クッション', category: '燃えるごみ', schedule: '毎週火曜日・金曜日', note: '袋に入る大きさに切るか縛る。大型は粗大ごみへ' },
  { name: 'ぬいぐるみ・おもちゃ（木製・布製）', category: '燃えるごみ', schedule: '毎週火曜日・金曜日', note: '電池式のおもちゃは電池を取り外してください' },
  { name: '紙おむつ（使用済み）', category: '燃えるごみ', schedule: '毎週火曜日・金曜日', note: '汚物はトイレに流してから出してください' },
  { name: '木くず・剪定枝・落ち葉・草', category: '燃えるごみ', schedule: '毎週火曜日・金曜日', note: '太さ5cm以下・長さ50cm以下に縛って出してください' },
  { name: 'ビデオテープ・CD・DVD・ケース', category: '燃えるごみ', schedule: '毎週火曜日・金曜日', note: 'プラスチック製ケースも燃えるごみへ' },
  { name: '文房具・ボールペン・定規', category: '燃えるごみ', schedule: '毎週火曜日・金曜日', note: '金属混在のものは燃えないごみへ' },

  // プラスチック製容器包装
  { name: '食品トレイ・パック・惣菜ケース', category: 'プラスチック', schedule: '毎週水曜日', note: 'サッと水洗いして汚れを落として出してください' },
  { name: 'レジ袋・お菓子袋・冷凍食品の袋', category: 'プラスチック', schedule: '毎週水曜日', note: 'プラマークのついたプラスチックフィルム・袋類' },
  { name: 'ペットボトルのキャップ・ラベル', category: 'プラスチック', schedule: '毎週水曜日', note: 'ペットボトル本体と分別して出してください' },
  { name: 'シャンプー・洗剤容器・チューブ類', category: 'プラスチック', schedule: '毎週水曜日', note: '水洗いして中身を空にして出してください' },
  { name: 'プラスチック製バケツ・ハンガー・洗面器', category: 'プラスチック', schedule: '毎週水曜日', note: '100%プラスチック素材の生活用品全般' },

  // 資源ごみ（びん・かん・ペットボトル・食用油）
  { name: 'アルミ缶・スチール缶（飲料・缶詰）', category: '資源ごみ（びん・かん・ペットボトル）', schedule: '毎月第3水曜日', note: '中を洗って潰さずに出してください' },
  { name: 'ガラス瓶（ジュース・お酒・調味料）', category: '資源ごみ（びん・かん・ペットボトル）', schedule: '毎月第3水曜日', note: 'キャップを外し水洗い。割れた瓶は燃えないごみへ' },
  { name: 'ペットボトル（飲料・しょうゆ）', category: '資源ごみ（びん・かん・ペットボトル）', schedule: '毎月第3水曜日', note: 'キャップとラベルを外し、中を洗ってください' },
  { name: '食用油（サラダ油・廃油）', category: '資源ごみ（食用油）', schedule: '毎月第3水曜日', note: 'ペットボトルなどの密閉容器に入れて出してください' },

  // 燃えないごみ（小型家電・金属・ガラス等）
  { name: '傘・折りたたみ傘', category: '燃えないごみ', schedule: '毎月第2水曜日', note: '指定袋から飛び出しても口を縛れれば収集可能' },
  { name: '鍋・フライパン・ヤカン・調理器具', category: '燃えないごみ', schedule: '毎月第2水曜日', note: '金属製のキッチン用品全般' },
  { name: '小型家電（ドライヤー・トースター・アイロン）', category: '燃えないごみ', schedule: '毎月第2水曜日', note: '指定ごみ袋に入るサイズのもの' },
  { name: '水筒・ステンレスボトル・保温容器', category: '燃えないごみ', schedule: '毎月第2水曜日', note: '金属製水筒類' },
  { name: '蛍光管・電球・LED電球', category: '燃えないごみ', schedule: '毎月第2水曜日', note: '購入時のケースや紙箱に入れて割れないよう出してください' },
  { name: '乾電池・ボタン電池・充電池', category: '燃えないごみ', schedule: '毎月第2水曜日', note: '透明な袋に入れ、端子にテープを貼って絶縁推奨' },
  { name: 'スプレー缶・カセットボンベ・ライター', category: '燃えないごみ', schedule: '毎月第2水曜日', note: '中身を完全に使い切り、穴は開けずに出してください' },
  { name: '刃物・包丁・ハサミ・割れガラス', category: '燃えないごみ', schedule: '毎月第2水曜日', note: '厚紙や新聞紙で包み「キケン」と表記して出してください' },
  { name: '鏡・陶器・皿・グラス・電球', category: '燃えないごみ', schedule: '毎月第2水曜日', note: '割れものは新聞紙に包んで危険表記をして出してください' },

  // 古紙回収（自治会・子供会回収等）
  { name: '新聞紙・チラシ', category: '古紙回収（自治会回収）', schedule: '自治会古紙回収日・拠点回収', note: 'ひもで十字に縛って出してください' },
  { name: '段ボール', category: '古紙回収（自治会回収）', schedule: '自治会古紙回収日・拠点回収', note: 'たたんでひもで十字に縛って出してください' },
  { name: '雑誌・書籍・カタログ・ノート', category: '古紙回収（自治会回収）', schedule: '自治会古紙回収日・拠点回収', note: 'ひもで十字に縛って出してください' },
  { name: '牛乳パック・紙パック（洗って開いたもの）', category: '古紙回収（自治会回収）', schedule: '自治会古紙回収日・拠点回収', note: '洗って開いて乾かしてから出してください' },
  { name: '雑がみ（紙袋・菓子箱・トイレットペーパー芯）', category: '古紙回収（自治会回収）', schedule: '自治会古紙回収日・拠点回収', note: '紙袋にまとめたり挟んで出してください' },

  // 粗大ごみ・処理困難物
  { name: '自転車・三輪車', category: '粗大ごみ', schedule: '掛川市環境センターへ持込', note: '直接搬入または戸別収集の予約が必要' },
  { name: '家具・タンス・テーブル・椅子', category: '粗大ごみ', schedule: '掛川市環境センターへ持込', note: '解体可能であれば解体。大型は環境センターへ持込' },
  { name: '家屋リフォーム材・バッテリー・タイヤ', category: '処理困難物', schedule: '専門業者・販売店へ相談', note: '市では収集できません。販売店や専門業者へ引き取り依頼' },
];

export function searchGarbageItems(keyword: string): GarbageSearchItem[] {
  if (!keyword || keyword.trim() === '') return [];
  const q = keyword.trim().toLowerCase();
  return garbageSearchMaster.filter(item => 
    item.name.toLowerCase().includes(q) || 
    item.category.toLowerCase().includes(q) ||
    item.note.toLowerCase().includes(q)
  );
}

/**
 * GarbagePage.tsx から garbageData.xxx() の形式でアクセスできるようにするオブジェクト
 */
export const garbageData = {
  getNextGarbageDay: (now: Date = new Date()) => getNextGarbageDay(now),
  yearGarbageMonths,
  getRegularCollectionDays,
  getUpcomingGarbageDays,
  searchGarbageItems,
};

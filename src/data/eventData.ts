// 行事予定、会議予定データと判定ロジック

import { weekdayNames } from './garbageData';

export interface NextEventResult {
  date: string;
  weekday: string;
  title: string;
  daysLeft: number;
  time?: string;
  location?: string;
  target?: string;
  fee?: string;
  belongings?: string;
  application?: string;
  rain?: string;
  image?: string;
}

export interface SimpleEvent {
  dateStr: string;
  date?: string;
  title: string;
  description?: string;
  dateVal?: string; // 比較用のISO日付（例: "2026-04-12"）
  startDate?: string;
  endDate?: string;
  isDateUndecided?: boolean;
  
  // ─── 拡張詳細属性 ───
  time?: string;          // 開催時間（例: "17:00〜20:30"）
  location?: string;      // 会場（例: "和田岡小学校体育館"）
  target?: string;        // 対象（例: "つくし野区住民・ご家族・どなたでも"）
  fee?: string;           // 参加費（例: "無料"）
  belongings?: string;    // 持ち物（例: "上履き、水筒"）
  application?: string;   // 申込み（例: "不要（直接会場へ）"）
  rain?: string;          // 雨天時（例: "体育館にて開催"）
  categoryType?: 'resident' | 'management'; // 'resident': みんなの行事 / 'management': 自治会運営予定
  image?: string;         // 水彩イラスト等の画像パス
}

export interface OrgActivity {
  groupName: string;
  group?: string;
  activity: string;
}

export interface MonthlyOrgActivity {
  month: string | number;
  groups: OrgActivity[];
  events?: OrgActivity[];
}

// つくし野区の予定一覧 (マスターデータ)
export const tsukushinoEvents: SimpleEvent[] = [
  // ─── 過去の行事 ───
  {
    dateStr: "4月12日（日）",
    date: "4月12日（日）",
    title: "通常総会",
    dateVal: "2026-04-12",
    startDate: "2026-04-12",
    location: "つくし野公会堂",
    target: "全区民",
    categoryType: "management"
  },
  {
    dateStr: "4月19日（日）",
    date: "4月19日（日）",
    title: "役員会",
    dateVal: "2026-04-19",
    startDate: "2026-04-19",
    location: "つくし野公会堂",
    target: "自治会役員",
    categoryType: "management"
  },
  {
    dateStr: "5月17日（日）",
    date: "5月17日（日）",
    title: "土砂災害訓練（市内全域）",
    dateVal: "2026-05-17",
    startDate: "2026-05-17",
    location: "区内一次避難場所",
    target: "全区民",
    categoryType: "resident"
  },
  {
    dateStr: "5月23日（土）",
    date: "5月23日（土）",
    title: "役員会",
    dateVal: "2026-05-23",
    startDate: "2026-05-23",
    location: "つくし野公会堂",
    target: "自治会役員",
    categoryType: "management"
  },
  {
    dateStr: "6月7日（日）",
    date: "6月7日（日）",
    title: "草刈り奉仕作業",
    dateVal: "2026-06-07",
    startDate: "2026-06-07",
    location: "担当区域・公園・堤防",
    target: "全区民",
    categoryType: "resident"
  },
  {
    dateStr: "6月20日（土）",
    date: "6月20日（土）",
    title: "役員会",
    dateVal: "2026-06-20",
    startDate: "2026-06-20",
    location: "つくし野公会堂",
    target: "自治会役員",
    categoryType: "management"
  },
  {
    dateStr: "7月18日（土）",
    date: "7月18日（土）",
    title: "役員会",
    dateVal: "2026-07-18",
    startDate: "2026-07-18",
    location: "つくし野公会堂",
    target: "自治会役員",
    categoryType: "management"
  },

  // ─── これからの行事（公式年間予定表順） ───
  {
    dateStr: "8月2日（日）",
    date: "8月2日（日）",
    title: "屋台の虫干し 8:30〜（祭り青年）",
    dateVal: "2026-08-02",
    startDate: "2026-08-02",
    time: "8:30〜",
    location: "屋台保管庫前",
    target: "祭り青年・自治会役員",
    categoryType: "resident",
    image: "icons/event_mushiboshi.jpg"
  },
  {
    dateStr: "8月16日（日）",
    date: "8月16日（日）",
    title: "つくし野区「和会」",
    dateVal: "2026-08-16",
    startDate: "2026-08-16",
    time: "10:00〜12:00",
    location: "つくし野公会堂",
    target: "シニア世代・区民の皆様",
    categoryType: "resident",
    image: "icons/event_nagomi.jpg"
  },
  {
    dateStr: "8月22日（土）",
    date: "8月22日（土）",
    title: "📦 古紙回収 8:00～（雨天8/29）",
    dateVal: "2026-08-22",
    startDate: "2026-08-22",
    time: "8:00〜",
    location: "各指定集積場所",
    target: "全区民",
    rain: "雨天時は8/29へ順延",
    categoryType: "resident"
  },
  {
    dateStr: "8月22日（土）",
    date: "8月22日（土）",
    title: "役員会",
    dateVal: "2026-08-22",
    startDate: "2026-08-22",
    time: "19:00〜",
    location: "つくし野公会堂",
    target: "自治会役員",
    categoryType: "management"
  },
  {
    dateStr: "9月5日（土）",
    date: "9月5日（土）",
    title: "総合防災訓練（避難所訓練報告）",
    dateVal: "2026-09-05",
    startDate: "2026-09-05",
    time: "8:30〜11:00",
    location: "つくしの公園・公会堂",
    target: "全区民",
    belongings: "非常用持出袋、飲料水",
    categoryType: "resident"
  },
  {
    dateStr: "9月（日付未定）",
    date: "9月（日付未定）",
    title: "お祭り前草刈り・お祭り総会",
    isDateUndecided: true,
    location: "屋台周辺・公会堂",
    target: "お祭り担当・区民",
    categoryType: "resident"
  },
  {
    dateStr: "9月13日（日）",
    date: "9月13日（日）",
    title: "敬老会（記念品お渡し）",
    dateVal: "2026-09-13",
    startDate: "2026-09-13",
    time: "10:00〜12:00",
    location: "対象者宅へ配布 / 公会堂",
    target: "75歳以上の区民の皆様",
    categoryType: "resident",
    image: "icons/event_bousai.jpg"
  },
  {
    dateStr: "9月19日（土）",
    date: "9月19日（土）",
    title: "📦 古紙回収 8:00～（雨天10/24）",
    dateVal: "2026-09-19",
    startDate: "2026-09-19",
    time: "8:00〜",
    location: "各指定集積場所",
    categoryType: "resident"
  },
  {
    dateStr: "9月19日（土）",
    date: "9月19日（土）",
    title: "役員会",
    dateVal: "2026-09-19",
    startDate: "2026-09-19",
    time: "19:00〜",
    location: "つくし野公会堂",
    categoryType: "management"
  },
  {
    dateStr: "10月3日（土）・4日（日）",
    date: "10月3日（土）・4日（日）",
    title: "つくし野区お祭り",
    dateVal: "2026-10-03",
    startDate: "2026-10-03",
    endDate: "2026-10-04",
    time: "終日",
    location: "つくし野区全域・公会堂周辺",
    target: "全区民・ご家族",
    categoryType: "resident",
    image: "icons/event_saiten.jpg"
  },
  {
    dateStr: "10月17日（土）",
    date: "10月17日（土）",
    title: "📦 古紙回収 8:00～（雨天10/24）",
    dateVal: "2026-10-17",
    startDate: "2026-10-17",
    time: "8:00〜",
    categoryType: "resident"
  },
  {
    dateStr: "10月24日（土）",
    date: "10月24日（土）",
    title: "役員会",
    dateVal: "2026-10-24",
    startDate: "2026-10-24",
    time: "19:00〜",
    categoryType: "management"
  },
  {
    dateStr: "11月1日（日）",
    date: "11月1日（日）",
    title: "草刈り奉仕作業",
    dateVal: "2026-11-01",
    startDate: "2026-11-01",
    time: "7:00〜8:30",
    location: "各組の担当区域・公園・区内道路",
    target: "全区民",
    categoryType: "resident",
    image: "icons/event_kusakari.jpg"
  },
  {
    dateStr: "11月20日（金）",
    date: "11月20日（金）",
    title: "📦 古紙回収 8:00～（雨天11/27）",
    dateVal: "2026-11-20",
    startDate: "2026-11-20",
    time: "8:00〜",
    categoryType: "resident"
  },
  {
    dateStr: "11月21日（土）",
    date: "11月21日（土）",
    title: "役員会",
    dateVal: "2026-11-21",
    startDate: "2026-11-21",
    time: "19:00〜",
    categoryType: "management"
  },
  {
    dateStr: "12月6日（日）",
    date: "12月6日（日）",
    title: "地域防災訓練（市内一斉）",
    dateVal: "2026-12-06",
    startDate: "2026-12-06",
    time: "8:30〜",
    categoryType: "resident"
  },
  {
    dateStr: "12月19日（土）",
    date: "12月19日（土）",
    title: "📦 古紙回収 8:00～（雨天12/26）",
    dateVal: "2026-12-19",
    startDate: "2026-12-19",
    time: "8:00〜",
    categoryType: "resident"
  },
  {
    dateStr: "12月19日（土）",
    date: "12月19日（土）",
    title: "役員会",
    dateVal: "2026-12-19",
    startDate: "2026-12-19",
    categoryType: "management"
  },
  {
    dateStr: "1月16日（土）",
    date: "1月16日（土）",
    title: "📦 古紙回収（雨天1/23）",
    dateVal: "2027-01-16",
    startDate: "2027-01-16",
    categoryType: "resident"
  },
  {
    dateStr: "1月23日（土）",
    date: "1月23日（土）",
    title: "役員会",
    dateVal: "2027-01-23",
    startDate: "2027-01-23",
    categoryType: "management"
  },
  {
    dateStr: "2月20日（土）",
    date: "2月20日（土）",
    title: "📦 古紙回収（雨天2/27）",
    dateVal: "2027-02-20",
    startDate: "2027-02-20",
    categoryType: "resident"
  },
  {
    dateStr: "2月20日（土）",
    date: "2月20日（土）",
    title: "役員会",
    dateVal: "2027-02-20",
    startDate: "2027-02-20",
    categoryType: "management"
  },
  {
    dateStr: "3月20日（土）",
    date: "3月20日（土）",
    title: "📦 古紙回収（雨天3/27）",
    dateVal: "2027-03-20",
    startDate: "2027-03-20",
    categoryType: "resident"
  },
  {
    dateStr: "3月21日（日）",
    date: "3月21日（日）",
    title: "役員会",
    dateVal: "2027-03-21",
    startDate: "2027-03-21",
    categoryType: "management"
  }
];

// 和田岡地区の予定一覧
export const wadaokaEvents: SimpleEvent[] = [
  { dateStr: "4月10日（金）", date: "4月10日（金）", title: "まち協常任理事会・区長会", dateVal: "2026-04-10", startDate: "2026-04-10" },
  { dateStr: "4月11日（土）", date: "4月11日（土）", title: "福祉協議会総会", dateVal: "2026-04-11", startDate: "2026-04-11" },
  { dateStr: "4月18日（土）", date: "4月18日（土）", title: "まち協総会・親水公園総会", dateVal: "2026-04-18", startDate: "2026-04-18" },
  { dateStr: "5月15日（金）", date: "5月15日（金）", title: "まち協常任理事会・区長会", dateVal: "2026-05-15", startDate: "2026-05-15" },
  { dateStr: "6月（日付未定）", date: "6月（日付未定）", title: "親水公園草刈り作業（1回目）", startDate: "2026-06-01" },
  { dateStr: "6月12日（金）", date: "6月12日（金）", title: "まち協常任理事会・区長会", dateVal: "2026-06-12", startDate: "2026-06-12" },
  { dateStr: "7月7日（火）",  date: "7月7日（火）",  title: "地域出前講座", dateVal: "2026-07-07", startDate: "2026-07-07" },
  { dateStr: "7月10日（金）", date: "7月10日（金）", title: "まち協常任理事会・区長会", dateVal: "2026-07-10", startDate: "2026-07-10" },
  { dateStr: "7月12日（日）", date: "7月12日（日）", title: "スポーツ交流会", dateVal: "2026-07-12", startDate: "2026-07-12" },
  { dateStr: "7月（日付未定）", date: "7月（日付未定）", title: "親水公園草刈り作業（2回目）", startDate: "2026-07-01" },
  {
    dateStr: "8月9日（日）",
    date: "8月9日（日）",
    title: "2026 和田岡地区 納涼祭",
    dateVal: "2026-08-09",
    startDate: "2026-08-09",
    time: "17:00〜20:30",
    location: "和田岡小学校 体育館・グラウンド",
    target: "和田岡地区・つくし野区住民・ご家族・どなたでも",
    fee: "入場無料（夜店・キッチンカーは有料）",
    belongings: "上履き、くつ袋、手持ち花火（指定エリア用）",
    application: "申込み不要（直接会場へお越しください）",
    rain: "雨天時は体育館内で開催",
    image: "icons/nouryousai_poster.jpg"
  },
  { dateStr: "8月14日（金）", date: "8月14日（金）", title: "まち協常任理事会・区長会", dateVal: "2026-08-14", startDate: "2026-08-14" },
  { dateStr: "9月5日（土）",  date: "9月5日（土）",  title: "広域避難所運営訓練", dateVal: "2026-09-05", startDate: "2026-09-05" },
  { dateStr: "9月11日（金）", date: "9月11日（金）", title: "まち協常任理事会・区長会", dateVal: "2026-09-11", startDate: "2026-09-11" },
  { dateStr: "10月3日（土）・4日（日）", date: "10月3日（土）・4日（日）", title: "和田岡地区祭典", dateVal: "2026-10-03", startDate: "2026-10-03", endDate: "2026-10-04" },
  { dateStr: "10月16日（金）", date: "10月16日（金）", title: "まち協常任理事会・区長会", dateVal: "2026-10-16", startDate: "2026-10-16" },
  { dateStr: "10月18日（日）", date: "10月18日（日）", title: "新体力測定", dateVal: "2026-10-18", startDate: "2026-10-18" },
  { dateStr: "11月（日付未定）", date: "11月（日付未定）", title: "親水公園草刈り作業（3回目）", startDate: "2026-11-01" },
  { dateStr: "11月8日（日）", date: "11月8日（日）", title: "文化交流会・歩け歩け大会", dateVal: "2026-11-08", startDate: "2026-11-08" },
  { dateStr: "11月13日（金）", date: "11月13日（金）", title: "まち協常任理事会・区長会", dateVal: "2026-11-13", startDate: "2026-11-13" },
  { dateStr: "11月29日（日）", date: "11月29日（日）", title: "和田岡地区「和会」", dateVal: "2026-11-29", startDate: "2026-11-29" },
  { dateStr: "12月11日（金）", date: "12月11日（金）", title: "まち協常任理事会・区長会", dateVal: "2026-12-11", startDate: "2026-12-11" },
  { dateStr: "1月15日（金）", date: "1月15日（金）", title: "まち協常任理事会・区長会", dateVal: "2027-01-15", startDate: "2027-01-15" },
  { dateStr: "2月12日（金）", date: "2月12日（金）", title: "まち協常任理事会・区長会", dateVal: "2027-02-12", startDate: "2027-02-12" },
  { dateStr: "3月12日（金）", date: "3月12日（金）", title: "まち協常任理事会・区長会", dateVal: "2027-03-12", startDate: "2027-03-12" }
];

// 各種団体の月別活動
export const organizationMonths: MonthlyOrgActivity[] = [
  {
    month: "4月",
    groups: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "地区内防犯・生活環境パトロール／文化部・体育部・交通安全部・広報部の総会、街頭指導・取材" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "第1回企画委員会・総会／子育て支援打合せ" },
      { groupName: "親水公園管理委員会", group: "親水公園管理委員会", activity: "施設点検・総会" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "吉岡朝友会 総会" }
    ],
    events: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "地区内防犯・生活環境パトロール" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "第1回企画委員会・総会" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "吉岡朝友会 総会" }
    ]
  },
  {
    month: "5月",
    groups: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "地区内防犯・生活環境パトロール／スポーツ交流会打合せ／街頭指導／取材・まち協便り発行" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "第1回運営委員会・第2回企画委員会／始めの会・仲良くなろう自由遊び" },
      { groupName: "親水公園管理委員会", group: "親水公園管理委員会", activity: "施設点検・事前草刈り・役員会" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "朝友会 グランドゴルフ／消防団 放水訓練（未定）" }
    ],
    events: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "スポーツ交流会打合せ" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "第2回企画委員会" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "朝友会 グランドゴルフ" }
    ]
  },
  {
    month: "6月",
    groups: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "生活環境パトロール・見守りネットワーク研修会／スポーツ交流会の事前練習・納涼祭打合せ" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "第1回ふくし館奉仕作業" },
      { groupName: "親水公園管理委員会", group: "親水公園管理委員会", activity: "施設点検・サポーター草刈り・役員会・事前草刈り" }
    ],
    events: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "スポーツ交流会の事前練習" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "ふくし館奉仕作業" }
    ]
  },
  {
    month: "7月",
    groups: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "地区内防犯・生活環境パトロール／スポーツ交流会・納涼祭準備" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "第3回企画委員会・出前講座／七夕まつり" },
      { groupName: "親水公園管理委員会", group: "親水公園管理委員会", activity: "施設点検・サポーター草刈り・役員会・事前草刈り" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "味作会 味噌・しそ巻き" }
    ],
    events: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "スポーツ交流会" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "七夕まつり" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "味作会 味噌・しそ巻き" }
    ]
  },
  {
    month: "8月",
    groups: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "生活環境パトロール・納涼祭" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "納涼祭（夜店）／第1回和会（自治会区）" },
      { groupName: "親水公園管理委員会", group: "親水公園管理委員会", activity: "施設点検・事前草刈り・役員会" }
    ],
    events: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "納涼祭" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "和会（自治会区）" }
    ]
  },
  {
    month: "9月",
    groups: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "地区内防犯・生活環境パトロール／新体力測定準備" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "敬老会（各区）記念品配布応援／ミニ運動会" },
      { groupName: "親水公園管理委員会", group: "親水公園管理委員会", activity: "施設点検・事前草刈り・役員会" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "味作会 おやつ／朝友会 慰霊祭" }
    ],
    events: [
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "敬老会 記念品配布" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "朝友会 慰霊祭" }
    ]
  },
  {
    month: "10月",
    groups: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "生活環境パトロール・新体力測定" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "第4回企画委員会／ハロウィン" },
      { groupName: "親水公園管理委員会", group: "親水公園管理委員会", activity: "施設点検・事前草刈り・役員会" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "味作会 保存食" }
    ],
    events: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "新体力測定" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "ハロウィン" }
    ]
  },
  {
    month: "11月",
    groups: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "地区内防犯・生活環境パトロール／和田岡文化交流会・歩け歩け大会" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "第5回企画委員会・第2回運営委員会" },
      { groupName: "親水公園管理委員会", group: "親水公園管理委員会", activity: "施設点検・サポーター草刈り・役員会" }
    ],
    events: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "文化交流会・歩け歩け大会" }
    ]
  },
  {
    month: "12月",
    groups: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "地区内防犯・生活環境パトロール" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "第2回ふくし館奉仕作業／第2回和会（和田岡地区）／読み聞かせ・クリスマス会" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "味作会 味噌づくり／消防団 防火パトロール" }
    ],
    events: [
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "和会（和田岡地区）" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "消防団 防火パトロール" }
    ]
  },
  {
    month: "1月",
    groups: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "地区内防犯・生活環境パトロール・見守りネットワーク報告会" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "節分・鬼退治" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "味作会 味噌づくり／朝友会 新年会" }
    ],
    events: [
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "節分・鬼退治" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "朝友会 新年会" }
    ]
  },
  {
    month: "2月",
    groups: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "地区内防犯・生活環境パトロール" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "味作会 味噌づくり" }
    ],
    events: [
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "味作会 味噌づくり" }
    ]
  },
  {
    month: "3月",
    groups: [
      { groupName: "まちづくり協議会", group: "まちづくり協議会", activity: "生活環境パトロール／各部の理事会・専門部会" },
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "第6回企画委員会／お別れ会・お楽しみ会" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "消防団 入団式" }
    ],
    events: [
      { groupName: "地区福祉協議会", group: "地区福祉協議会", activity: "お別れ会・お楽しみ会" },
      { groupName: "地域振興支援団体", group: "地域振興支援団体", activity: "消防団 入団式" }
    ]
  }
];

export function getNextHomeEvent(now: Date): NextEventResult {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // 今日の17時を閾値とする
  const cutoffTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0);

  // 地区をまたいで開催日の近い順に並べ、直近の行事を選ぶ
  const event = [...tsukushinoEvents, ...wadaokaEvents]
    .filter(item => {
      const endStr = item.endDate || item.startDate || item.dateVal;
      if (!endStr) return false;

      const [ey, em, ed] = endStr.split('-').map(Number);
      const eventEndDate = new Date(ey, em - 1, ed);
      if (eventEndDate.getTime() === today.getTime()) return now < cutoffTime;
      return eventEndDate > today;
    })
    .sort((a, b) => {
      const aStart = a.startDate || a.dateVal || '9999-12-31';
      const bStart = b.startDate || b.dateVal || '9999-12-31';
      return aStart.localeCompare(bStart);
    })[0];

  if (!event) {
    return {
      date: "日程未登録",
      weekday: "",
      title: "新しい行事予定をご確認ください",
      daysLeft: -1
    };
  }

  const startStr = event.startDate || event.dateVal || "";
  const [sy, sm, sd] = startStr.split('-').map(Number);
  const eventStartDate = new Date(sy, sm - 1, sd);
  
  const diffTime = eventStartDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    date: event.dateStr,
    weekday: startStr ? `${weekdayNames[eventStartDate.getDay()]}曜日` : "",
    title: event.title,
    daysLeft: diffDays >= 0 ? diffDays : 0,
    time: event.time,
    location: event.location,
    target: event.target,
    fee: event.fee,
    belongings: event.belongings,
    application: event.application,
    rain: event.rain,
    image: event.image
  };
}

export function getEventStatus(
  startDateStr?: string,
  endDateStr?: string,
  isDateUndecided?: boolean,
  now: Date = new Date()
): 'today' | 'upcoming' | 'finished' | 'undecided' {
  if (isDateUndecided || !startDateStr) {
    return 'undecided';
  }

  const [sy, sm, sd] = startDateStr.split('-').map(Number);
  const startDate = new Date(sy, sm - 1, sd, 0, 0, 0);

  const endStr = endDateStr || startDateStr;
  const [ey, em, ed] = endStr.split('-').map(Number);
  const endDate = new Date(ey, em - 1, ed, 23, 59, 59);

  if (now >= startDate && now <= endDate) {
    return 'today';
  } else if (now < startDate) {
    return 'upcoming';
  } else {
    return 'finished';
  }
}

/**
 * EventsPage.tsx から eventData.xxx の形式でアクセスできるようにするオブジェクト
 */
export const eventData = {
  tsukushinoEvents,
  wadaokaEvents,
  organizationMonths,
  getNextHomeEvent,
  getEventStatus,
};

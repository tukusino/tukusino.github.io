export type FestivalScheduleItem = {
  period: string;
  activity: string;
  note?: string;
};

export const festivalSampleSchedule: FestivalScheduleItem[] = [
  { period: '8月下旬', activity: '祭典総会' },
  { period: '9月ごろから', activity: '太鼓・踊りの練習' },
  { period: '9月上旬～中旬', activity: '草刈り・予備日' },
  { period: '9月下旬ごろ（祭典日の1週間前）', activity: '全区民参加の祭典準備' },
  { period: '祭典前日', activity: '会所内の準備', note: '飾り付けなど' },
  { period: '10月第1週', activity: 'つくし野区祭典' },
  { period: '祭典後', activity: '後片付け' },
];

export const festivalRoleGroups = [
  {
    title: '祭典委員会',
    roles: ['祭典委員長（区長）', '祭典副委員長（副区長）', '区会計（副区長兼任）'],
  },
  {
    title: '青年会',
    roles: ['青年会長', '青年副会長', '青年会計', '屋台・お囃子の担当'],
  },
  {
    title: '中老会',
    roles: ['大老グループ：万灯', '中老グループ：屋台・イベント', '壮年グループ：屋台・交通'],
  },
  {
    title: '子供係',
    roles: ['踊りの担当'],
  },
] as const;

export const festivalParticipationNotes = [
  '屋台の運行中は、係や青年会の案内に従ってください。',
  '小さなお子さまは、できるだけ保護者と一緒に参加してください。',
  '交通係を担当する方は飲酒を控えるなど、安全な運行にご協力ください。',
  '片付けは、参加できる方で協力して行います。',
  '今年の集合時間・服装・持ち物は、確定後に改めてお知らせします。',
] as const;

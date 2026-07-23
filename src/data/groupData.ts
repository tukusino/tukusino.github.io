export interface CommunityGroup {
  id: string;
  name: string;
  category: string;
  summary: string;
  schedule: string;
  icon: string;
  target: string;
}

export const communityGroups: CommunityGroup[] = [
  {
    id: 'grp-1',
    name: '自主防災隊（防災委員会）',
    category: '安全・防災',
    summary: '区民の生命と財産を守るため、防災倉庫の管理、定期点検、防災訓練の企画・運営を行っています。',
    schedule: '月1回 点検・随時訓練',
    icon: '🚨',
    target: '区民有志・役員'
  },
  {
    id: 'grp-2',
    name: 'つくし野「和会（なごみかい）」',
    category: 'シニア・親睦',
    summary: 'シニア世代の健康づくりと親睦を目的として、毎月のグラウンドゴルフや懇親行事を楽しんでいます。',
    schedule: '毎月第3土曜日 他',
    icon: '🍵',
    target: '区内在住のシニア世帯'
  },
  {
    id: 'grp-3',
    name: 'クリーン推進員（環境整備）',
    category: '環境・衛生',
    summary: 'ゴミ集積所の清潔保持、マナー啓発、リサイクル活動のサポートを組順当番制で推進しています。',
    schedule: 'ゴミ収集日・毎月第3土曜日',
    icon: '🧹',
    target: '当番世帯（満65歳以上75歳未満・4月1日時点）'
  },
  {
    id: 'grp-4',
    name: '祭典保存会（祭り青年・役員）',
    category: '伝統・文化',
    summary: '毎年秋の「つくし野区祭典」における屋台の維持管理、引き回し、安全運行を担っています。',
    schedule: '8月〜10月 準備・本番',
    icon: '🏮',
    target: '区内有志・青年層'
  },
  {
    id: 'grp-5',
    name: '地域見守りボランティア',
    category: '子ども・防犯',
    summary: '小学校登校時のお散歩・見守りや青色防犯パトロール車による巡回を行い、子どもたちの安全を確保しています。',
    schedule: '小学校登校日',
    icon: '🎒',
    target: '有志区民・補導員'
  }
];

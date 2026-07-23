export interface ActivityReport {
  id: string;
  year: number; // 例: 2026, 2025
  dateStr: string; // 例: "2026.07.15"
  title: string;
  category: 'event' | 'disaster' | 'environment' | 'safety';
  categoryLabel: string;
  summary: string;
  image?: string;
  participantCount?: string;
  details?: string;
}

export interface ArchiveDocument {
  id: string;
  year: number;
  monthStr: string; // 例: "2026年7月"
  title: string;
  category: 'circular' | 'report' | 'general' | 'schedule';
  categoryLabel: string;
  summary: string;
}

// モック活動レポートデータ
export const mockActivityReports: ActivityReport[] = [
  {
    id: 'rep-1',
    year: 2026,
    dateStr: '2026.07.15',
    title: '【サンプル（仮）】夏季一斉草刈り奉仕作業を実施しました',
    category: 'environment',
    categoryLabel: '環境整備',
    summary: '区内の各組にて一斉草刈り作業を実施いたしました。早朝からの作業により、公会堂周辺や通学路、主要道路沿いの美化と視界の確保が完了いたしました。ご協力ありがとうございました。',
    participantCount: '約120名参加',
    image: 'icons/icon_garbage.jpg'
  },
  {
    id: 'rep-2',
    year: 2026,
    dateStr: '2026.06.20',
    title: '【サンプル（仮）】防災倉庫の資機材点検・動作確認を完了しました',
    category: 'disaster',
    categoryLabel: '防災',
    summary: '自主防災隊および役員にて、防災倉庫内の非常用発電機、投光器、大型テント、災害用簡易トイレの点検および試運転を実施しました。すべての資機材が正常に作動することを確認済みです。',
    participantCount: '役員・自主防災隊 15名',
    image: 'icons/icon_disaster.jpg'
  },
  {
    id: 'rep-3',
    year: 2026,
    dateStr: '2026.05.18',
    title: '【サンプル（仮）】土砂災害避難訓練（市内一斉）を実施しました',
    category: 'disaster',
    categoryLabel: '防災',
    summary: '大雨・土砂災害を想定した市内一斉避難訓練に参加しました。一次集合場所（つくしの公園）への安否確認伝達、および指定避難所への連絡手順を迅速に行いました。',
    participantCount: '45世帯参加',
    image: 'icons/icon_disaster.jpg'
  },
  {
    id: 'rep-4',
    year: 2025,
    dateStr: '2025.10.05',
    title: '【サンプル（仮）】令和7年度 つくし野区祭典が盛大に開催されました',
    category: 'event',
    categoryLabel: '行事',
    summary: '秋晴れのもと、つくし野区祭典が開催されました。屋台の引き回しや公会堂前での催し物を通して、子どもからシニアまで世代を超えた交流と親睦を深めました。',
    participantCount: '区民多数参加',
    image: 'icons/icon_event.jpg'
  },
  {
    id: 'rep-5',
    year: 2025,
    dateStr: '2025.08.10',
    title: '【サンプル（仮）】和田岡地区 納涼祭に参加・協力いたしました',
    category: 'event',
    categoryLabel: '行事',
    summary: '和田岡小学校グラウンドにて開催された納涼祭へ参加しました。つくし野区からも多くの皆様にご来場いただき、夜店や手持ち花火を楽しみました。',
    participantCount: '地区合同',
    image: 'icons/icon_event.jpg'
  }
];

// モック年度別アーカイブ資料データ（※個人名・訃報等は排除済み）
export const mockArchiveDocuments: ArchiveDocument[] = [
  {
    id: 'doc-1',
    year: 2026,
    monthStr: '2026年7月',
    title: '【サンプル（仮）】7月度 自治会回覧板・お知らせ総集編',
    category: 'circular',
    categoryLabel: '回覧板',
    summary: '公式LINE・HP試行開設の案内、製品プラスチック分別収集事前周知、夏休み見守り活動等。'
  },
  {
    id: 'doc-2',
    year: 2026,
    monthStr: '2026年4月',
    title: '【サンプル（仮）】令和8年度 つくし野区通常総会 資料',
    category: 'general',
    categoryLabel: '総会資料',
    summary: '令和8年度事業計画、つくし野区細則改定の承認事項、予算決算報告等。'
  },
  {
    id: 'doc-3',
    year: 2025,
    monthStr: '2025年12月',
    title: '【サンプル（仮）】令和7年度 地域防災訓練 実施結果報告',
    category: 'report',
    categoryLabel: '活動報告',
    summary: '12月実施の地域一斉防災訓練の参加状況、避難経路の安全点検報告。'
  },
  {
    id: 'doc-4',
    year: 2025,
    monthStr: '2025年4月',
    title: '【サンプル（仮）】令和7年度 つくし野区年間行事予定表',
    category: 'schedule',
    categoryLabel: '年間行事',
    summary: '令和7年度のつくし野区および和田岡地区の行事・会議日程一覧。'
  }
];

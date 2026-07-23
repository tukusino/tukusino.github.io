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

export interface RegionalImprovement {
  id: string;
  category: string;
  title: string;
  summary: string;
}

// 令和7年度事業報告に基づく活動レポート
export const mockActivityReports: ActivityReport[] = [
  {
    id: 'r7-safety', year: 2025, dateStr: '令和7年度', title: '防犯・交通安全の改善を実施しました', category: 'safety', categoryLabel: '安全対策',
    summary: 'つくし野区入り口への防犯カメラ設置、県道271号吉岡団地北側カーブへの減速看板2基設置、富部交差点への横断旗設置、7組T字路への一旦停止看板設置を行いました。', image: 'icons/icon_disaster.jpg'
  },
  {
    id: 'r7-disaster', year: 2025, dateStr: '2025年6月', title: '防災用テントを整備しました', category: 'disaster', categoryLabel: '防災',
    summary: '市の補助金を活用し、大型テントとトイレ用テント（トイレ付き）を購入しました。災害時の避難所運営に備えるための資機材整備です。', image: 'icons/icon_disaster.jpg'
  },
  {
    id: 'r7-facility', year: 2025, dateStr: '2025年6月〜8月', title: '公会堂・公園の環境を整備しました', category: 'environment', categoryLabel: '環境整備',
    summary: '公会堂の網戸張り替え、掲示板修理、座敷用ジョイントマット購入を実施。公園では滑り台の塗装と、背もたれのないベンチ1台の設置を行いました。', image: 'hall.jpg'
  },
  {
    id: 'r7-living', year: 2025, dateStr: '2025年3月〜7月', title: '暮らしを支える取り組みを進めました', category: 'environment', categoryLabel: '生活支援',
    summary: '3月からゴミ集積所の施錠を取りやめ、良好な利用環境の維持に取り組みました。7月には移動スーパー「とくし丸」の販売も始まりました。', image: 'icons/icon_garbage.jpg'
  },
  {
    id: 'r7-welfare', year: 2025, dateStr: '2025年8月〜9月', title: '健康・福祉の活動を開始しました', category: 'event', categoryLabel: '健康・福祉',
    summary: '75歳以上の区民へ「新・私の健康人生設計ノート」を配布し、9月から「筋ちゃん体操」を開始しました。', image: 'icons/icon_event.jpg'
  },
  {
    id: 'r7-festival', year: 2025, dateStr: '2025年10月', title: 'つくし野区祭典を開催しました', category: 'event', categoryLabel: '行事',
    summary: 'つくし野区祭典は例年になく盛り上がり、無事に終了しました。世代を超えた交流と地域のつながりを深める機会となりました。', image: 'icons/icon_event.jpg'
  }
];

// ホームの「地域改善実績」に掲載している令和7年度の14項目
export const regionalImprovements: RegionalImprovement[] = [
  { id: 'improvement-01', category: '防犯・交通安全', title: '防犯カメラを設置', summary: 'つくし野区入り口に防犯カメラを設置しました（3月）。' },
  { id: 'improvement-02', category: '防犯・交通安全', title: '減速用看板を設置', summary: '通学路に減速用の看板を2個設置しました（6月）。' },
  { id: 'improvement-03', category: '防犯・交通安全', title: '一旦停止看板を設置', summary: '7組のT字路に一旦停止の看板を設置しました（8月）。' },
  { id: 'improvement-04', category: '防犯・交通安全', title: '横断旗を設置', summary: '富部交差点に歩行者用の横断旗を設置しました（7月）。' },
  { id: 'improvement-05', category: '防災', title: '防災用テントを購入', summary: '市の補助金を活用し、防災用テントを購入しました（6月）。' },
  { id: 'improvement-06', category: '環境整備', title: '公園の滑り台を塗装', summary: '公園の滑り台を塗装しました（3月）。' },
  { id: 'improvement-07', category: '環境整備', title: '公園にベンチを設置', summary: '公園にベンチ1台を設置しました。' },
  { id: 'improvement-08', category: '施設整備', title: '公会堂の網戸を修理', summary: '公会堂の網戸を修理しました。' },
  { id: 'improvement-09', category: '施設整備', title: '公会堂の掲示板を修理', summary: '公会堂の掲示板を修理しました。' },
  { id: 'improvement-10', category: '施設整備', title: '座敷用マットを購入', summary: '公会堂の座敷用ジョイントマットを購入しました。' },
  { id: 'improvement-11', category: '生活支援', title: 'ゴミ集積所の施錠を解除', summary: 'ゴミ集積所の施錠を取りやめ、良好な利用環境の維持に取り組みました。' },
  { id: 'improvement-12', category: '生活支援', title: '移動スーパーの販売を開始', summary: '移動スーパー「とくし丸」の販売を開始しました（7月）。' },
  { id: 'improvement-13', category: '健康・福祉', title: '筋ちゃん体操を開始', summary: '「筋ちゃん体操」を開始しました（9月）。' },
  { id: 'improvement-14', category: '健康・福祉', title: '健康人生設計ノートを配布', summary: '75歳以上の区民へ健康人生設計ノートを配布しました。' },
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
    title: '令和7年度 事業報告',
    category: 'report',
    categoryLabel: '活動報告',
    summary: '安全対策、防災、公会堂・公園整備、生活支援、健康福祉、祭典などの実施内容。'
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

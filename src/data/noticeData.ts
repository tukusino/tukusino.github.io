// つくし野区 お知らせデータと自動表示判定ロジック

export interface NoticeItem {
  id: string;
  publishDate: string;  // 画面表示用の日付（例: '2026.04.12'）
  title: string;
  content: string;
  category: 'important' | 'info' | 'disaster' | 'event';
  categoryLabel: string;
  startDate: Date;      // 公開開始日時
  endDate: Date;        // 公開終了日時
  image?: string;       // チラシ・ポスター画像パス
}

// 令和8年度（2026年）の自治会活動に即した正確なお知らせデータ
export const defaultNotices: NoticeItem[] = [
  {
    id: 'n0_nouryousai',
    publishDate: '2026.07.23',
    title: '🎆【行事案内】8月9日（日）和田岡地区「2026 納涼祭」開催のお知らせ',
    content: '2026年8月9日（日）17:00より、和田岡小学校体育館にて「和田岡地区 納涼祭」が開催されます！\n\n【お楽しみ企画・出店】\n・🍧 夜店大集合（焼きそば、綿菓子、かき氷、スーパーボールすくいなど）\n・🚚 キッチンカー出店\n・✨ 会場イルミネーション ＆ 🎆 子どもの手持ち花火（指定エリア）\n・🎁 大人も子供も当たる大抽選会！\n\n【★ ゲスト ＆ パフォーマー ★】\n・🎈 NEW STEP（ARATAとHAYASEによるスピーディーなバルーンアート）\n・💃 瑞穂会（日本の踊り）\n・⚽ チーム愛野公園（フリースタイルフットボール）\n\n皆様お誘いあわせの上、ぜひご来場ください！',
    category: 'event',
    categoryLabel: '行事',
    startDate: new Date('2026-07-23T00:00:00'),
    endDate: new Date('2026-08-10T23:59:59'),
    image: 'icons/nouryousai_poster.jpg'
  },
  {
    id: 'n1',
    publishDate: '2026.07.22',
    title: 'つくし野区「公式LINE＆公式Webサイト」開設（試行運用）のお知らせ',
    content: 'つくし野区自治会では、区民の皆様への迅速な情報伝達と利便性向上のため、公式LINEアカウントおよび公式Webサイト（HP）を実験的・試行的に開設いたしました。ゴミ収集日、年間行事予定、防災情報、Q&Aなどをスマートフォンから簡単にご確認いただけます。今後の正式運用に向けて、ぜひご活用とLINE友だち追加をお願いいたします。',
    category: 'important',
    categoryLabel: '重要',
    startDate: new Date('2026-07-22T00:00:00'),
    endDate: new Date('2027-03-31T23:59:59'),
  },
  {
    id: 'n2',
    publishDate: '2026.07.10',
    title: '【ゴミ収集】2026年10月〜「製品プラスチック」分別回収開始のおしらせ',
    content: '掛川市では2026年10月1日より、プラマークのない製品プラスチック（バケツ・ハンガー等プラ100%製品）もプラスチック資源として収集されます。開始前の分別ルールや対象物品の詳細は「ゴミの日」ページをご確認ください。',
    category: 'info',
    categoryLabel: 'お知らせ',
    startDate: new Date('2026-07-10T00:00:00'),
    endDate: new Date('2027-03-31T23:59:59'),
  },
  {
    id: 'n3',
    publishDate: '2026.07.05',
    title: '【防災情報】一次集合場所（つくしの公園）および指定避難所（和田岡小学校）のご案内',
    content: '地震や風水害などの災害に備え、つくし野区の一次集合場所（つくしの公園・つくし野公会堂）および掛川市指定広域避難所（和田岡小学校：吉岡639-2）の位置を「防災・安全情報」ページに掲載しております。万が一の備えとしてご家族でご確認ください。',
    category: 'disaster',
    categoryLabel: '防災',
    startDate: new Date('2026-07-05T00:00:00'),
    endDate: new Date('2027-03-31T23:59:59'),
  },
  {
    id: 'n4',
    publishDate: '2026.06.25',
    title: '【行事予定】秋の「つくし野区祭典（お祭り）」のご案内',
    content: '毎年秋に実施される「つくし野区祭典」の開催に向け、準備が進められています。屋台（だし）の引き回しや催し物の詳細日程につきましては、「行事予定」ページおよび回覧板にて順次案内いたします。',
    category: 'event',
    categoryLabel: '行事',
    startDate: new Date('2026-06-25T00:00:00'),
    endDate: new Date('2026-11-30T23:59:59'),
  },
  {
    id: 'n5',
    publishDate: '2026.04.12',
    title: '「つくし野区細則」の一部改定について',
    content: '令和8年4月12日の通常総会にて「つくし野区細則」の一部改定が承認されました。主な変更点は「当番クリーン推進員の年齢対象の変更（満65歳以上75歳未満・4月1日時点）」および役員・専門委員に関する規定の改定です。詳細は自治会から配布された最新の規約冊子、または役員までご確認ください。',
    category: 'important',
    categoryLabel: '重要',
    startDate: new Date('2026-04-12T00:00:00'),
    endDate: new Date('2027-03-31T23:59:59'),
  },
  {
    id: 'n6',
    publishDate: '2026.04.12',
    title: '令和8年度 事業計画の掲載について',
    content: '令和8年度のつくし野区および和田岡地区の事業計画を「行事予定」ページに掲載いたしました。天候や諸事情により日程が変更される場合があります。正式な案内は従来通り回覧板等の紙面にてご確認ください。',
    category: 'info',
    categoryLabel: '行事',
    startDate: new Date('2026-04-12T00:00:00'),
    endDate: new Date('2027-03-31T23:59:59'),
  }
];

export const noticeList: NoticeItem[] = defaultNotices;

/**
 * 現在日時において「公開期間中」のお知らせを取得する
 */
export function getActiveNotices(now: Date): NoticeItem[] {
  return noticeList
    .filter(item => now >= item.startDate && now <= item.endDate)
    .sort((a, b) => b.startDate.getTime() - a.startDate.getTime()); // 新しい順（降順）にソート
}

/**
 * HOME画面表示用（公開中の最新3件）を取得する
 */
export function getHomeNotices(now: Date, limit: number = 3): NoticeItem[] {
  return getActiveNotices(now).slice(0, limit);
}

interface InfoPagesProps {
  page: 'about' | 'roles' | 'rules';
  onNavigate: (page: string) => void;
}

export const InfoPages = ({ page, onNavigate }: InfoPagesProps) => {
  const content = {
    about: {
      eyebrow: 'つくし野区について',
      title: '自治会概要・活動意義',
      cards: [
        { title: '🏘️ 自治会はこんなことをしています（6つの取り組み）（仮）', text: 'つくし野区自治会では、住民の皆様が毎日安全で快適に暮らせるよう、以下の6つの軸で地域活動を行っています。\n\n① 🛡️ 安全を守る\n・防犯灯の管理点検およびLED化推進\n・つくし野区入り口への防犯カメラ設置\n・定期的な地域防犯パトロール\n\n② 🚨 災害に備える\n・自主防災訓練の企画・運営\n・市指定避難所および避難経路の確認\n・防災倉庫の備蓄・大型非常用テントの管理\n\n③ 🧹 地域をきれいにする\n・年2回の一斉草刈り奉仕作業（春・秋）\n・ゴミ集積所のクリーン推進・清潔保持\n\n④ 🎒 子どもを見守る\n・小学生の登下校時の見守り・街頭指導\n・通学路への減速看板および横断旗の設置\n\n⑤ 🍡 行事を開催する\n・つくし野区祭典および敬老会の開催\n・シニア親睦行事（和会）のサポート\n\n⑥ 📢 行政情報を届ける\n・掛川市役所からの公的広報の伝達\n・公式LINE・公式HPでの迅速な情報発信' },
        { title: '🎯 自治会の目的', text: '本会は、会員相互の親睦と密接な連絡協調を図ることにより、住みよい地域環境の整備、福祉の向上、および防犯・防災対策を推進し、安心・安全な地域社会を築くことを目的としています。' },
        { title: '📍 事務所の所在地', text: 'つくし野区自治会事務所は、掛川市細谷736番地の39（つくし野公会堂）に置かれています。' },
        { title: '🏘️ 構成世帯', text: '掛川市つくし野区域内の加入世帯を中心に、1組・2組・3組・5組・6組・7組の全6組、70世帯弱で組織されています。戸建て住宅および共同住宅の世帯が参加しています。' }
      ]
    },
    roles: {
      eyebrow: '役員の役割と組織',
      title: '区費・役員について',
      cards: [
        { title: '💰 区費・積立費', text: '本会の運営費として、月額区費1,500円と祭典（お祭り）積立費500円（合計月2,000円）をお支払いいただいています。アパート等の共同住宅居住者は協力金として月額1,000円です。集金は毎月、担当の組長が直接集金に伺います。' },
        { title: '👥 役員の構成', text: '自治会の運営は、総会で選出された区長(1名)、副区長(1名)、会計(1名)、監事(1名)のほか、各組内から毎年選出される組長6名によって行われています。' },
        { title: '🧹 クリーン当番と共同作業', text: 'ゴミ集積所のクリーン推進員は、満65歳以上75歳未満（4月1日時点）の対象世帯からの当番制とし、1人あたり1か月間担当します。共同草刈り作業に参加できない場合は、細則に基づき出不足料（1回につき1,000円。ただし満80歳以上や病気等の事情がある場合は免除）を納付いただきます。' }
      ]
    },
    rules: {
      eyebrow: '自治会のきまり',
      title: '規約・プライバシー',
      cards: [
        { title: '⚖️ 自治会規約・内規', text: '総会の開催条件、議決の仕組み、役員の選出、財産の管理方法など、つくし野区の自主的な運営ルールが明文化されています。' },
        { title: '🔒 個人情報の保護方針', text: '本会で管理する名簿等の個人情報は、行事・防災時の連絡や名簿、回覧板、区費等の管理、掛川市・和田岡地区関係団体への必要な報告、福祉・防災活動など、規程で定めた自治会活動の目的に限り利用します。本Webサイト上には、個人の氏名や連絡先などを掲載しません。訂正・利用停止等をご希望の場合は区長へお申し出ください。' }
      ]
    }
  };

  const currentContent = content[page];

  return (
    <div className="page-container">
      <header className="page-header">
        <span className="eyebrow">{currentContent.eyebrow}</span>
        <h1>{currentContent.title}</h1>
      </header>

      <div className="detail-cards" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {currentContent.cards.map((card, idx) => (
          <div key={idx} className="unified-card">
            <h2>{card.title}</h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--text)', margin: '8px 0 0', whiteSpace: 'pre-line' }}>{card.text}</p>
          </div>
        ))}
      </div>

      <div className="back-btn-action" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => onNavigate('home_menu')} className="back-btn secondary">📋 自治会メニューに戻る</button>
        <button onClick={() => onNavigate('home')} className="back-btn">🏠 ホームに戻る</button>
      </div>
    </div>
  );
};

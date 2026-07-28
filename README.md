# つくし野区自治会サイト

つくし野区自治会の住民向けWebサイトです。ごみの日、行事予定、お知らせ、防災情報を、スマートフォンでも読みやすく案内します。

## 普段の確認

```powershell
npm.cmd run dev
```

ブラウザで `http://127.0.0.1:5173/` を開きます。

## 公開前の確認

```powershell
npm.cmd run lint
npm.cmd run test:e2e
npm.cmd run build
```

`build` は型チェックを含みます。スマートフォン表示の確認は、iPhone SE・iPhone 12・Pixel 5相当のE2Eテストで行います。

## お知らせ・行事の更新

通常は Google スプレッドシートとApps Scriptを使用します。設定方法は [docs/google_sheets_setup.md](docs/google_sheets_setup.md) を確認してください。

Apps ScriptのURLは `.env.local` の `VITE_GAS_API_URL` にだけ保存します。未設定・通信失敗時には、サイトに同梱された確認用データを表示します。

## 公開方法

公開はGitHub Actionsで行います。`main`へ反映された内容が、検証後にGitHub Pagesへ公開されます。

ローカルの`dist`を直接公開したり、強制pushしたりしないでください。公開前には、Gitの状態と`origin/main`との差分を必ず確認します。

# ローカル確認のルール

公開前の確認は、必ずこの手順で行います。GitHub Pagesへの公開やデプロイは、利用者から明確な指示があった場合だけ実行します。

## 起動

プロジェクトのフォルダで、次を実行します。

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-local.ps1
```

起動できたことを `STARTED` または `ALREADY_RUNNING` の表示で確認してから、次を開きます。

```text
http://127.0.0.1:5173/
```

## 確認

- まずスマートフォン幅（390px）で確認する
- 必要なら通常のパソコン幅でも確認する
- 画面の確認が終わるまでは公開しない

## 終了

```powershell
powershell -ExecutionPolicy Bypass -File scripts/stop-local.ps1
```

## 運用上の約束

- `npm run dev` を直接使わず、必ず `start-local.ps1` を使う
- ポート番号は毎回 `5173` に固定する
- 起動済みなら新しく立ち上げず、そのまま同じURLを開く
- ローカルで確認後も、利用者の「公開して」の指示があるまでデプロイしない

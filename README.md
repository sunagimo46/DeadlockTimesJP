# Deadlock 攻略ブログ

Valve の新作ヒーローシューター「Deadlock」の攻略情報を発信するブログです。
YouTube・Reddit・Deadlock Wiki から話題を自動収集し、Claude Code が記事を自動生成します。

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Astro 5.x + React 19.x |
| スタイリング | Tailwind CSS v4 |
| コンテンツ管理 | Content Collections (glob loader) |
| 記事生成 | claude-code-action v1 |
| データ収集 | Python 3.11+ |
| CI/CD | GitHub Actions |
| ホスティング | Netlify |

---

## ローカル開発

### 必要な環境

- Node.js 20+
- Python 3.11+

### セットアップ

```bash
# 依存パッケージをインストール
npm install

# 開発サーバーを起動（http://localhost:4321）
npm run dev

# ビルド
npm run build

# ビルド結果をプレビュー
npm run preview
```

---

## 記事の書き方

### 手動で記事を作成する

`src/data/blog/` 配下に Markdown ファイルを作成します。

**ファイル名:** `YYYY-MM-DD-slug.md`（slug は英数字とハイフンのみ）

```markdown
---
title: "記事タイトル"
description: "記事の概要（120文字程度）"
pubDate: 2026-03-01
tags: ["タグ1", "タグ2"]
category: "hero-guide"
draft: false
---

## 見出し（h2 から開始）

本文...
```

### カテゴリ一覧

| カテゴリ値 | 表示名 | 説明 |
|-----------|--------|------|
| `hero-guide` | ヒーロー攻略 | 各ヒーローの立ち回り・ビルド・スキル解説 |
| `patch-notes` | パッチノート | 最新パッチノートの解説と環境分析 |
| `meta` | メタ考察 | 現在の環境における最強構成・戦略 |
| `item-guide` | アイテムガイド | アイテムの効果・おすすめビルド |
| `tips` | Tips | 初心者から上級者まで使えるテクニック |

### フロントマターのオプションフィールド

- `hero`: 関連ヒーロー名（ヒーロー攻略記事の場合）
- `updatedDate`: 記事を更新した日付
- `draft: true`: 本番環境で非表示にする

---

## Claude Code による記事自動生成

### 方法 1: 話題トピック Issue に @claude でコメント

毎日 JST 9:00 に GitHub Actions が自動で「本日の話題トピック」Issue を作成します。
書いてほしいトピックの Issue に以下のようにコメントするだけで記事が生成されます。

```
@claude このパッチノートの解説記事を書いて
```

Claude Code が記事を生成して PR を自動作成します。PR をレビューしてマージすると Netlify に自動デプロイされます。

### 方法 2: 記事作成リクエスト Issue を手動作成

GitHub の Issue テンプレート **「記事作成リクエスト」** を使って Issue を作成します。

1. GitHub の Issues タブ → **New issue** → **記事作成リクエスト** を選択
2. トピック・カテゴリ・参考情報を記入して Issue を作成
3. Issue に `@claude 記事を書いて` とコメント
4. PR が自動作成されるのでレビュー → マージ

### 方法 3: リサーチ → 記事生成（2ステップ）

詳細な参考情報が必要な場合は、リサーチを先に実行します。

1. **リサーチリクエスト Issue を作成**
   - Issue テンプレート **「リサーチリクエスト」** を選択
   - トピック・検索キーワード（英語）・カテゴリを記入
   - Issue 作成と同時にリサーチが自動実行され、YouTube・Reddit・Wiki の情報がコメントに追加されます

2. **リサーチ結果をもとに記事生成**
   - リサーチ結果が追加されたら同 Issue に以下のようにコメント
   ```
   @claude この参考情報をもとに記事を書いて
   ```

---

## GitHub Actions ワークフロー

| ワークフロー | トリガー | 内容 |
|-------------|---------|------|
| `collect-topics.yml` | 毎日 JST 9:00（手動実行も可） | YouTube・Reddit・Wiki から話題トピックを収集し Issue を作成 |
| `claude.yml` | Issue コメントに `@claude` が含まれる場合 | Claude Code が記事を生成して PR を作成 |
| `research-topic.yml` | `research-request` ラベルが付いた Issue が作成された場合 | トピックをリサーチし結果を Issue にコメント |

---

## GitHub Secrets の設定

リポジトリの **Settings → Secrets and variables → Actions** で以下を設定してください。

| Secret 名 | 説明 |
|-----------|------|
| `CLAUDE_CODE_OAUTH_TOKEN` | Claude Code の OAuth トークン（Max プラン） |
| `GITHUB_TOKEN` | 自動付与されるため設定不要 |

### `CLAUDE_CODE_OAUTH_TOKEN` の取得方法

1. [claude.ai](https://claude.ai) にログイン（Max プランが必要）
2. Claude Code CLI を使って OAuth 認証を完了する
3. `~/.claude/` 配下に保存された OAuth トークンを Secret に登録

---

## データ収集スクリプト（ローカル実行）

```bash
# 依存パッケージをインストール
pip install -r scripts/requirements.txt

# トピック収集のみ実行（Issue は作成しない確認用）
python scripts/collect.py

# 特定トピックのリサーチを実行
cd scripts
python research.py --topic "Viscous攻略" --keywords "Viscous guide,build" --issue-number 0
```

---

## ディレクトリ構成

```
Deadlock攻略ブログ/
├── CLAUDE.md                    # Claude Code への記事作成ガイドライン
├── .github/
│   ├── workflows/
│   │   ├── collect-topics.yml   # 定期データ収集 → Issue 作成
│   │   ├── claude.yml           # @claude メンションで記事生成
│   │   └── research-topic.yml  # トピックリサーチ
│   └── ISSUE_TEMPLATE/
│       ├── article-request.md  # 記事作成リクエスト用テンプレート
│       └── research-request.md # リサーチリクエスト用テンプレート
├── scripts/
│   ├── collect.py               # データ収集メインスクリプト
│   ├── research.py              # トピックリサーチスクリプト
│   ├── sources/
│   │   ├── youtube.py           # YouTube RSS 取得
│   │   ├── reddit.py            # Reddit JSON API 取得
│   │   └── wiki.py              # MediaWiki API 取得
│   └── requirements.txt
└── src/
    ├── content.config.ts        # Content Collections スキーマ
    ├── data/blog/               # 記事ファイル（.md）
    ├── components/              # Astro / React コンポーネント
    ├── layouts/                 # ベース・記事レイアウト
    ├── pages/                   # ルーティング
    ├── lib/                     # ユーティリティ関数・定数
    └── styles/global.css        # Tailwind CSS エントリポイント
```

---

## 日常の運用フロー

```
毎日 JST 9:00（自動）
  → 「本日の話題トピック」Issue が作成される

ユーザー（随時）
  → Issue を確認
  → 書いてほしいトピックに @claude でコメント
    例: 「@claude このパッチノートの解説記事を書いて」

Claude Code（自動）
  → 記事を生成して PR を作成

ユーザー（随時）
  → PR をレビュー、必要なら修正依頼
  → マージ → Netlify が自動デプロイ
```

---

## 参考情報源

- [Deadlock Wiki](https://deadlock.wiki/)
- [Reddit r/DeadlockTheGame](https://www.reddit.com/r/DeadlockTheGame/)
- YouTube: [Eidorian](https://www.youtube.com/@Eidorian510) / [Deathy](https://www.youtube.com/@Deathy) / [MastYT](https://www.youtube.com/@MastYT) / [Midknighttxt](https://www.youtube.com/@Midknighttxt) / [poshypop](https://www.youtube.com/@poshypop)

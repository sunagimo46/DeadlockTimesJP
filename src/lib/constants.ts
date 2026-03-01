/** カテゴリのスラッグ -> 日本語ラベルのマッピング */
export const CATEGORY_LABELS: Readonly<Record<string, string>> = {
  "hero-guide": "ヒーロー攻略",
  "patch-notes": "パッチノート",
  meta: "メタ考察",
  "item-guide": "アイテムガイド",
  tips: "Tips",
} as const

/** カテゴリのスラッグ -> カラークラスのマッピング */
export const CATEGORY_COLORS: Readonly<Record<string, string>> = {
  "hero-guide": "text-hero-guide",
  "patch-notes": "text-patch-notes",
  meta: "text-meta",
  "item-guide": "text-item-guide",
  tips: "text-tips",
} as const

/** カテゴリのスラッグ -> 説明文のマッピング */
export const CATEGORY_DESCRIPTIONS: Readonly<Record<string, string>> = {
  "hero-guide":
    "各ヒーローの立ち回り、ビルド、スキル解説などの攻略情報",
  "patch-notes":
    "最新パッチノートの解説と環境変化への影響分析",
  meta: "現在の環境における最強構成や戦略の考察",
  "item-guide":
    "アイテムの効果、購入タイミング、おすすめビルドの解説",
  tips: "初心者から上級者まで使えるテクニックやコツの紹介",
} as const

/** 全カテゴリスラッグの一覧 */
export const ALL_CATEGORIES = [
  "hero-guide",
  "patch-notes",
  "meta",
  "item-guide",
  "tips",
] as const

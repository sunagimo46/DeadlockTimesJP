import { getCollection } from "astro:content"
import type { CollectionEntry } from "astro:content"

/** 公開済み記事のみ取得（開発環境ではdraft記事も含む） */
export async function getPublishedPosts(): Promise<CollectionEntry<"blog">[]> {
  return getCollection("blog", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })
}

/** 記事を公開日の降順でソート（元配列を変更しない） */
export function sortPostsByDate(
  posts: CollectionEntry<"blog">[],
): CollectionEntry<"blog">[] {
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
}

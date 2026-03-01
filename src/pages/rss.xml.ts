import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import type { APIRoute } from "astro"

export const GET: APIRoute = async (context) => {
  const posts = await getCollection("blog", ({ data }) => {
    return data.draft !== true
  })

  const sortedPosts = [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )

  return rss({
    title: "Deadlock攻略ブログ",
    description:
      "Valveの新作ヒーローシューター「Deadlock」の攻略情報、最新メタ、ヒーローガイド、パッチノート解説",
    site: context.site?.toString() ?? "https://deadlock-guide.netlify.app",
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: "<language>ja</language>",
  })
}

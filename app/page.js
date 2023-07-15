'use client'
import HomePage from "./home-page"
import {getAllFilesFrontMatter} from "@/lib/mdx";

async function getPosts() {
  const posts = await getAllFilesFrontMatter('blog')
  return posts
}

export default async function Page() {
  const recentPosts = await getPosts()
  return <HomePage posts={recentPosts} />
}

import React from 'react'
import { fetchPostsBySearchContent } from '@/prisma/queries/posts'
import PostList from '@/components/posts/post-list'
interface SearchPageProps {
  searchParams: Promise<{searchContent: string}>
}

export default async function SearchPage({searchParams}: SearchPageProps) {
  const {searchContent} = (await searchParams)
  const posts = await fetchPostsBySearchContent(searchContent)
  
    
  return <PostList posts={posts} />
}

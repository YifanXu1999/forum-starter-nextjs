import PostCreateForm from '@/components/posts/post-create-form';
import React from 'react'
import PostList from '@/components/posts/post-list';
import { fetchPostsByTopicName } from '@/prisma/queries/posts';
interface TopicShowPageProps {
  params: Promise<{ name: string }>
}

export default async function TopicShowPage({params}: TopicShowPageProps) {
  const name = (await params).name
  const posts = await fetchPostsByTopicName(name)
  return (
    <div className="flex justify-between">
      <div className="w-3/5">
        <PostList posts={posts} />
      </div>
      <div>
        <PostCreateForm name={name}/>
      </div>
  
    </div>


  );
}
'use client'

import {Avatar, Listbox, ListboxItem} from "@heroui/react";
import { PostWithData } from "@/prisma/queries/posts";
import { useRouter } from "next/navigation";
interface PostListProps {
  posts: PostWithData[]
}

export default  function PostList({posts}: PostListProps) {
  const router = useRouter()

  return (
    <Listbox
      aria-label="Post List"
      itemClasses={{
        base: "border-small border-default-200 mt-4"
      }}
    >
      {posts.map((post) => (
        <ListboxItem
          key={post.id}
          startContent={<Avatar src={post.user?.image || ''} className="w-12 h-12" />}
          description={<p className="text-small text-gray-400 mt-3">{post.content}</p>}
          endContent={<span className="text-small text-gray-400 whitespace-nowrap self-end">{post._count.comments} comments</span>}
          onPress={() => {
            router.push(`/topics/${post.topic.name}/posts/${post.id}`)
          }}
        >
          {post.title}
        </ListboxItem>
      ))}
  
    </Listbox>
  );
}

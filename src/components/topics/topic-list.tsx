
import {Badge} from "@heroui/badge";
import {Chip} from "@heroui/chip";
import {Link} from "@heroui/link";
import React from 'react'
import { fetchTopics } from "@/prisma";

export const ListBoxWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="max-w-[260px] p-3 rounded-small border-2 mt-4 flex gap-3 flex-wrap">
      {children}
    </div>
  )
}

export default async function TopicList() {
  const topics = await fetchTopics()
  return (
    <ListBoxWrapper>
      {topics.map((topic) => (
        <Badge key={topic.id} color="secondary" shape="circle" size="sm" content={topic._count.posts} placement="top-right">
          <Chip variant="shadow" color="default">
            <Link href={`/topics/${topic.name}`} className="text-sm text-black">{topic.name}</Link>
          </Chip>
        </Badge>
      ))}
    </ListBoxWrapper>

  )
}

import { Avatar } from '@heroui/avatar'
import React from 'react'
import { CommentData, fetchCommentsByPostId } from '@/prisma/queries/comments'
import CommentCreateForm from './comment-create-form'
interface CommentShowProps {
  comment: CommentData
  children?: React.ReactNode
}

export default async function CommentShow({ comment }: CommentShowProps) {
  const comments = await fetchCommentsByPostId(comment.postId)

  const children = comments.filter(c => c.parentId === comment.id)

  return (
    <div className="border mt-2 p-4 rounded-md">
      <div className="flex gap-2">
        <Avatar src="/image.png" alt="avatar" size="md" />
        <div className="flex-1 gap-3">
          <p className="text-sm font-medium text-gray-500">{comment.user.name}</p>
          <p className="flex justify-between items-center">
            <span className="flex-1 text-gray-900">{comment.content}</span>
            <span className="text-gray-500">{comment.createdAt.toLocaleString()}</span>
          </p>
          <CommentCreateForm postId={comment.postId} isOpen={false} parentId={comment.id} />
          {
          children.map((c: CommentData) => (
            <CommentShow key={c.id} comment={c} />
          ))
        }
        </div>


      </div>

    </div>
  )
}

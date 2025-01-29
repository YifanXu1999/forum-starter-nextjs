import { prisma } from "..";
import { Comment } from "@prisma/client";
import { cache } from "react";
export type CommentData = {
  user: {
    name: string | null
    image: string | null
  };
} & Comment

export const fetchCommentsByPostId = cache(async (postId: string): Promise<CommentData[]> => {
  console.log("fetching comments for post", postId)
  return prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })
})
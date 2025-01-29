'use server'

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface CreateCommentFormState {
  errors: {
    content?: string[]
    _form?: string[];
  };
  success?: boolean;
}
const schema = z.object({
  content: z.string().min(3),
})


export async function createComment({postId, parentId}: {postId: string, parentId?  : string}, prevState: CreateCommentFormState, formData: FormData): Promise<CreateCommentFormState> {
  const session = await auth()
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be logged in to create a comment"]
      }
    }
  }
  const content = formData.get('content')

  const result = schema.safeParse({content})

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }


  const post = await prisma.post.findFirst({
    where: {
      id: {
        equals: postId as string
      }
    }
  })
  if (!post) {
    return {
      errors: {
        _form: ["Post not found"]
      }
    }
  }
  try {

    await prisma.comment.create({
      data: {
        content: result.data.content,
        userId: session.user.id || "",
        postId: postId as string,
        parentId: parentId || undefined
      }
    })
    
  } catch (error) {
    console.error(error);
    return {
      errors: {
        _form: ["Failed to create comment"]
      }
    }
  }
  revalidatePath(`/topics/${post.topicId}/posts/${postId}`)
  return {
    errors: {},
    success: true
  }

}
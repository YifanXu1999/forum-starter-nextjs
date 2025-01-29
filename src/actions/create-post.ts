'use server'

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { Post } from "@prisma/client";
import { z } from "zod";
import { redirect } from "next/navigation";

interface CreatePostFormState {
  errors: {
    title?: string[]
    content?: string[]
    _form?: string[];
  }
}
const schema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
})


export async function createPost(prevState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
    const session = await auth()
    if (!session || !session.user) {
      return {
        errors: {
          _form: ["You must be logged in to create a post"]
        }
      }
    }
    const title = formData.get('title')
    const content = formData.get('content')
    const name = formData.get('name')
    const result = schema.safeParse({title, content})
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors
      }
    }

    let post: Post

    const topic = await prisma.topic.findFirst({
      where: {
        name: {
          equals: name as string
        }
      }
    })
    if (!topic) {
      return {
        errors: {
          _form: ["Topic not found"]
        }
      }
    }

    try {
      post = await prisma.post.create({
        data: {
          title: result.data.title,
          content: result.data.content,
          userId: session.user.id || "",
          topicId: topic?.id || ""
        }
      })
    } catch (error) {
      console.error(error);
      return {
        errors: {
          _form: ["Failed to create topic"]
        }
      }
    }

    redirect(`/topics/${name}/posts/${post.id}`)
}
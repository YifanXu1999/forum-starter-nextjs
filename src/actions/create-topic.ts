'use server'

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { Topic } from "@prisma/client";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
interface CreateTopicFormState {
  errors: {
    name?: string[]
    description?: string[]
    _form?: string[];
  }
}
const schema = z.object({
    name: z.string().min(3),
    description: z.string().min(10),
})


export async function createTopic(prevState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
    const session = await auth()
    if (!session || !session.user) {
      return {
        errors: {
          _form: ["You must be logged in to create a topic"]
        }
      }
    }
    const name = formData.get('name')
    const description = formData.get('description')
    const result = schema.safeParse({name, description})

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors
      }
    }

    let topic: Topic
    try {
      topic = await prisma.topic.create({
        data: {
          name: result.data.name,
          description: result.data.description,
          userId: session.user.id || ""
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
    revalidatePath(`/topics/${topic.name}`)
    redirect(`/topics/${topic.name}`)
}
import { prisma } from "../index";

export const  fetchTopics = async () => {
  const topics = await prisma.topic.findMany({
    include: {
      _count: {
        select: {
          posts: true
        }
      }
    }
  })
  return topics
}
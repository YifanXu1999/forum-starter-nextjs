import { PrismaClient } from "@prisma/client"
import { fetchTopics } from "./queries/topics";
import { fetchPostsByTopicName } from "./queries/posts";
import { fetchCommentsByPostId } from "./queries/comments";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prisma = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma


export {fetchTopics, fetchPostsByTopicName, fetchCommentsByPostId}
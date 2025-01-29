import { prisma } from "../index";
import { Post } from "@prisma/client";

export type PostWithData = {

  user: {
    name: string | null,
    image?: string | null
  };
  topic: {
    name: string | null
  };
  _count: {
      comments: number
  }
} & Post

export const fetchPostsByTopicName = async (name: string): Promise<PostWithData[]> => {
  return prisma.post.findMany({
    where: {
      topic: {
        name: name
      }
    },
    include: {
      user: {
        select: {
          name: true
        }
      },
      topic: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          comments: true // This returns a count of related comments as a number. 
                        // Prisma automatically aggregates the count of related records
                        // into a number when using _count
        }
      }
    }
  })
}

export const fetchTopPosts = async (): Promise<PostWithData[]> => {
  return prisma.post.findMany({
    orderBy: [
      {
        comments: {
          _count: 'desc'
        }
      }
    ],
    include: {
      user: {
        select: {
          name: true,
          image: true
        } 
      },
      topic: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          comments: true
        }
      }
    },
    take: 5
  })
}


export const fetchPostsBySearchContent = async (searchContent: string) => {
  return prisma.post.findMany({
    where: {
      OR: [
        {
          topic: {
            name: {
              contains: searchContent
            }
          }
        },
        {
          content: {
            contains: searchContent
          }
        }
      ]
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      },
      topic: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          comments: true
        }
      }
    }
  })
}
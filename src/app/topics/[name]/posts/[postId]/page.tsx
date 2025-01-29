import PostShow from "@/components/posts/post-show"
import PostShowLoading from "@/components/posts/post-show-loading"
import CommentCreateForm from "@/components/comments/comment-create-form"
import { Suspense } from "react"
import CommentList from "@/components/comments/comment-list"

interface PostPageProps {
  params: Promise<{
    name: string
    postId: string
  }>
}

export default async function PostPage({ params }: PostPageProps) {
  const {name, postId} = (await params)
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold my-2">{name}</h1>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} />
      <CommentList postId={postId} />
    </div>

  )
}

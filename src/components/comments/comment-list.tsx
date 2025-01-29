
  
import CommentShow from './comment-show';
import { fetchCommentsByPostId } from "@/prisma";
interface CommentListProps {
  postId: string
}

export default async function CommentList({postId}: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId)
  const topLevelComments = comments.filter(comment => !comment.parentId)
  return (
    <div>
      <h1 className="text-xl font-bold">All 20 comments</h1>
        {topLevelComments
          .map(comment => (
              <CommentShow key={comment.id} comment={comment}>
              </CommentShow>
          ))}

    </div>
  )
}

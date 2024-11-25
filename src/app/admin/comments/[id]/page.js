import CommentDetails from '@/components/admin/comments/CommentDetails'
import { getCommentById } from '@/actions/admin/comments'
import { auth } from '@/security/auth'

export default async function CommentDetailsPage({ params }) {
  const comment = await getCommentById(params.id) // دریافت اطلاعات کامنت
  const session = await auth()

  return (
    <div>
      <CommentDetails comment={comment} user={session?.user}/>
    </div>
  )
}

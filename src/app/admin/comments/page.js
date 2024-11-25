import CommentsTable from '@/components/admin/comments/CommentsTable'
import { getComments } from '@/actions/admin/comments'

export default async function CommentsPage() {
  const comments = await getComments() // دریافت لیست کامنت‌ها

  return (
    <div>
      <h1>مدیریت کامنت‌ها</h1>
      <CommentsTable comments={comments} />
    </div>
  )
}

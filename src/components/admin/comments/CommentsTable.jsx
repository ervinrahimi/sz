'use client'

import Link from 'next/link'

export default function CommentsTable({ comments }) {
  return (
    <table>
      <thead>
        <tr>
          <th>نام کاربری</th>
          <th>نظر</th>
          <th>تاریخ</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((comment) => (
          <tr key={comment.id}>
            <td>{comment.user.name || 'ناشناس'}</td>
            <td>
              {comment.content.length > 20 ? `${comment.content.slice(0, 20)}...` : comment.content}
            </td>
            <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
            <td>
              <Link href={`/admin/comments/${comment.id}`}>جزئیات</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

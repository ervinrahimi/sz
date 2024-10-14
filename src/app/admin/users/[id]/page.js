// src/app/admin/users/[id]/page.jsx

import prisma from '@/db/client'
import UserDetails from '@/components/admin/users/UserDetails'

export default async function UserDetailsPage({ params }) {
  const userId = params.id
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      orders: true,
      // سایر روابط
    },
  })

  if (!user) {
    return <div>کاربر یافت نشد</div>
  }

  return (
    <div>
      <h1>جزئیات کاربر</h1>
      <UserDetails user={user} />
    </div>
  )
}

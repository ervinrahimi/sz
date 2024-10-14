// src/app/admin/users/page.jsx


import UsersTable from '@/components/admin/users/UsersTable'
import prisma from '@/db/client'

export default async function UsersPage() {
  // دریافت لیست کاربران از دیتابیس
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      family: true,
      email: true,
      phone: true,
      role: true,
      nationalCode: true,
      createdAt: true,
    },
  })

  return (
    <div>
      <h1>مدیریت کاربران</h1>
      <UsersTable users={users} />
    </div>
  )
}

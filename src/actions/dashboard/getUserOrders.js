'use server'

import { auth } from '@/security/auth'
import prisma from '@/db/client'

export async function getUserOrders() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return { success: false, message: 'کاربر وارد نشده است.' }
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        car: true,
        salesCondition: true,
      },
    })

    return { success: true, orders }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'خطا در دریافت سفارشات.' }
  }
}

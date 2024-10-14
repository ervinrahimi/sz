// src/app/admin/sales-conditions/actions.js

'use server'

import prisma from '@/db/client'

export async function updateSalesCondition(data) {
  const { id, name, conditionType, isLocked } = data
  // به‌روزرسانی شرایط فروش در دیتابیس
  await prisma.salesCondition.update({
    where: { id },
    data: {
      name,
      conditionType,
      isLocked,
    },
  })
}

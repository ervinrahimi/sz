// src/app/admin/payments/actions.js

'use server'

import prisma from '@/db/client'

export async function updatePaymentStatus(paymentId, status) {
  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      status,
    },
  })
}

// src/app/admin/sales-conditions/actions.js

'use server'

import prisma from '@/db/client'

export async function updateSalesCondition(data) {
  const {
    id,
    name,
    conditionType,
    salesMethod,
    paymentType,
    price,
    registrationPayment,
    oneMonthPayment,
    totalInstallments,
    monthlyInstallment,
    remainingAtDelivery,
    finalPrice,
    deliveryDate,
    participationProfit,
    isLocked,
  } = data

  // به‌روزرسانی شرایط فروش در دیتابیس
  await prisma.salesCondition.update({
    where: { id },
    data: {
      name,
      conditionType,
      salesMethod,
      paymentType,
      price,
      registrationPayment,
      oneMonthPayment,
      totalInstallments,
      monthlyInstallment,
      remainingAtDelivery,
      finalPrice,
      deliveryDate: deliveryDate ? new Date(deliveryDate) : null, // تبدیل به Date برای ذخیره در دیتابیس
      participationProfit,
      isLocked,
    },
  })
}

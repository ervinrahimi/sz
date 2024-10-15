// src/app/admin/sales-conditions/actions.js

'use server'

import prisma from '@/db/client'

// اکشن برای ایجاد شرایط فروش
export async function createSalesCondition(data) {
  const {
    carId,
    name,
    conditionType,
    salesMethod,
    paymentType,
    price,
    finalPrice,
    registrationPayment,
    oneMonthPayment,
    totalInstallments,
    monthlyInstallment,
    remainingAtDelivery,
    deliveryDate,
    participationProfit,
    isLocked,
  } = data

  return await prisma.salesCondition.create({
    data: {
      carId,
      name,
      conditionType,
      salesMethod,
      paymentType,
      price: parseFloat(price),
      finalPrice: parseFloat(finalPrice), // ذخیره قیمت نهایی
      registrationPayment: registrationPayment ? parseFloat(registrationPayment) : null,
      oneMonthPayment: oneMonthPayment ? parseFloat(oneMonthPayment) : null,
      totalInstallments: totalInstallments ? parseInt(totalInstallments) : null,
      monthlyInstallment: monthlyInstallment ? parseFloat(monthlyInstallment) : null,
      remainingAtDelivery: remainingAtDelivery ? parseFloat(remainingAtDelivery) : null,
      deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
      participationProfit: participationProfit ? parseFloat(participationProfit) : null,
      isLocked,
    },
  })
}

// اکشن برای ویرایش شرایط فروش
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

  return await prisma.salesCondition.update({
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
      deliveryDate,
      participationProfit,
      isLocked,
    },
  })
}

// اکشن برای افزودن کاربران مجاز به یک شرایط فروش
export async function addAuthorizedUser(salesConditionId, user) {
  const { nationalCode, name, family } = user

  return await prisma.authorizedUser.create({
    data: {
      salesConditionId,
      nationalCode,
      name,
      family,
    },
  })
}

// سرور اکشن برای حذف کاربر از لیست دارای مجوز
export async function removeAuthorizedUser(userId) {
  return await prisma.authorizedUser.delete({
    where: { id: userId },
  })
}

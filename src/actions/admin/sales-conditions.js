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
    contractPriceType, // نوع قیمت در قرارداد
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
      contractPriceType, // اضافه کردن به دیتابیس
      paymentType,
      price: parseFloat(price),
      finalPrice: parseFloat(finalPrice),
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

export async function updateSalesCondition(data) {
  const {
    id,
    carId,
    name,
    conditionType,
    salesMethod,
    contractPriceType, // نوع قیمت در قرارداد
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

  const updatedCondition = await prisma.salesCondition.update({
    where: { id },
    data: {
      carId,
      name,
      conditionType,
      salesMethod,
      contractPriceType,
      paymentType,
      price,
      registrationPayment,
      oneMonthPayment,
      totalInstallments,
      monthlyInstallment,
      remainingAtDelivery,
      finalPrice,
      deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
      participationProfit,
      isLocked,
    },
  })
  return { success: true, data: updatedCondition }
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

// اکشن جدید برای به‌روزرسانی مقدار isLocked
export async function updateIsLocked(id, isLocked) {
  try {
    const updatedCondition = await prisma.salesCondition.update({
      where: { id },
      data: { isLocked },
    })
    return { success: true, data: updatedCondition }
  } catch (error) {
    return { success: false, message: 'خطا در به‌روزرسانی وضعیت قفل کردن.' }
  }
}

// سرور اکشن برای حذف کاربر از لیست دارای مجوز
export async function removeAuthorizedUser(userId) {
  return await prisma.authorizedUser.delete({
    where: { id: userId },
  })
}

// src/app/admin/sales-conditions/actions.js

'use server'

import prisma from '@/db/client'

// اکشن برای ایجاد شرایط فروش
export async function createSalesCondition(data) {
  const {
    carId,
    name,
    salesFestivalId,
    conditionType,
    salesMethod,
    contractPriceType,
    paymentType,
    price,
    finalPrice,
    registrationPayment,
    oneMonthPayment,
    totalInstallments,
    monthlyInstallment,
    remainingAtDelivery,
    deliveryDate,
    siteSalesCode,
    participationProfit,
    isLocked,
    images, // اضافه کردن تصاویر
  } = data

  return await prisma.salesCondition.create({
    data: {
      carId,
      name,
      conditionType,
      salesFestivalId,
      salesMethod,
      contractPriceType,
      paymentType,
      price: parseFloat(price),
      siteSalesCode,
      finalPrice: parseFloat(finalPrice),
      registrationPayment: registrationPayment ? parseFloat(registrationPayment) : null,
      oneMonthPayment: oneMonthPayment ? parseFloat(oneMonthPayment) : null,
      totalInstallments: totalInstallments ? parseInt(totalInstallments) : null,
      monthlyInstallment: monthlyInstallment ? parseFloat(monthlyInstallment) : null,
      remainingAtDelivery: remainingAtDelivery ? parseFloat(remainingAtDelivery) : null,
      deliveryDate,
      participationProfit: participationProfit ? parseFloat(participationProfit) : null,
      isLocked,
      images: images, // ذخیره تصاویر
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
    contractPriceType,
    salesFestivalId,
    paymentType,
    price,
    registrationPayment,
    oneMonthPayment,
    totalInstallments,
    monthlyInstallment,
    remainingAtDelivery,
    finalPrice,
    status,
    siteSalesCode,
    deliveryDate,
    participationProfit,
    isLocked,
    images, // اضافه کردن تصاویر
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
      siteSalesCode,
      salesFestivalId,
      price,
      registrationPayment,
      oneMonthPayment,
      totalInstallments: parseInt(totalInstallments),
      monthlyInstallment,
      remainingAtDelivery,
      status,
      finalPrice,
      deliveryDate,
      participationProfit,
      isLocked,
      images: images, // ذخیره تصاویر
    },
  })
  return { success: true, data: updatedCondition }
}

// اکشن برای افزودن کاربران مجاز به یک شرایط فروش
export async function addAuthorizedUser(salesConditionId, user) {
  const { nationalCode, phone, name, family } = user

  return await prisma.authorizedUser.create({
    data: {
      salesConditionId,
      nationalCode,
      phone,
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

export async function removeImage(salesConditionId, imageUrl) {
  const salesCondition = await prisma.salesCondition.findUnique({ where: { id: salesConditionId } })
  const updatedImages = salesCondition.images.filter((image) => image !== imageUrl)

  return await prisma.salesCondition.update({
    where: { id: salesConditionId },
    data: { images: updatedImages },
  })
}

export async function reorderImages(salesConditionId, newImagesOrder) {
  return await prisma.salesCondition.update({
    where: { id: salesConditionId },
    data: { images: newImagesOrder },
  })
}

export async function removeImageFromSalesCondition(imageUrl, salesConditionId) {
  try {
    // حذف تصویر از فایل سیستم
    const filePath = path.join(process.cwd(), 'public' , 'uploads' , 'saleconditions' , imageUrl)
    await fs.unlink(filePath)

    // حذف لینک تصویر از دیتابیس
    const updatedCondition = await prisma.salesCondition.update({
      where: { id: salesConditionId },
      data: {
        images: {
          set: [], // حذف لینک از آرایه تصاویر
        },
      },
    })

    return { success: true, data: updatedCondition }
  } catch (error) {
    console.error('Error removing image:', error)
    return { success: false, message: 'خطا در حذف تصویر' }
  }
}

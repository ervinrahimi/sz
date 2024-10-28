'use server'

import { auth } from '@/security/auth'
import prisma from '@/db/client'
import fs from 'fs'
import path from 'path'

export async function updatePersonalInfo(data) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return { success: false, message: 'کاربر وارد نشده است.' }
  }

  console.log(data)

  try {
    let imagePath = user.image

    // ذخیره تصویر در صورت آپلود شدن
    if (data.image) {
      const fileName = `${user.id}_${Date.now()}_${data.image.name}`
      imagePath = path.join('/uploads', fileName)
      fs.writeFileSync(imagePath, data.image.buffer)
    }

    // بررسی و استفاده از شیء خالی به عنوان مقدار پیش‌فرض برای addresses
    const addresses = data.addresses || {}
    const homeAddressData = addresses.HOME || {}
    const workAddressData = addresses.WORK || {}

    // به‌روزرسانی داده‌ها در دیتابیس
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        family: data.family,
        username: data.username,
        email: data.email,
        phone: data.phone,
        phone2: data.phone2,
        landlinePhone: data.landlinePhone,
        nationalCode: data.nationalCode,
        fatherName: data.fatherName,
        idNumber: data.idNumber,
        gender: data.gender,
        occupation: data.occupation,
        educationLevel: data.educationLevel,
        image: imagePath,
        addresses: {
          updateMany: [
            { where: { type: 'HOME' }, data: homeAddressData },
            { where: { type: 'WORK' }, data: workAddressData },
          ],
        },
      },
    })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'خطا در به‌روزرسانی اطلاعات.' }
  }
}

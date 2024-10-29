'use server'

import { auth } from '@/security/auth'
import prisma from '@/db/client'
import fs from 'fs'
import path from 'path'

// تابعی برای حذف فیلدهای null از آبجکت
function removeNullFields(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null))
}

export async function updatePersonalInfo(data) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return { success: false, message: 'کاربر وارد نشده است.' }
  }

  try {
    let imagePath = user.image

    // ذخیره تصویر در صورت آپلود شدن
    if (data.image && data.image instanceof File) {
      const imageFile = data.image
      const fileName = `${user.id}_${Date.now()}_${imageFile.name}`
      imagePath = path.join('/uploads', fileName)
      fs.writeFileSync(imagePath, Buffer.from(await imageFile.arrayBuffer()))
    }

    // تنظیم داده‌های آدرس HOME و WORK و حذف فیلدهای null
    const homeAddressData = data.addresses?.HOME
      ? removeNullFields({
          type: 'HOME',
          province: data.addresses.HOME.province || null,
          city: data.addresses.HOME.city || null,
          district: data.addresses.HOME.district || null,
          addressLine: data.addresses.HOME.addressLine || null,
          buildingNo: data.addresses.HOME.buildingNo || null,
          floor: data.addresses.HOME.floor || null,
          unit: data.addresses.HOME.unit || null,
          postalCode: data.addresses.HOME.postalCode || null,
          user: { connect: { id: user.id } },
        })
      : null

    const workAddressData = data.addresses?.WORK
      ? removeNullFields({
          type: 'WORK',
          province: data.addresses.WORK.province || null,
          city: data.addresses.WORK.city || null,
          district: data.addresses.WORK.district || null,
          addressLine: data.addresses.WORK.addressLine || null,
          buildingNo: data.addresses.WORK.buildingNo || null,
          floor: data.addresses.WORK.floor || null,
          unit: data.addresses.WORK.unit || null,
          postalCode: data.addresses.WORK.postalCode || null,
          user: { connect: { id: user.id } },
        })
      : null

    // به‌روزرسانی داده‌های کاربر در دیتابیس
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
      },
    })

    // به‌روزرسانی یا ایجاد آدرس HOME
    if (homeAddressData) {
      const existingHomeAddress = await prisma.address.findFirst({
        where: { userId: user.id, type: 'HOME' },
      })

      if (existingHomeAddress) {
        await prisma.address.update({
          where: { id: existingHomeAddress.id },
          data: homeAddressData,
        })
      } else {
        await prisma.address.create({
          data: homeAddressData,
        })
      }
    }

    // به‌روزرسانی یا ایجاد آدرس WORK
    if (workAddressData) {
      const existingWorkAddress = await prisma.address.findFirst({
        where: { userId: user.id, type: 'WORK' },
      })

      if (existingWorkAddress) {
        await prisma.address.update({
          where: { id: existingWorkAddress.id },
          data: workAddressData,
        })
      } else {
        await prisma.address.create({
          data: workAddressData,
        })
      }
    }

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'خطا در به‌روزرسانی اطلاعات.' }
  }
}

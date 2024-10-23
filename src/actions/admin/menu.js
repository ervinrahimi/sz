'use server'

import prisma from '@/db/client'

// افزودن آیتم جدید به منو
export async function addMenuItem(data) {
  const { title, link, parentMenuID, order } = data
  const menuItem = await prisma.menuItem.create({
    data: {
      title,
      link,
      parentMenuID,
      order,
    },
  })

  // اگر آیتم جدید زیرمنو است، آن را به فهرست زیرمنوهای منوی والد اضافه کنیم
  if (parentMenuID) {
    await prisma.menuItem.update({
      where: { id: parentMenuID },
      data: {
        subMenuIDs: {
          push: menuItem.id,
        },
      },
    })
  }

  return menuItem
}

// ویرایش آیتم منو
export async function updateMenuItem(id, data) {
  const { title, link, order, isActive } = data
  await prisma.menuItem.update({
    where: { id },
    data: {
      title,
      link,
      order,
      isActive,
    },
  })
}

// حذف آیتم منو
export async function deleteMenuItem(id) {
  const menuItem = await prisma.menuItem.findUnique({
    where: { id },
  })

  if (!menuItem) {
    throw new Error('Menu item not found')
  }

  const { parentMenuID, order } = menuItem

  // حذف آیتم از فهرست زیرمنوهای والد، اگر زیرمنو است
  if (parentMenuID) {
    await prisma.menuItem.update({
      where: { id: parentMenuID },
      data: {
        subMenuIDs: {
          set: menuItem.subMenuIDs.filter(subId => subId !== id),
        },
      },
    })
  }

  // حذف آیتم از منو
  await prisma.menuItem.delete({
    where: { id },
  })

  // به‌روزرسانی order برای آیتم‌هایی که order آن‌ها بیشتر از آیتم حذف‌شده است
  await prisma.menuItem.updateMany({
    where: {
      parentMenuID,
      order: {
        gt: order,
      },
    },
    data: {
      order: {
        decrement: 1, // کاهش order به اندازه 1
      },
    },
  })
}

// دریافت لیست منوها
export async function getMenuItems() {
  const menuItems = await prisma.menuItem.findMany({
    where: {
      parentMenuID: null, // فقط آیتم‌های سطح بالا (منوهای اصلی) را بگیر
    },
    orderBy: {
      order: 'asc', // بر اساس ترتیب نمایش
    },
  })

  return Promise.all(
    menuItems.map(async (menu) => {
      const subMenus = await prisma.menuItem.findMany({
        where: { parentMenuID: menu.id },
        orderBy: { order: 'asc' },
      })
      return { ...menu, subMenus }
    })
  )
}

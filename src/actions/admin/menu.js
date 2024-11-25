'use server'

import prisma from '@/db/client'

// افزودن آیتم جدید به منو
export async function addMenuItem(data) {
  const { title, link, parentMenuID } = data;

  // تعیین سطح منو
  const menuLevel = parentMenuID ? 1 : 0;

  // ترتیب‌دهی جداگانه برای هر سطح
  const order = await prisma.menuItem.count({
    where: { parentMenuID },
  });

  const menuItem = await prisma.menuItem.create({
    data: {
      title,
      link,
      parentMenuID,
      menuLevel,
      order,
    },
  });

  if (parentMenuID) {
    await prisma.menuItem.update({
      where: { id: parentMenuID },
      data: {
        subMenuIDs: {
          push: menuItem.id,
        },
      },
    });
  }

  return menuItem;
}

// به‌روزرسانی ترتیب آیتم‌ها
export async function updateMenuItem(id, data) {
  const existingItem = await prisma.menuItem.findUnique({
    where: { id },
  });

  if (!existingItem) {
    throw new Error('Menu item not found');
  }

  const { order, parentMenuID } = existingItem;

  // اگر ترتیب تغییر کرده باشد
  if (data.order !== undefined && data.order !== order) {
    // دریافت لیست آیتم‌های هم‌سطح
    const siblings = await prisma.menuItem.findMany({
      where: { parentMenuID },
      orderBy: { order: 'asc' },
    });

    // تنظیم ترتیب آیتم‌های دیگر
    const updates = siblings.map((sibling) => {
      if (sibling.id === id) return null; // آیتم جاری را نادیده بگیر

      if (data.order < order && sibling.order >= data.order && sibling.order < order) {
        // اگر آیتم به سمت بالا جابه‌جا شده باشد
        return prisma.menuItem.update({
          where: { id: sibling.id },
          data: { order: sibling.order + 1 },
        });
      } else if (data.order > order && sibling.order <= data.order && sibling.order > order) {
        // اگر آیتم به سمت پایین جابه‌جا شده باشد
        return prisma.menuItem.update({
          where: { id: sibling.id },
          data: { order: sibling.order - 1 },
        });
      }
      return null;
    });

    // اجرای همه به‌روزرسانی‌ها
    await Promise.all(updates.filter(Boolean));
  }

  // به‌روزرسانی آیتم جاری
  return prisma.menuItem.update({
    where: { id },
    data: {
      ...data,
      order: data.order !== undefined ? data.order : order,
    },
  });
}

// حذف آیتم منو
export async function deleteMenuItem(id) {
  const menuItem = await prisma.menuItem.findUnique({ where: { id } });
  if (!menuItem) throw new Error('Menu item not found');

  const { parentMenuID, order } = menuItem;

  // حذف آیتم از لیست زیرمنوهای والد
  if (parentMenuID) {
    await prisma.menuItem.update({
      where: { id: parentMenuID },
      data: {
        subMenuIDs: { set: menuItem.subMenuIDs.filter((subId) => subId !== id) },
      },
    });
  }

  // حذف آیتم
  await prisma.menuItem.delete({ where: { id } });

  // دریافت آیتم‌های هم‌سطح برای بازآرایی ترتیب
  const siblingItems = await prisma.menuItem.findMany({
    where: { parentMenuID },
    orderBy: { order: 'asc' },
  });

  // بازآرایی ترتیب به‌صورت مستقیم
  await Promise.all(
    siblingItems.map((sibling, index) =>
      prisma.menuItem.update({
        where: { id: sibling.id },
        data: { order: index },
      })
    )
  );
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

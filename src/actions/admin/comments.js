'use server'

import prisma from '@/db/client'

// دریافت لیست کامنت‌ها
export async function getComments() {
  return prisma.comment.findMany({
    include: {
      user: true,
      adminReply: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

// دریافت کامنت‌ها بر اساس صفحه
export async function getCommentsByPage(pageId) {
  return prisma.comment.findMany({
    where: {
      pageId,
      adminReply: { // شرط اضافه شده
        isNot: null, // فقط نظراتی که پاسخ ادمین دارند
      },
    },
    include: {
      user: true, // دریافت اطلاعات کاربر
      adminReply: true, // دریافت اطلاعات پاسخ ادمین
    },
    orderBy: { createdAt: 'desc' },
  })
}

// دریافت جزئیات یک کامنت
export async function getCommentById(id) {
  return prisma.comment.findUnique({
    where: { id },
    include: {
      user: true,
      adminReply: true,
    },
  })
}

// تغییر وضعیت کامنت
export async function updateCommentStatus(id, isApproved) {
  return prisma.comment.update({
    where: { id },
    data: { isApproved },
  })
}

// افزودن پاسخ ادمین
export async function addAdminReply(commentId, adminId, content) {
  return prisma.adminReply.create({
    data: {
      content,
      adminId,
      commentId,
    },
  })
}

// افزودن کامنت جدید
export async function addComment(data) {
  return prisma.comment.create({
    data,
  })
}

export async function deleteComment(commentId) {
  try {
    // حذف کامنت از دیتابیس
    await prisma.comment.delete({
      where: { id: commentId },
    })
    return { success: true, message: 'نظر با موفقیت حذف شد.' }
  } catch (error) {
    console.error('خطا در حذف نظر:', error)
    throw new Error('حذف نظر با مشکل مواجه شد.')
  }
}

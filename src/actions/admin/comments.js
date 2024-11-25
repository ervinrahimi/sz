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
    where: { pageId, isApproved: true },
    include: {
      adminReply: true,
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

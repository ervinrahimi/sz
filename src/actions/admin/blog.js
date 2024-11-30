// blog.js

"use server";

import prisma from "@/db/client";
import { revalidatePath } from "next/cache";

export async function createArticle(data) {
  const {
    title,
    slug,
    excerpt,
    content,
    coverImage,
    categories,
    tags,
    isFeatured,
    status,
    seoTitle,
    seoDescription,
    seoKeywords,
    metaImage,
  } = data;

  // ایجاد مقاله جدید
  const article = await prisma.blogArticle.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      isFeatured,
      status,
      // فرض می‌کنیم که authorId از طریق session یا context در دسترس است
      authorId: "AUTHER_ID",
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      // روابط دسته‌بندی‌ها
      categories: {
        create: categories.map((categoryId) => ({
          category: { connect: { id: categoryId } },
        })),
      },
      // روابط برچسب‌ها
      tags: {
        create: tags.map((tagId) => ({
          tag: { connect: { id: tagId } },
        })),
      },
      // اطلاعات سئو
      seo: {
        create: {
          title: seoTitle,
          description: seoDescription,
          keywords: seoKeywords,
          metaImage,
        },
      },
    },
  });

  // بازسازی مسیرها در صورت نیاز
  revalidatePath(`/blog/${slug}`);

  return article;
}

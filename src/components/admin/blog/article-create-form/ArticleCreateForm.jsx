// ArticleCreateForm.js

"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";
import { createArticle } from "@/actions/admin/blog";

// ویرایشگر متن را به صورت داینامیک لود می‌کنیم
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// تعریف اسکیمای اعتبارسنجی با استفاده از zod
const ArticleSchema = z.object({
  title: z.string().min(5, "عنوان باید حداقل ۵ کاراکتر باشد"),
  slug: z.string().min(5, "اسلاگ باید حداقل ۵ کاراکتر باشد"),
  excerpt: z.string().optional(),
  content: z.string().min(20, "محتوای مقاله باید حداقل ۲۰ کاراکتر باشد"),
  coverImage: z.string().url("لینک تصویر شاخص نامعتبر است").optional(),
  categories: z.array(z.string()).nonempty("حداقل یک دسته‌بندی انتخاب کنید"),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.array(z.string()).optional(),
  metaImage: z.string().url("لینک تصویر متا نامعتبر است").optional(),
});

export default function ArticleCreateForm() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ArticleSchema),
  });

  // دریافت دسته‌بندی‌ها و تگ‌ها از سرور
  useEffect(() => {
    async function fetchData() {
      const [categoriesData, tagsData] = await Promise.all([
        fetch("/api/categories").then((res) => res.json()),
        fetch("/api/tags").then((res) => res.json()),
      ]);
      setCategories(categoriesData);
      setTags(tagsData);
    }
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    // ارسال داده‌ها به سرور اکشن
    await createArticle(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>عنوان مقاله</label>
        <input type="text" {...register("title")} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label>اسلاگ</label>
        <input type="text" {...register("slug")} />
        {errors.slug && <p>{errors.slug.message}</p>}
      </div>

      <div>
        <label>خلاصه مقاله</label>
        <textarea {...register("excerpt")} />
        {errors.excerpt && <p>{errors.excerpt.message}</p>}
      </div>

      <div>
        <label>محتوای مقاله</label>
        <Controller
          name="content"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.content && <p>{errors.content.message}</p>}
      </div>

      <div>
        <label>تصویر شاخص</label>
        <input type="text" {...register("coverImage")} />
        {errors.coverImage && <p>{errors.coverImage.message}</p>}
      </div>

      <div>
        <label>دسته‌بندی‌ها</label>
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <select multiple {...field}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.categories && <p>{errors.categories.message}</p>}
      </div>

      <div>
        <label>برچسب‌ها</label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <select multiple {...field}>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.tags && <p>{errors.tags.message}</p>}
      </div>

      <div>
        <label>مقاله ویژه</label>
        <input type="checkbox" {...register("isFeatured")} />
      </div>

      <div>
        <label>وضعیت مقاله</label>
        <select {...register("status")}>
          <option value="DRAFT">پیش‌نویس</option>
          <option value="PUBLISHED">منتشر شده</option>
          <option value="ARCHIVED">بایگانی شده</option>
        </select>
        {errors.status && <p>{errors.status.message}</p>}
      </div>

      <h3>اطلاعات سئو</h3>

      <div>
        <label>عنوان سئو</label>
        <input type="text" {...register("seoTitle")} />
        {errors.seoTitle && <p>{errors.seoTitle.message}</p>}
      </div>

      <div>
        <label>توضیحات متا</label>
        <textarea {...register("seoDescription")} />
        {errors.seoDescription && <p>{errors.seoDescription.message}</p>}
      </div>

      <div>
        <label>کلمات کلیدی</label>
        <Controller
          name="seoKeywords"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <input
              type="text"
              onChange={(e) =>
                field.onChange(e.target.value.split(",").map((k) => k.trim()))
              }
            />
          )}
        />
        {errors.seoKeywords && <p>{errors.seoKeywords.message}</p>}
      </div>

      <div>
        <label>تصویر متا</label>
        <input type="text" {...register("metaImage")} />
        {errors.metaImage && <p>{errors.metaImage.message}</p>}
      </div>

      <button type="submit">ایجاد مقاله</button>
    </form>
  );
}

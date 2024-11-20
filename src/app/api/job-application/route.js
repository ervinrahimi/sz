// app/api/job-application/route.js

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import crypto from 'crypto';
import ExcelJS from 'exceljs';

const resend = new Resend(process.env.RESEND_API_KEY);
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:3000/';

export async function POST(request) {
  try {
    const data = await request.json();

    const jobApplicationSchema = z.object({
      fullName: z.string().min(2),
      email: z.string().email(),
      phone: z.string().min(10),
      position: z.string().min(1),
      coverLetter: z.string().min(10),
      linkedIn: z.string().url().optional(),
    });

    const parsedData = jobApplicationSchema.parse(data);

    // ساخت محتوای ایمیل
    const emailContent = `
      <h2>درخواست استخدام جدید</h2>
      <p><strong>نام:</strong> ${parsedData.fullName}</p>
      <p><strong>ایمیل:</strong> ${parsedData.email}</p>
      <p><strong>تلفن:</strong> ${parsedData.phone}</p>
      <p><strong>موقعیت شغلی:</strong> ${parsedData.position}</p>
      <p><strong>لینکدین:</strong> ${parsedData.linkedIn || 'ندارد'}</p>
      <p><strong>معرفی:</strong></p>
      <p>${parsedData.coverLetter.replace(/\n/g, '<br>')}</p>
    `;

    // ساخت فایل اکسل
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Job Application');

    // استایل کلی برای عنوان‌ها
    const headerStyle = {
      font: { bold: true, size: 14, color: { argb: 'FFFFFF' } },
      alignment: { horizontal: 'center' },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '0070C0' } },
    };

    // استایل کلی برای مقادیر
    const valueStyle = {
      font: { size: 12 },
      alignment: { horizontal: 'left' },
    };

    // داده‌ها به‌صورت زیر هم اضافه می‌شوند
    const rows = [
      ['عنوان', 'مقدار'], // هدر
      ['نام کامل', parsedData.fullName],
      ['ایمیل', parsedData.email],
      ['تلفن', parsedData.phone],
      ['موقعیت شغلی', parsedData.position],
      ['لینکدین', parsedData.linkedIn || 'ندارد'],
      ['معرفی', parsedData.coverLetter],
    ];

    rows.forEach((row, index) => {
      worksheet.addRow(row);

      // قالب‌بندی ردیف عنوان
      if (index === 0) {
        worksheet.getRow(index + 1).font = headerStyle.font;
        worksheet.getRow(index + 1).alignment = headerStyle.alignment;
        worksheet.getRow(index + 1).fill = headerStyle.fill;
      } else {
        // قالب‌بندی ردیف داده‌ها
        worksheet.getRow(index + 1).getCell(1).style = headerStyle; // ستون "عنوان"
        worksheet.getRow(index + 1).getCell(2).style = valueStyle; // ستون "مقدار"
      }
    });

    // تنظیم عرض ستون‌ها
    worksheet.columns = [{ width: 20 }, { width: 50 }];

    // تولید نام فایل و پوشه به صورت تصادفی
    const folderName = 'job-application';
    const fileName = crypto.randomBytes(16).toString('hex') + '.xlsx';
    const folderPath = path.join(process.cwd(), 'public', 'uploads', folderName);
    const filePath = path.join(folderPath, fileName);

    // ایجاد پوشه و ذخیره فایل
    mkdirSync(folderPath, { recursive: true });
    await workbook.xlsx.writeFile(filePath);

    // ساخت لینک فایل
    const fileUrl = `${BASE_URL}uploads/${folderName}/${fileName}`;

    // ارسال ایمیل به ادمین
    await resend.emails.send({
      from: 'SZ <noreply@soltanzade.com>',
      to: ['karbasi374@gmail.com'],
      subject: 'درخواست استخدام جدید',
      html: `
        ${emailContent}
        <p><strong>لینک فایل اکسل:</strong> <a href="${fileUrl}" target="_blank">${fileUrl}</a></p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'مشکلی پیش آمده است' }, { status: 500 });
  }
}

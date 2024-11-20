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

    const applicantRequestSchema = z.object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      nationalId: z.string().length(10),
      gender: z.enum(['male', 'female']),
      fatherName: z.string().min(2),
      address: z.string().min(10),
      province: z.string().min(2),
      city: z.string().min(2),
      email: z.string().email(),
    });

    const parsedData = applicantRequestSchema.parse(data);

    const emailContent = `
      <h2>درخواست متقاضی جدید</h2>
      <p><strong>نام:</strong> ${parsedData.firstName}</p>
      <p><strong>نام خانوادگی:</strong> ${parsedData.lastName}</p>
      <p><strong>کد ملی:</strong> ${parsedData.nationalId}</p>
      <p><strong>جنسیت:</strong> ${parsedData.gender === 'male' ? 'مرد' : 'زن'}</p>
      <p><strong>نام پدر:</strong> ${parsedData.fatherName}</p>
      <p><strong>نشانی:</strong> ${parsedData.address}</p>
      <p><strong>استان:</strong> ${parsedData.province}</p>
      <p><strong>شهر:</strong> ${parsedData.city}</p>
      <p><strong>ایمیل:</strong> ${parsedData.email}</p>
    `;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Applicant Request');

    const headerStyle = {
      font: { bold: true, size: 14, color: { argb: 'FFFFFF' } },
      alignment: { horizontal: 'center' },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '0070C0' } },
    };

    const valueStyle = {
      font: { size: 12 },
      alignment: { horizontal: 'left' },
    };

    const rows = [
      ['عنوان', 'مقدار'],
      ['نام', parsedData.firstName],
      ['نام خانوادگی', parsedData.lastName],
      ['کد ملی', parsedData.nationalId],
      ['جنسیت', parsedData.gender === 'male' ? 'مرد' : 'زن'],
      ['نام پدر', parsedData.fatherName],
      ['نشانی', parsedData.address],
      ['استان', parsedData.province],
      ['شهر', parsedData.city],
      ['ایمیل', parsedData.email],
    ];

    rows.forEach((row, index) => {
      worksheet.addRow(row);

      if (index === 0) {
        worksheet.getRow(index + 1).font = headerStyle.font;
        worksheet.getRow(index + 1).alignment = headerStyle.alignment;
        worksheet.getRow(index + 1).fill = headerStyle.fill;
      } else {
        worksheet.getRow(index + 1).getCell(1).style = headerStyle;
        worksheet.getRow(index + 1).getCell(2).style = valueStyle;
      }
    });

    worksheet.columns = [{ width: 20 }, { width: 50 }];

    const folderName = 'applicant-request';
    const fileName = crypto.randomBytes(16).toString('hex') + '.xlsx';
    const folderPath = path.join(process.cwd(), 'public', 'uploads', folderName);
    const filePath = path.join(folderPath, fileName);

    mkdirSync(folderPath, { recursive: true });
    await workbook.xlsx.writeFile(filePath);

    const fileUrl = `${BASE_URL}uploads/${folderName}/${fileName}`;

    await resend.emails.send({
      from: 'SZ <noreply@soltanzade.com>',
      to: ['karbasi374@gmail.com'],
      subject: 'درخواست متقاضی جدید',
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

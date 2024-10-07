// تابع برای آپلود فایل به سرور
import fs from 'fs';
import path from 'path';

export async function uploadFileToServer(file, orderId, fileType) {
  // مسیر ذخیره فایل
  const dir = path.join(process.cwd(), 'uploads', orderId, fileType);
  // ایجاد پوشه در صورت عدم وجود
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, file.name);
  // ذخیره فایل
  fs.writeFileSync(filePath, file);

  // بازگشت مسیر فایل برای ذخیره در دیتابیس
  return filePath;
}

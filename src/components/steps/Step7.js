// کامپوننت مرحله هفتم: صدور و ارسال قرارداد و تاییدیه اطلاعات
import React, { useState } from 'react';
import { uploadContractFiles } from '@/actions/uploadContractFiles';

export default function Step7({ order }) {
  const [files, setFiles] = useState([]);

  // تابع برای اضافه کردن فایل‌ها
  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  // تابع برای ارسال فایل‌ها
  const handleUpload = async () => {
    const success = await uploadContractFiles(order.id, 7, files);
    if (success) {
      // رفرش صفحه یا انتقال به مرحله بعد
    }
  };

  // لینک فایل آپلود شده توسط ادمین
  const adminFileLink = '/uploads/admin/' + order.id + '/contract.pdf';

  return (
    <div>
      <h2>مرحله هفتم: صدور و ارسال قرارداد و تاییدیه اطلاعات</h2>
      <p>لطفاً فایل زیر را دانلود کنید:</p>
      <a href={adminFileLink} download>دانلود قرارداد</a>
      <div>
        <label>آپلود فایل‌های مورد نیاز:</label>
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <button onClick={handleUpload}>ارسال</button>
    </div>
  );
}

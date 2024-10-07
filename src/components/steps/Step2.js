// کامپوننت مرحله دوم: بارگذاری مدارک شناسایی
import React, { useState } from 'react';
import { uploadFiles } from '@/actions/uploadFiles';

export default function Step2({ order , user}) {
  const [nationalCard, setNationalCard] = useState(null);
  const [idDocument, setIdDocument] = useState(null);

  // تابع برای ارسال فایل‌ها
  const handleUpload = async () => {
    const success = await uploadFiles(order.id, 2, [
      { file: nationalCard, fileType: 'تصویر کارت ملی' },
      { file: idDocument, fileType: 'تصویر شناسنامه' },
    ], user.id);
    if (success) {
      // رفرش صفحه یا انتقال به مرحله بعد
    }
  };

  return (
    <div>
      <h2>مرحله دوم: بارگذاری مدارک شناسایی</h2>
      <div>
        <label>تصویر کارت ملی:</label>
        <input type="file" onChange={(e) => setNationalCard(e.target.files[0])} />
      </div>
      <div>
        <label>تصویر شناسنامه:</label>
        <input type="file" onChange={(e) => setIdDocument(e.target.files[0])} />
      </div>
      <button onClick={handleUpload}>ارسال</button>
    </div>
  );
}

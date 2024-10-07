// کامپوننت مرحله سوم: تاییدیه خط مشی و شرایط و ضوابط
import React, { useState } from 'react';
import { submitStepAgreement } from '@/actions/submitStepAgreement';

export default function Step3({ order }) {
  const [agreed, setAgreed] = useState(false);

  // تابع برای ارسال تاییدیه
  const handleSubmit = async () => {
    if (agreed) {
      const success = await submitStepAgreement(order.id);
      if (success) {
        // رفرش صفحه یا انتقال به مرحله بعد
      }
    } else {
      alert('لطفاً شرایط را تایید کنید.');
    }
  };

  return (
    <div>
      <h2>مرحله سوم: تاییدیه خط مشی و شرایط و ضوابط</h2>
      <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc' }}>
        {/* متن لورم ایپسوم */}
        <p>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...
        </p>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          شرایط و ضوابط را می‌پذیرم
        </label>
      </div>
      <button onClick={handleSubmit}>ادامه</button>
    </div>
  );
}

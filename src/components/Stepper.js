// کامپوننت نمایش مراحل سفارش
import React from 'react';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
// ... سایر مراحل

export default function Stepper({ order }) {
  // تعیین مرحله فعلی بر اساس وضعیت سفارش
  const currentStep = order.steps.length + 1;

  return (
    <div>
      {currentStep === 1 && <Step1 order={order} />}
      {currentStep === 2 && <Step2 order={order} />}
      {/* سایر مراحل */}
    </div>
  );
}

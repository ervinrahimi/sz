// کامپوننت نمایش مراحل سفارش
import React from 'react'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import Step6 from './steps/Step6'
import Step7 from './steps/Step7'
import Step8 from './steps/Step8'

export default function Stepper({ order , user }) {
  // تعیین مرحله فعلی بر اساس وضعیت سفارش
  const currentStep = order.steps.length + 1

  return (
    <div>
      {currentStep === 1 && <Step1 order={order} user={user} />}
      {currentStep === 2 && <Step2 order={order} user={user} />}
      {currentStep === 3 && <Step3 order={order} user={user} />}
      {currentStep === 4 && <Step4 order={order} user={user} />}
      {currentStep === 5 && <Step5 order={order} user={user} />}
      {currentStep === 6 && <Step6 order={order} user={user} />}
      {currentStep === 7 && <Step7 order={order} user={user} />}
      {currentStep === 8 && <Step8 order={order} user={user} />}
    </div>
  )
}

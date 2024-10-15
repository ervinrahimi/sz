'use client'
import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
import Header from '@/components/layout/Header/Header'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function shoppingStage3() {
  const [stageNum, setStageNum] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    // شکستن مسیر URL به بخش‌های مختلف
    const segments = pathname.split('/')

    // دریافت آخرین بخش URL
    const stage = segments[segments.length - 1]

    // گرفتن آخرین کاراکتر از بخش نهایی URL
    const finalStage = setStageNum(Number(stage.slice(-1)))

    // فقط یک بار چاپ کن
    console.log(finalStage)
  }, [pathname]) // اینجا وابستگی رو به pathname گذاشتیم که هر وقت تغییر کرد، این کد اجرا بشه

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const handleToast = () => {
    toast('در حال حاضر نمیتوانید این عملیات را انجام دهید')
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>شرایط و ضوابط فروش خودرو</h2>
          <p>
            این شرایط و ضوابط برای فروش خودرو به شرح زیر است:
            <br />
            1. خودرو در شرایط عالی و با ضمانت تحویل داده می‌شود.
            <br />
            2. پرداخت باید به صورت کامل قبل از تحویل خودرو انجام شود.
            <br />
            3. خریدار مسئولیت ثبت خودرو را به عهده دارد.
            <br />
            4. هزینه‌های جانبی مانند بیمه و مالیات بر عهده خریدار است.
            <br />
            5. خودرو بدون تصادف و با کارکرد مشخص به فروش می‌رسد.
            <br />
            6. هر گونه تغییرات بعد از فروش با توافق طرفین انجام می‌شود.
            <br />
            7. این قرارداد از زمان تحویل خودرو تا سه ماه معتبر است.
            <br />
            8. خریدار موظف است به تمام موارد ایمنی در هنگام رانندگی توجه کند.
            <br />
            9. فروشنده تعهدی نسبت به خسارات وارده به خودرو بعد از تحویل ندارد.
            <br />
            10. خریدار حق بازگشت یا تعویض خودرو را ندارد مگر با شرایط خاص.
            <br />
            11. فروشنده مسئولیت نگهداری خودرو تا زمان تحویل را به عهده دارد.
            <br />
            12. تمامی قطعات خودرو اصلی و مورد تایید هستند.
            <br />
            13. هرگونه تاخیر در تحویل باید به فروشنده اطلاع داده شود.
            <br />
            14. فروشنده متعهد به رفع مشکلات فنی احتمالی قبل از تحویل خودرو است.
            <br />
            15. این شرایط قابل تغییر و بازبینی توسط فروشنده است.
          </p>

          <div className={styles.checkboxContainer}>
            <label>
              <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
              من شرایط و ضوابط را خواندم و تایید می‌کنم.
            </label>
          </div>
        </div>
        <Link className={styles.link} href={`../shopping/stage-${stageNum + 1}`}>
          ورود به مرحله بعد
        </Link>
        <Link className={styles.link} href={'../shopping'}>
          بازگشت به مراحل فروش
        </Link>
      </div>
    </div>
  )
}

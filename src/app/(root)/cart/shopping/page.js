'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './page.module.css'
import { ShoppingTick } from '@/assets/svgs/Icons/Icons'
import { useSearchParams } from 'next/navigation' // استفاده از useSearchParams
import Header from '@/components/layout/Header/Header'
import { useRouter } from 'next/navigation'
export default function shoppingPage() {
  const router = useRouter()

  let check = null
  const searchParams = useSearchParams()
  const carName = searchParams.get('carName')
  const handleCarLink = (carName) => {
    router.replace(
      `/cars/${carName}`, // استفاده از فرمت صحیح برای query string
      { scroll: false }
    )
  }
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <Image
          onClick={() => handleCarLink(carName)}
          src={`/${carName}.jpg`}
          width={800}
          height={800}
          alt={`${carName}`}
        />
        <h2>مراحل خرید خودروی {carName}</h2>
        <p>برای راهنمایی و مشاوره، با ما در ارتباط باشید</p>
        <div className={styles.roads}>
          <Link href={'./shopping/stage-1'}>
            <Image src={'/icons/1.png'} width={300} height={300} alt='null' />
            <h5>مرحله 1</h5>
            <span>فرم اطلاعات متقاضی</span>
            {!check ? (
              <div className={styles.check}>
                <ShoppingTick className={styles.tick} />
              </div>
            ) : null}
          </Link>
          <Link href={'./shopping/stage-2'}>
            <Image src={'/icons/2.png'} width={300} height={300} alt='null' />
            <h5>مرحله 2</h5>
            <span>مدارک شناسایی</span>
          </Link>
          <Link href={'./shopping/stage-3'}>
            <Image src={'/icons/3.png'} width={300} height={300} alt='null' />
            <h5>مرحله 3</h5>
            <span>تاییدیه خط مشی و شرایط و ضوابط</span>
          </Link>
          <Link href={'./shopping/stage-4'}>
            <Image src={'/icons/4.png'} width={300} height={300} alt='null' />
            <h5>مرحله 4</h5>
            <span>دریافت وجه التزام به خرید جهت رزرو قطعی</span>
          </Link>
          <Link href={'./shopping/stage-5'}>
            <Image src={'/icons/5.png'} width={300} height={300} alt='null' />
            <h5>مرحله 5</h5>
            <span>ارسال فرم تاییدیه ثبت اطلاعات</span>
          </Link>
          <Link href={'./shopping/stage-6'}>
            <Image src={'/icons/6.png'} width={300} height={300} alt='null' />
            <h5>مرحله 6</h5>
            <span>ارسال شناسه پرداخت وجه</span>
          </Link>
          <Link href={'./shopping/stage-7'}>
            <Image src={'/icons/7.png'} width={300} height={300} alt='null' />
            <h5>مرحله 7</h5>
            <span>صدور و ارسال قرارداد و تاییدیه اطلاعات</span>
          </Link>
          <Link href={'./shopping/stage-8'}>
            <Image src={'/icons/8.png'} width={300} height={300} alt='null' />
            <h5>مرحله 8</h5>
            <span>ارسال پستی اصل مدارک</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

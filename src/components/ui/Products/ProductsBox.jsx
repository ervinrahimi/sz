'use client'
import React from 'react'
import styles from './ProductsBox.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ProductsBox({ title, subTitle }) {
  const router = useRouter()
  const handleClick = (address) => () => {
    router.push('/' + 'cars/' + address)
  }

  const handleToastClick = () => {
    toast('لطفا وارد صفحه محصول شوید')
  }
  const handleToastClick2 = () => {
    toast('در حال حاضر این خودرو غیر فعال است')
  }
  return (
    <>
      <div className={title ? styles.titleContainer : styles.titleOff}>
        <h3>{title}</h3>
        <p>{subTitle}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.colorContainer}>
            <span className={styles.colors} />
            <span className={styles.colors} />
            <span className={styles.colors} />
          </div>
          <Image
            className={styles.image}
            src={'/mg-gt.jpg'}
            width={1000}
            height={1000}
            alt={'car-image'}
            onClick={handleToastClick2}
          />
          <h4 className={styles.title} onClick={handleToastClick2}>
            MG GT
          </h4>
          <h3 className={styles.subTitle} onClick={handleToastClick2}>
            اسپرت و خانوادگی
          </h3>
          <p className={styles.text}>
            {`خودرویی اسپرت با طراحی مدرن و دینامیک بالا. ترکیبی از سرعت و راحتی که هم برای سفرهای خانوادگی و هم رانندگی روزانه مناسب است.`.slice(
              0,
              98
            ) + '...'}
          </p>
          <div className={styles.line}>
            <span></span>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.priceNum}>
              2,500,000,000
              <span>ت</span>
            </span>
          </div>
          <div className={styles.actionBox}>
            <button className={styles.actionButton} onClick={handleToastClick2}>
              مشاهده
            </button>
            <button className={styles.actionButton} onClick={handleToastClick2}>
              سبد خرید
            </button>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.colorContainer}>
            <span className={styles.colors} />
            <span className={styles.colors} />
            <span className={styles.colors} />
          </div>
          <Image
            className={styles.image}
            src={'/suba.jpg'}
            width={1000}
            height={1000}
            alt={'car-image'}
            onClick={handleClick('suba-m4')}
          />
          <h4 className={styles.title} onClick={handleClick('suba-m4')}>
            Suba M4
          </h4>
          <h3 className={styles.subTitle} onClick={handleClick('suba-m4')}>
            جادار و خانوادگی
          </h3>
          <p className={styles.text}>
            {`شاسی‌بلندی با فضای داخلی جادار و امکانات مناسب برای خانواده‌ها. این خودرو با مصرف سوخت بهینه، انتخابی عالی برای سفرهای درون‌شهری و خارج از شهر است.`.slice(
              0,
              98
            ) + '...'}
          </p>
          <div className={styles.line}>
            <span></span>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.priceNum}>
              2,500,000,000
              <span>ت</span>
            </span>
          </div>
          <div className={styles.actionBox}>
            <button className={styles.actionButton} onClick={handleClick('suba-m4')}>
              مشاهده
            </button>
            <button className={styles.actionButton} onClick={handleToastClick}>
              سبد خرید
            </button>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.colorContainer}>
            <span className={styles.colors} />
            <span className={styles.colors} />
            <span className={styles.colors} />
          </div>
          <Image
            className={styles.image}
            src={'/sx5.jpg'}
            width={1000}
            height={1000}
            alt={'car-image'}
            onClick={handleClick('sx5')}
          />
          <h4 className={styles.title} onClick={handleClick('sx5')}>
            SX5
          </h4>
          <h3 className={styles.subTitle} onClick={handleClick('sx5')}>
            ایمن و مناسب سفر
          </h3>
          <p className={styles.text}>
            {`خودرویی ایمن با امکانات مدرن و فضای کافی برای سفرهای طولانی. با طراحی به‌روز و امکانات رفاهی، انتخابی مطمئن برای خانواده‌هاست.`.slice(
              0,
              98
            ) + '...'}
          </p>
          <div className={styles.line}>
            <span></span>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.priceNum}>
              2,500,000,000
              <span>ت</span>
            </span>
          </div>
          <div className={styles.actionBox}>
            <button className={styles.actionButton} onClick={handleClick('sx5')}>
              مشاهده
            </button>
            <button className={styles.actionButton} onClick={handleToastClick}>
              سبد خرید
            </button>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.colorContainer}>
            <span className={styles.colors} />
            <span className={styles.colors} />
            <span className={styles.colors} />
          </div>
          <Image
            className={styles.image}
            src={'/b511.jpg'}
            width={1000}
            height={1000}
            alt={'car-image'}
            onClick={handleClick('b511')}
          />
          <h4 className={styles.title} onClick={handleClick('b511')}>
            B511
          </h4>
          <h3 className={styles.subTitle} onClick={handleClick('b511')}>
            اقتصادی و راحت
          </h3>
          <p className={styles.text}>
            {`یک سدان با کیفیت سواری نرم و مصرف سوخت اقتصادی. مناسب برای رانندگی روزمره و سفرهای خانوادگی با هزینه‌های کمتر.`.slice(
              0,
              98
            ) + '...'}
          </p>
          <div className={styles.line}>
            <span></span>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.priceNum}>
              2,500,000,000
              <span>ت</span>
            </span>
          </div>
          <div className={styles.actionBox}>
            <button className={styles.actionButton} onClick={handleClick('b511')}>
              مشاهده
            </button>
            <button className={styles.actionButton} onClick={handleToastClick}>
              سبد خرید
            </button>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.colorContainer}>
            <span className={styles.colors} />
            <span className={styles.colors} />
            <span className={styles.colors} />
          </div>
          <Image
            className={styles.image}
            src={'/t5.jpg'}
            width={1000}
            height={1000}
            alt={'car-image'}
            onClick={handleClick('t5')}
          />
          <h4 className={styles.title} onClick={handleClick('t5')}>
            T5
          </h4>
          <h3 className={styles.subTitle} onClick={handleClick('t5')}>
            قدرتمند و خانوادگی
          </h3>
          <p className={styles.text}>
            {`خودرویی شاسی‌بلند با موتور قدرتمند و فضای کافی برای سفرهای خانوادگی. امکانات رفاهی و ایمنی این خودرو آن را برای سفرهای طولانی مناسب کرده است.`.slice(
              0,
              98
            ) + '...'}
          </p>
          <div className={styles.line}>
            <span></span>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.priceNum}>
              2,500,000,000
              <span>ت</span>
            </span>
          </div>
          <div className={styles.actionBox}>
            <button className={styles.actionButton} onClick={handleClick('t5')}>
              مشاهده
            </button>
            <button className={styles.actionButton} onClick={handleToastClick}>
              سبد خرید
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

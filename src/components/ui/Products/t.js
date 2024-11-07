import ProductBigImage from '@/components/ui/Products/ProductBigImage'
import ProductsBox from '@/components/ui/Products/ProductsBox'
import styles from '../page.module.css'
import toast from 'react-hot-toast'
import prisma from '@/db/client'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import { useRouter } from 'next/navigation'

export default async function ProductPage({ params }) {
  const carId = params.id
  // const router = useRouter()

  // دریافت خودرو
  const car = await prisma.car.findUnique({
    where: { id: carId },
    include: {
      salesConditions: true,
      technicalSpecifications: true,
      appearanceSpecifications: true,
    },
  })


  const handleToast = () => {
    toast('در حال حاضر نمیتوانید این عملیات را انجام دهید')
  }

  const handleShopping = (carName) => {
    // router.push(
    //   /cart/shopping?carName=${carName}, // استفاده از فرمت صحیح برای query string
    //   { scroll: true }
    // )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* <MainSlider product /> */}
        <ProductBigImage address={'/cars/b511/1.webp'} />

        <div className={styles.infoContainer}>
          <span className={styles.leftLine} />
          <span className={styles.rightLine} />
          <div className={styles.carContainer}>
            <h2>بی 511</h2>

            <h4>
              <TypeAnimation
                sequence={[
                  'Suitable for travel and family',
                  2000,
                  'Farda Khodro is Here !',
                  2000,
                  'SoltaniZade Car Group !',
                  2000,
                ]}
                wrapper="span"
                repeat={Infinity}
              />
            </h4>
            <Image src="/cars/b511.png" width={1000} height={1000} alt="car" />
          </div>

          <div className={styles.information}>
            <h3>مشخصات فنی</h3>
            <div className={styles.informationGrid}>
              <li className={styles.subMargin}>
                <span>
                  حجم موتور (CC)<div className={styles.subText}>تنفس طبیعی</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1480</span>
              </li>
              <li>
                <span>سیستم تعلیق جلو / عقب</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>مک فرسون / میله پیچشی</span>
              </li>
              <li>
                <span>حداکثر قدرت / حداکثر گشتاور</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>106 اسب بخار / 135 نیوتن متر</span>
              </li>
              <li>
                <span>
                  گیربکس<div className={styles.subText}>دیفرانسیل جلو</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>اتوماتیک 5 سرعته | 5DCT</span>
              </li>
              <li>
                <span>طول،عرض،ارتفاع (mm)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>4390*1725*1490</span>
              </li>
              <li>
                <span>فاصله محوری (mm)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>2535</span>
              </li>
              <li>
                <span>وزن خالص (kg)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1115</span>
              </li>
              <li className={styles.subMargin}>
                <span>
                  ظرفیت مخزن سوخت (Liter)
                  <div className={styles.subText}>مصرف سوخت (L/100Km) = 6/4</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>40</span>
              </li>
            </div>
          </div>
          <div className={styles.line} />

          <div className={styles.information}>
            <h3 className={styles.h3Margin}>مشکلات تکمیلی</h3>
            <div className={styles.informationGrid}>
              <li className={styles.subMargin}>
                <span>رنگ</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>تست</span>
              </li>
              <li>
                <span>تو دوزی</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>تست</span>
              </li>
              <li>
                <span>رینگ</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>تست</span>
              </li>
              <li>
                <span>تست</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>تست</span>
              </li>
            </div>
          </div>
          <div className={styles.line} />
          <div className={styles.salesBox} id="sharayet">
            <h5>شرایط فروش B511</h5>
            <h5>سازمانی</h5>
          </div>

          <div className={styles.information}>
            <div className={styles.informationGrid}>
              <li>
                <span>قیمت</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>895,000,000</span>
              </li>
              <li>
                <span>زمان ثبت نام</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>358,000,000</span>
              </li>
              <li>
                <span>پرداخت یکماهه</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>179,500,000</span>
              </li>
              <li>
                <span>مبلغ اقساط ماهیانه (۳۰ ماه)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>14,500,000</span>
              </li>
              <li>
                <span>مانده زمان تحویل</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>98,600,000</span>
              </li>
              <li>
                <span>قیمت نهایی</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1,071,200,000</span>
              </li>
              <li>
                <span>موعد تحویل</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>120 روز کاری</span>
              </li>
              <li>
                <span>سود مشارکت</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>18%</span>
              </li>
            </div>
            <div className={styles.actionButton}>
              <button onClick={() => handleShopping('b511')}>ثــبـت سفارش</button>
              <button onClick={handleToast}>درخواستـ مشاوره</button>
            </div>
          </div>

          <div className={styles.line} />
          <div className={styles.salesBox}>
            <h5>شرایط فروش Suba M4</h5>
            <h5>عمومی</h5>
          </div>

          <div className={styles.information}>
            <div className={styles.informationGrid}>
              <li>
                <span>قیمت</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>895,000,000</span>
              </li>
              <li>
                <span>زمان ثبت نام</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>358,000,000</span>
              </li>
              <li>
                <span>پرداخت یکماهه</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>89,500,000</span>
              </li>
              <li>
                <span>مبلغ اقساط ماهیانه (۱۲ ماه)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>34,800,000</span>
              </li>
              <li>
                <span>مانده زمان تحویل</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>87,900,000</span>
              </li>
              <li>
                <span>قیمت نهایی</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>953,000,000</span>
              </li>
              <li>
                <span>موعد تحویل</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>120 روز کاری</span>
              </li>
              <li>
                <span>سود مشارکت</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>18%</span>
              </li>
            </div>
            <div className={styles.actionButton}>
              <button onClick={() => handleShopping('b511')}>ثــبـت سفارش</button>
              <button onClick={handleToast}>درخواستـ مشاوره</button>
            </div>
          </div>
          <div className={${styles.line} ${styles.line2}} />
        </div>

        <ProductsBox title={'محصولات محبوب'} subTitle={'آخرین محصولات فروشگاه'} />
      </div>
      {/* <Image
        className={styles.background}
        width={4000}
        height={4000}
        src={'/figma/2.jpg'}
        alt={'figma'}
      /> */}
    </div>
  )
}
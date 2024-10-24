'use client'
import Image from 'next/image'
import styles from '../page.module.css'
import { MainSlider } from '@/components/ui/Slider/Slider'
import ProductsBox from '@/components/ui/Products/ProductsBox'
import { TypeAnimation } from 'react-type-animation'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import ProductBigImage from '@/components/ui/Products/ProductBigImage'
export default function ProductPage() {
  const router = useRouter()
  const handleToast = () => {
    toast('در حال حاضر نمیتوانید این عملیات را انجام دهید')
  }
  const handleShopping = (carName) => {
    router.push(
      `/cart/shopping?carName=${carName}`, // استفاده از فرمت صحیح برای query string
      { scroll: true }
    )
  }
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* <HeaderSticky />
        <Header product /> */}
        {/* <MainSlider product /> */}
        <ProductBigImage address={'/cars/t5/1.jpg'} />
        <div className={styles.infoContainer}>
          <span className={styles.leftLine} />
          <span className={styles.rightLine} />
          <div className={styles.carContainer}>
            <h2>تی 5</h2>

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
            <Image src="/cars/t5.png" width={1000} height={1000} alt="car" />
          </div>

          <div className={styles.information}>
            <h3>مشخصات فنی</h3>
            <div className={styles.informationGrid}>
              <li className={styles.subMargin}>
                <span>
                  حجم موتور (CC)
                  <div className={styles.subText}>موتور تحت لیسانس میتسوبیشی</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1481</span>
              </li>
              <li>
                <span>سیستم تعلیق جلو / عقب</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>مک فرسون / تریلینگ آرم</span>
              </li>
              <li>
                <span>حداکثر قدرت / حداکثر گشتاور</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>156 اسب بخار / 230 نیوتن متر</span>
              </li>
              <li className={styles.subMargin}>
                <span>
                  گیربکس<div className={styles.subText}>دیفرانسیل جلو</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>اتوماتیک 6 سرعته</span>
              </li>
              <li>
                <span>طول،عرض،ارتفاع (mm)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>4460*1820*1720</span>
              </li>
              <li>
                <span>فاصله محوری (mm)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>2720</span>
              </li>
              <li>
                <span>وزن خالص (kg)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1575</span>
              </li>
              <li className={styles.subMargin}>
                <span>
                  ظرفیت مخزن سوخت (Liter)
                  <div className={styles.subText}>مصرف سوخت (L/100Km) = 7/4</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>45</span>
              </li>
            </div>
          </div>
          <div className={styles.line} />

          <div className={styles.information}>
            <h3 className={styles.h3Margin}>مشخصات ظاهری</h3>
            <div className={styles.informationGrid}>
              <li className={styles.subMargin}>
                <span>
                  تست<div className={styles.subText}>جواب</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>تست</span>
              </li>
              <li>
                <span>تست</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>تست</span>
              </li>
              <li>
                <span>تست</span>
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
            <h5>شرایط فروش T5</h5>
            <h5>سازمانی</h5>
          </div>

          <div className={styles.information}>
            <div className={styles.informationGrid}>
              <li>
                <span>قیمت</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1,395,000,000</span>
              </li>
              <li>
                <span>زمان ثبت نام</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>558,000,000</span>
              </li>
              <li>
                <span>پرداخت یکماهه</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>279,000,000</span>
              </li>
              <li>
                <span>مبلغ اقساط ماهیانه (30 ماه)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>23,151,700</span>
              </li>
              <li>
                <span>مانده زمان تحویل</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>154,000,000</span>
              </li>
              <li>
                <span>قیمت نهایی</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1,685,500,000</span>
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
              <button onClick={() => handleShopping('t5')}>ثــبـت سفارش</button>
              <button onClick={handleToast}>درخواستـ مشاوره</button>
            </div>
          </div>

          <div className={styles.line} />
          <div className={styles.salesBox}>
            <h5>شرایط فروش T5</h5>
            <h5>عمومی</h5>
          </div>
          {/* 1 */}
          <div className={styles.information}>
            <div className={styles.informationGrid}>
              <li>
                <span>قیمت</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1,395,000,000</span>
              </li>
              <li>
                <span>زمان ثبت نام</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>558,000,000</span>
              </li>
              <li>
                <span>پرداخت یکماهه</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>139,500,000</span>
              </li>
              <li>
                <span>مبلغ اقساط ماهیانه (12 ماه)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>55,400,000</span>
              </li>
              <li>
                <span>مانده زمان تحویل</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>137,100,000</span>
              </li>
              <li>
                <span>قیمت نهایی</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1,499,700,000</span>
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
              <button onClick={() => handleShopping('t5')}>ثــبـت سفارش</button>
              <button onClick={handleToast}>درخواستـ مشاوره</button>
            </div>
          </div>
          <div className={`${styles.line} ${styles.line2}`} />
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

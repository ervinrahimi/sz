'use client'
import Image from 'next/image'
import styles from '../page.module.css'
import { MainSlider } from '@/components/ui/Slider/Slider'
import ProductsBox from '@/components/ui/Products/ProductsBox'
import { TypeAnimation } from 'react-type-animation'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

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
        <MainSlider product />
        <div className={styles.infoContainer}>
          <span className={styles.leftLine} />
          <span className={styles.rightLine} />
          <div className={styles.carContainer}>
            <h2>سـوبـا ام 4</h2>

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
            <Image src="/cars/suba.png" width={1000} height={1000} alt="car" />
          </div>

          <div className={styles.information}>
            <h3>مشخصات فنی</h3>
            <div className={styles.informationGrid}>
              <li className={styles.subMargin}>
                <span>
                  حجم موتور (cc)
                  <div className={styles.subText}>موتور تحت لیسانس میتسوبیشی</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1481</span>
              </li>
              <li>
                <span>سیستم تعلیق جلو / عقب</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>مک فرسون / توییست بیم</span>
              </li>
              <li>
                <span>حداکثر قدرت / حداکثر گشتاور</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>195 اسب بخار / 285 نیوتن متر</span>
              </li>
              <li className={styles.subMargin}>
                <span>
                  گیربکس<div className={styles.subText}>دیفرانسیل جلو</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>اتوماتیک 7 سرعته دو کلاچه تر (WDCT)</span>
              </li>
              <li className={styles.subMargin}>
                <span>
                  طول،عرض،ارتفاع (mm)
                  <div className={styles.subText}>تعداد سرنشین = 2+2+3 (7 نفر)</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1711*1889*4845</span>
              </li>
              <li>
                <span>فاصله محوری (mm)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>2900</span>
              </li>
              <li>
                <span>وزن خالص (kg)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1715</span>
              </li>
              <li className={styles.subMargin}>
                <span>
                  ظرفیت مخزن سوخت (Liter)
                  <div className={styles.subText}>مصرف سوخت (L/100Km) = 6/8</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>55</span>
              </li>
            </div>
          </div>
          <div className={styles.line} />

          <div className={styles.information}>
            <h3 className={styles.h3Margin}>مشخصات ظاهری</h3>
            <div className={styles.informationGrid}>
              <li className={styles.subMargin}>
                <span>
                  رنگ<div className={styles.subText}>تست</div>
                </span>
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
            <h5>شرایط فروش Suba M4</h5>
            <h5>سازمانی</h5>
          </div>

          <div className={styles.information}>
            <div className={styles.informationGrid}>
              <li>
                <span>قیمت</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>2,075,000,000</span>
              </li>
              <li>
                <span>زمان ثبت نام</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>830,000,000</span>
              </li>
              <li>
                <span>پرداخت یکماهه</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>207,500,000</span>
              </li>
              <li>
                <span>مبلغ اقساط ماهیانه (۲۴ ماه)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>50,400,000</span>
              </li>
              <li>
                <span>مانده زمان تحویل</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>226,100,000</span>
              </li>
              <li>
                <span>قیمت نهایی</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>2,473,800,000</span>
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
              <button onClick={() => handleShopping('suba-m4')}>ثــبـت سفارش</button>
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
                <span>2,075,000,000</span>
              </li>
              <li>
                <span>زمان ثبت نام</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>726,250,000</span>
              </li>
              <li>
                <span>پرداخت یکماهه</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>311,200,000</span>
              </li>
              <li>
                <span>مبلغ اقساط ماهیانه (۱۲ ماه)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>82,400,000</span>
              </li>
              <li>
                <span>مانده زمان تحویل</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>204,000,000</span>
              </li>
              <li>
                <span>قیمت نهایی</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>2,230,400,000</span>
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
              <button onClick={() => handleShopping('suba-m4')}>ثــبـت سفارش</button>
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

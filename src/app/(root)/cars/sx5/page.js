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

        {/* <MainSlider product /> */}
        <ProductBigImage address={'/cars/sx5/1.jpg'} />
        <div className={styles.infoContainer}>
          <span className={styles.leftLine} />
          <span className={styles.rightLine} />
          <div className={styles.carContainer}>
            <h2>اس ایکس 5</h2>

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
            <Image src="/cars/sx5.png" width={1000} height={1000} alt="car" />
          </div>

          <div className={styles.information}>
            <h3>مشخصات فنی</h3>
            <div className={styles.informationGrid}>
              <li className={styles.subMargin}>
                <span>
                  حجم موتور (CC)<div className={styles.subText}>موتور تحت لیسانس میتسوبیشی</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1590</span>
              </li>
              <li>
                <span>سیستم تعلیق جلو / عقب</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>مک فرسون / تثبیت کننده جانبی</span>
              </li>
              <li>
                <span>حداکثر قدرت / حداکثر گشتاور</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>123 اسب بخار / 150 نیوتن متر</span>
              </li>
              <li className={styles.subMargin}>
                <span>
                  گیربکس<div className={styles.subText}>دیفرانسیل جلو+ Tiptronic</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>اتوماتیک CVT</span>
              </li>
              <li>
                <span>طول،عرض،ارتفاع (mm)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>4515*1812*1725</span>
              </li>
              <li>
                <span>فاصله محوری (mm)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>2720</span>
              </li>
              <li>
                <span>وزن خالص (kg)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1350</span>
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
            <h3 className={styles.h3Margin}>مشخصات تکمیلی</h3>
            <div className={styles.informationGrid}>
              <li className={styles.subMargin}>
                <span>
                  تست<div className={styles.subText}>تست</div>
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
            <h5>شرایط فروش SX5</h5>
            <h5>سازمانی</h5>
          </div>

          <div className={styles.information}>
            <div className={styles.informationGrid}>
              <li>
                <span>قیمت</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1,055,000,000</span>
              </li>
              <li>
                <span>زمان ثبت نام</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>527,500,000</span>
              </li>
              <li>
                <span>پرداخت یکماهه</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>ندارد</span>
              </li>
              <li>
                <span>مبلغ اقساط ماهیانه (24 ماه)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>26,000,000</span>
              </li>
              <li>
                <span>مانده زمان تحویل</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>116,900,000</span>
              </li>
              <li>
                <span>قیمت نهایی</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1,270,100,000</span>
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
              <button onClick={() => handleShopping('sx5')}>ثــبـت سفارش</button>
              <button onClick={handleToast}>درخواستـ مشاوره</button>
            </div>
          </div>

          <div className={styles.line} />
          <div className={styles.salesBox}>
            <h5>شرایط فروش SX5</h5>
            <h5>عمومی</h5>
          </div>

          <div className={styles.information}>
            <div className={styles.informationGrid}>
              <li>
                <span>قیمت</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1,055,000,000</span>
              </li>
              <li>
                <span>زمان ثبت نام</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>422,000,000</span>
              </li>
              <li>
                <span>پرداخت یکماهه</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>105,500,000</span>
              </li>
              <li>
                <span>مبلغ اقساط ماهیانه (18 ماه)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>31,000,000</span>
              </li>
              <li>
                <span>مانده زمان تحویل</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>110,300,000</span>
              </li>
              <li>
                <span>قیمت نهایی</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1,197,500,000</span>
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
              <button onClick={() => handleShopping('sx5')}>ثــبـت سفارش</button>
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

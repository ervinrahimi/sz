'use client'
import Image from 'next/image'
import styles from '../page.module.css'
import { MainSlider } from '@/components/ui/Slider/Slider'
import ProductsBox from '@/components/ui/Products/ProductsBox'
import { TypeAnimation } from 'react-type-animation'
import toast from 'react-hot-toast'
import ProductBigImage from '@/components/ui/Products/ProductBigImage'

export default function ProductPage() {
  const handleToast = () => {
    toast('در حال حاضر نمیتوانید این عملیات را انجام دهید')
  }
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* <MainSlider product /> */}
        <ProductBigImage address={'/cars/mg-gt/1.jpg'} />
        <div className={styles.infoContainer}>
          <span className={styles.leftLine} />
          <span className={styles.rightLine} />
          <div className={styles.carContainer}>
            <h2>ام‌جی جی‌تی</h2>

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
            <Image src="/cars/mg-gt.png" width={1000} height={1000} alt="car" />
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
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li className={styles.subMargin}>
                <span>
                  حجم موتور (CC)<div className={styles.subText}>تنفس طبیعی</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
            </div>
          </div>
          <div className={styles.line} />

          <div className={styles.information}>
            <h3 className={styles.h3Margin}>مشخصات ظاهری</h3>
            <div className={styles.informationGrid}>
              <li className={styles.subMargin}>
                <span>
                  حجم موتور (CC)<div className={styles.subText}>تنفس طبیعی</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1480</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li className={styles.subMargin}>
                <span>
                  حجم موتور (CC)<div className={styles.subText}>تنفس طبیعی</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
            </div>
          </div>
          <div className={styles.line} />
          <div className={styles.salesBox}>
            <h5>شرایط فروش Suba M4</h5>
            <h5>عمومی 1</h5>
          </div>

          <div className={styles.information}>
            <div className={styles.informationGrid}>
              <li className={styles.subMargin}>
                <span>
                  حجم موتور (CC)<div className={styles.subText}>تنفس طبیعی</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1480</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li className={styles.subMargin}>
                <span>
                  حجم موتور (CC)<div className={styles.subText}>تنفس طبیعی</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
            </div>
            <div className={styles.actionButton}>
              <button onClick={handleToast}>ثــبـت سفارش</button>
              <button onClick={handleToast}>درخواستـ مشاوره</button>
            </div>
          </div>

          <div className={styles.line} />
          <div className={styles.salesBox}>
            <h5>شرایط فروش Suba M4</h5>
            <h5>عمومی 1</h5>
          </div>

          <div className={styles.information}>
            <div className={styles.informationGrid}>
              <li className={styles.subMargin}>
                <span>
                  حجم موتور (CC)<div className={styles.subText}>تنفس طبیعی</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>1480</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li>
                <span>حجم موتور (CC)</span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
              <li className={styles.subMargin}>
                <span>
                  حجم موتور (CC)<div className={styles.subText}>تنفس طبیعی</div>
                </span>
                <Image src={'/dots.png'} width={700} height={700} alt="dots" />
                <span>حجم موتور (CC)</span>
              </li>
            </div>
            <div className={styles.actionButton}>
              <button onClick={handleToast}>ثــبـت سفارش</button>
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

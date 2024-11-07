'use client'

import ProductBigImage from '@/components/ui/Products/ProductBigImage'
import ProductsBox from '@/components/ui/Products/ProductsBox'
import styles from './ProductDetail.module.css'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import { useRouter } from 'next/navigation'

export default function ProductDetail({ car }) {
  const router = useRouter()

  const handleToast = () => {
    toast('در حال حاضر نمی‌توانید این عملیات را انجام دهید')
  }

  const handleShopping = (carName) => {
    router.push(`/cart/shopping?carName=${carName}`, { scroll: true })
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ProductBigImage address={car?.image || '/default-car-image.webp'} />

        <div className={styles.infoContainer}>
          <span className={styles.leftLine} />
          <span className={styles.rightLine} />

          <div className={styles.carContainer}>
            <h2>{car?.name || 'مدل خودرو'}</h2>
            <h4>
              <TypeAnimation
                sequence={[
                  'مناسب برای سفر و خانواده',
                  2000,
                  'فردا خودرو اینجاست!',
                  2000,
                  'گروه خودرویی سلطانی‌زاده!',
                  2000,
                ]}
                wrapper="span"
                repeat={Infinity}
              />
            </h4>
            <Image src={car?.image || '/cars/default.png'} width={1000} height={1000} alt="car" />
          </div>

          <div className={styles.information}>
            <h3>مشخصات فنی</h3>
            <div className={styles.informationGrid}>
              {car?.technicalSpecifications.map((spec) => (
                <li key={spec.id} className={styles.subMargin}>
                  <span>
                    {spec.key}
                    {spec.note && <div className={styles.subText}>{spec.note}</div>}
                  </span>
                  <Image src="/dots.png" width={700} height={700} alt="dots" />
                  <span>{spec.value}</span>
                </li>
              ))}
            </div>
          </div>

          <div className={styles.line} />

          <div className={styles.information}>
            <h3>مشخصات ظاهری</h3>
            <div className={styles.informationGrid}>
              {car?.appearanceSpecifications.map((spec) => (
                <li key={spec.id} className={styles.subMargin}>
                  <span>{spec.title}</span>
                  <Image src="/dots.png" width={700} height={700} alt="dots" />
                  <span>{spec.options.join(', ')}</span>
                </li>
              ))}
            </div>
          </div>

          {car?.salesConditions.map((condition) => (
            <>
              <div className={styles.line} />
              <div key={condition.id} className={styles.salesBox}>
                <h5>{condition.name}</h5>
                <h5>{condition.conditionType}</h5>
              </div>
              <div className={styles.information}>
                <div className={styles.informationGrid}>
                  <li>
                    <span>قیمت</span>
                    <Image src="/dots.png" width={700} height={700} alt="dots" />
                    <span>{condition.price.toLocaleString()}</span>
                  </li>
                  <li>
                    <span>پرداخت زمان ثبت نام</span>
                    <Image src="/dots.png" width={700} height={700} alt="dots" />
                    <span>{condition.registrationPayment?.toLocaleString() || '-'}</span>
                  </li>
                  <li>
                    <span>پرداخت یکماهه</span>
                    <Image src="/dots.png" width={700} height={700} alt="dots" />
                    <span>{condition.oneMonthPayment?.toLocaleString() || '-'}</span>
                  </li>
                  <li>
                    <span>مبلغ اقساط ماهیانه</span>
                    <Image src="/dots.png" width={700} height={700} alt="dots" />
                    <span>{condition.monthlyInstallment?.toLocaleString() || '-'}</span>
                  </li>
                  <li>
                    <span>قیمت نهایی</span>
                    <Image src="/dots.png" width={700} height={700} alt="dots" />
                    <span>{condition.finalPrice.toLocaleString()}</span>
                  </li>
                  <li>
                    <span>موعد تحویل</span>
                    <Image src="/dots.png" width={700} height={700} alt="dots" />
                    <span>{condition.deliveryDate?.toLocaleDateString() || '-'}</span>
                  </li>
                </div>
                <div className={styles.actionButton}>
                  <button onClick={() => handleShopping(car.name)}>ثبت سفارش</button>
                  <button onClick={handleToast}>درخواست مشاوره</button>
                </div>
              </div>
            </>
          ))}

          <div className={styles.line} />
        </div>
        <ProductsBox title={'محصولات محبوب'} subTitle={'آخرین محصولات فروشگاه'} />
      </div>
    </div>
  )
}

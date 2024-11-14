// components/ui/Products/ProductDetail.js
'use client'

import ProductBigImage from '@/components/ui/Products/ProductBigImage'
import ProductsBox from '@/components/ui/Products/ProductsBox'
import styles from './ProductDetail.module.css'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import { useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import './StyleProductDetail.css'
import { useState } from 'react'

export default function ProductDetail({ car, cardBoxSections }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const router = useRouter()

  const handleToast = () => {
    toast('در حال حاضر نمی‌توانید این عملیات را انجام دهید')
  }

  const handleShopping = (carName) => {
    router.push(`/cart/shopping?carName=${carName}`, { scroll: true })
  }

  const carImages = car?.image || []
  const hasMultipleImages = carImages.length > 1

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ProductBigImage address={carImages[0] || '/default-car-image.webp'} />

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
            <Image src={carImages[0] || '/cars/default.png'} width={1000} height={1000} alt="car" />
          </div>

          {/* Conditional Swiper Slider for additional images */}
          {hasMultipleImages && (
            <>
              <Swiper
                style={{
                  '--swiper-navigation-color': '#fff',
                  '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {carImages.slice(1).map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image src={image} alt={`Car image ${index + 2}`} className="mySwiperImage1" height={100} width={100} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {carImages.slice(1).map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image src={image} alt={`Thumbnail ${index + 2}`} className="mySwiperImage2" height={100} width={100}/>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}

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
                  <span>{spec.value || spec.options.join(', ')}</span>{' '}
                  {/* نمایش مقدار انتخاب‌شده */}
                </li>
              ))}
            </div>
          </div>

          {/* Sales Conditions */}
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

        {/* نمایش cardBoxSections در ProductsBox */}
        {cardBoxSections[0] && (
          <ProductsBox
            key={cardBoxSections[0].id}
            title={cardBoxSections[0].name}
            subTitle={cardBoxSections[0].subtitle}
            cardBoxes={cardBoxSections[0].cardBoxes}
          />
        )}
      </div>
    </div>
  )
}

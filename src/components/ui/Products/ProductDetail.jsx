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
import Link from 'next/link'
import CommentForm from '../Comments/CommentForm'
import CommentList from '../Comments/CommentList'

export default function ProductDetail({ car, cardBoxSections, user }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeTab, setActiveTab] = useState('INSTALLMENT')
  const [selectedFestival, setSelectedFestival] = useState(null)
  const [selectedInstallment, setSelectedInstallment] = useState(null)
  const router = useRouter()

  const handleToast = () => {
    toast('در حال حاضر نمی‌توانید این عملیات را انجام دهید')
  }

  const handleShopping = (carName) => {
    router.push(`/cart/shopping?carName=${carName}`, { scroll: true })
  }

  const filteredConditions = (festivalId, installmentMonths) => {
    return car?.salesConditions.filter((condition) => {
      const matchesFestival = festivalId
        ? condition.salesFestivalId === festivalId
        : !condition.salesFestivalId
      const matchesInstallments = installmentMonths
        ? condition.totalInstallments === installmentMonths
        : true
      return matchesFestival && matchesInstallments
    })
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

          {/* Swiper for multiple images */}
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
                    <Image
                      src={image}
                      alt={`Car image ${index + 2}`}
                      className="mySwiperImage1"
                      height={1080}
                      width={1080}
                    />
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
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 2}`}
                      className="mySwiperImage2"
                      height={1080}
                      width={1080}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}

          {/* Technical Specifications */}
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

          {/* Appearance Specifications */}
          <div className={styles.information}>
            <h3>مشخصات ظاهری</h3>
            <div className={styles.informationGrid}>
              {car?.appearanceSpecifications.map((spec) => (
                <li key={spec.id} className={styles.subMargin}>
                  <span>
                    {spec.title}
                    {spec.note && <div className={styles.subText}>{spec.note}</div>}
                  </span>
                  <Image src="/dots.png" width={700} height={700} alt="dots" />
                  <span>{spec.value}</span>
                </li>
              ))}
            </div>
          </div>

          <div className={styles.line} />

          {/* Comfort Features */}
          <div className={styles.information}>
            <h3>امکانات رفاهی</h3>
            <div className={styles.informationGrid}>
              {car?.comfortFeatures.map((feature) => (
                <li key={feature.id} className={styles.subMargin}>
                  <span>{feature.featureName}</span>
                  <Image src="/dots.png" width={700} height={700} alt="dots" />
                  <span>{feature.description || '—'}</span>
                </li>
              ))}
            </div>
          </div>

          <div className={styles.line} />

          {/* Safety Features */}
          <div className={styles.information}>
            <h3>امکانات ایمنی</h3>
            <div className={styles.informationGrid}>
              {car?.safetyFeatures.map((feature) => (
                <li key={feature.id} className={styles.subMargin}>
                  <span>{feature.featureName}</span>
                  <Image src="/dots.png" width={700} height={700} alt="dots" />
                  <span>{feature.description || '—'}</span>
                </li>
              ))}
            </div>
          </div>

          <div className={styles.line} />

          {/* Sales Conditions */}
          <div className={styles.information}>
            <h3>شرایط فروش</h3>
            <div className={styles.tabs}>
              <button
                onClick={() => setActiveTab('CASH')}
                className={activeTab === 'CASH' ? styles.activeTab : ''}
              >
                فروش نقدی
              </button>
              <button
                onClick={() => setActiveTab('INSTALLMENT')}
                className={activeTab === 'INSTALLMENT' ? styles.activeTab : ''}
              >
                فروش شرایطی
              </button>
            </div>

            {activeTab === 'CASH' && (
              <div className={styles.cashSelector}>
                <p>در حال حاضر در دسترس نیست</p>
              </div>
            )}

            {activeTab === 'INSTALLMENT' && (
              <>
                <div className={styles.festivalSelector}>
                  {car.salesConditions
                    .map((condition) => condition.salesFestival)
                    .filter(
                      (festival, index, self) =>
                        festival && self.findIndex((f) => f.id === festival.id) === index
                    )
                    .map((festival) => (
                      <button
                        key={festival.id}
                        onClick={() => setSelectedFestival(festival.id)}
                        className={selectedFestival === festival.id ? styles.activeButton : ''}
                      >
                        {festival.name}
                      </button>
                    ))}
                </div>

                <div className={styles.installmentSelector}>
                  {Array.from(
                    new Set(
                      car.salesConditions
                        .filter((condition) =>
                          selectedFestival
                            ? condition.salesFestival?.id === selectedFestival
                            : !condition.salesFestival
                        )
                        .map((condition) => condition.totalInstallments)
                    )
                  ).map((months) => (
                    <button
                      key={months}
                      onClick={() => setSelectedInstallment(months)}
                      className={selectedInstallment === months ? styles.activeButton : ''}
                    >
                      {months} ماهه
                    </button>
                  ))}
                </div>

                {selectedInstallment && (
                  <div className={styles.salesConditions}>
                    {filteredConditions(selectedFestival, selectedInstallment).map((condition) => (
                      <div key={condition.id} className={styles.salesBoxing}>
                        <div className={styles.labelSales}>
                          <h5>{condition.name}</h5>
                        </div>
                        <div className={styles.informationGrid}>
                          <li>
                            <span>پرداخت زمان ثبت‌نام</span>
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
                            <span>{condition.deliveryDate || 'مشخص نشده'} روز</span>
                          </li>
                        </div>
                        <div className={styles.buttonsSales}>
                          <button onClick={() => handleShopping(car.name)}>ثبت سفارش</button>
                          <button onClick={() => handleShopping(car.name)}>
                            افزودن به سبد خرید
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.requestSell}>
            <Link href={`/applicant-request`}>درخواست خرید خودرو</Link>
          </div>
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

        <div className={styles.commentsSection}>
          <div className={styles.titleContainer}>
            <h3>نظرات کاربران</h3>
          </div>
          {!user && (
            <div className={styles.userLockBox}>
              <div className={styles.userLock}>لطفا برای نظر دادن ابتدا لاگین کنید</div>
            </div>
          )}
          {user && <CommentForm pageId={car.id} userId={user.id} />}
          <CommentList pageId={car.id} /> {/* نمایش لیست نظرات */}
        </div>
      </div>
    </div>
  )
}

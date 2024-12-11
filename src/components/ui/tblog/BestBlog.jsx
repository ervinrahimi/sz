'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import 'swiper/css'
import './BestBlog.css'

export default function BestBlog() {
  const swiperRef = useRef(null);

  const carReviews = [
    {
      id: 1,
      title: "بررسی کامل MG 5: ارزش خرید بالا",
      category: "نقد و بررسی",
      image: "https://images.netdirector.co.uk/gforces-auto/image/upload/w_392,h_294,dpr_2.0,q_auto,c_fill,f_auto,fl_lossy/auto-client/3f0b87b7b4ad94a30d3922c9cad88baa/image_1_all_new_mg5.jpg"
    },
    {
      id: 2,
      title: "FMC SX5: رقیبی قدرتمند در بازار",
      category: "مقایسه",
      image: "https://www.fardamotors.com/wp-content/uploads/2023/09/FMC-SX5-Slider02.jpg"
    },
    {
      id: 3,
      title: "طراحی نوآورانه FMC",
      category: "طراحی",
      image: "https://asa-group.ir/wp-content/uploads/2024/06/foreign-design-copy.webp"
    },
    {
      id: 4,
      title: "MG GT: اسپرت و کاربردی",
      category: "نقد و بررسی",
      image: "https://www.dubicars.com/images/bf8121/r_960x540/generations/generation_649535588e89a_mg-gt-exterior-front-left-angled.jpg"
    },
    {
      id: 5,
      title: "آینده برقی با MG4 Electric",
      category: "فناوری",
      image: "https://ev-database.org/img/auto/MG_MG4_Electric_2022/MG_MG4_Electric_2022-01@2x.jpg"
    }
  ]

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <section className="best-blog">
      <div className="best-blog__header">
        <h2 className="best-blog__title">بهترین نقد و بررسی‌ها</h2>
      </div>

      <div className="best-blog__slider-container">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="best-blog__swiper"
        >
          {carReviews.map((review) => (
            <SwiperSlide key={review.id}>
              <article className="best-blog__card">
                <div className="best-blog__image-container">
                  <img 
                    src={review.image} 
                    alt={review.title}
                    className="best-blog__image"
                  />
                  <div className="best-blog__overlay">
                    <span className="best-blog__category">{review.category}</span>
                    <h3 className="best-blog__card-title">{review.title}</h3>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="best-blog__navigation">
        <button 
          className="best-blog__nav-button" 
          onClick={handlePrev}
          aria-label="اسلاید قبلی"
        >
          <ArrowRight size={20} />
        </button>
        <button 
          className="best-blog__nav-button" 
          onClick={handleNext}
          aria-label="اسلاید بعدی"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
    </section>
  )
}


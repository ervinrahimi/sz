'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import 'swiper/css'
import styles from './NewsBlog.module.css'

export default function NewsBlog() {
  const swiperRef = useRef(null);

  const carNews = [
    {
      id: 1,
      title: "رونمایی از MG 5 جدید",
      date: "۵ دی ۱۴۰۲",
      views: "1.2K",
      category: "اخبار خودرو",
      image: "https://images.netdirector.co.uk/gforces-auto/image/upload/w_392,h_294,dpr_2.0,q_auto,c_fill,f_auto,fl_lossy/auto-client/3f0b87b7b4ad94a30d3922c9cad88baa/image_1_all_new_mg5.jpg",
      slug: "new-mg-5-reveal",
      author: "نویسنده سایت"
    },
    {
      id: 2,
      title: "معرفی FMC SX5",
      date: "۸ دی ۱۴۰۲",
      views: "980",
      category: "صنعت خودرو",
      image: "https://www.fardamotors.com/wp-content/uploads/2023/09/FMC-SX5-Slider02.jpg",
      slug: "fmc-sx5-introduction",
      author: "نویسنده سایت"
    },
    {
      id: 3,
      title: "طراحی جدید FMC",
      date: "۱۲ دی ۱۴۰۲",
      views: "1.5K",
      category: "طراحی",
      image: "https://asa-group.ir/wp-content/uploads/2024/06/foreign-design-copy.webp",
      slug: "fmc-new-design",
      author: "نویسنده سایت"
    },
    {
      id: 4,
      title: "MG GT: نسل جدید اسپرت",
      date: "۱۵ دی ۱۴۰۲",
      views: "2.1K",
      category: "معرفی",
      image: "https://www.dubicars.com/images/bf8121/r_960x540/generations/generation_649535588e89a_mg-gt-exterior-front-left-angled.jpg",
      slug: "mg-gt-new-generation",
      author: "نویسنده سایت"
    },
    {
      id: 5,
      title: "MG4 Electric: انقلابی در صنعت خودرو",
      date: "۱۸ دی ۱۴۰۲",
      views: "1.8K",
      category: "خودروی برقی",
      image: "https://ev-database.org/img/auto/MG_MG4_Electric_2022/MG_MG4_Electric_2022-01@2x.jpg",
      slug: "mg4-electric-revolution",
      author: "نویسنده سایت"
    }
  ]

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <section className={styles.newsBlog}>
      <h2 className={styles.newsBlogTitle}>اخبار خودرو</h2>
      <div className={styles.newsBlogSliderContainer}>
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          dir="rtl"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className={`${styles.newsBlogSwiper} ${styles.newsBlogSwiperEqualHeight}`}
        >
          {carNews.map((news) => (
            <SwiperSlide key={news.id} className={styles.newsBlogSlide}>
              <article className={`${styles.newsBlogCard} ${styles.newsBlogCardWrapper}`}>
                <div className={styles.newsBlogImageContainer}>
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className={styles.newsBlogImage}
                  />
                </div>
                <div className={styles.newsBlogContent}>
                  <h3 className={styles.newsBlogCardTitle}>{news.title}</h3>
                  <div className={styles.newsBlogMeta}>
                    <span>{news.date}</span>
                    <span className={styles.newsBlogSeparator}>•</span>
                    <span>{news.views} بازدید</span>
                    <span className={styles.newsBlogSeparator}>•</span>
                    <span>{news.category}</span>
                  </div>
                  <div className={styles.newsBlogCardFooter}>
                    <div className={styles.newsBlogAuthor}>{news.author}</div>
                    <button 
                      onClick={() => window.location.href = `/blog/${news.slug}`}
                      className={styles.newsBlogReadMoreButton}
                    >
                      ادامه مطلب
                      <ArrowLeft size={16} />
                    </button>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <button 
          className={`${styles.newsBlogNavButton} ${styles.newsBlogNavButtonNext}`} 
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
        <button 
          className={`${styles.newsBlogNavButton} ${styles.newsBlogNavButtonPrev}`} 
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
    </section>
  )
}

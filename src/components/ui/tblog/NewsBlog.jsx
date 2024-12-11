'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import 'swiper/css'
import './NewsBlog.css'

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
    <section className="news-blog">
      <h2 className="news-blog__title">اخبار خودرو</h2>
      <div className="news-blog__slider-container">
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
          className="news-blog__swiper news-blog__swiper--equal-height"
        >
          {carNews.map((news) => (
            <SwiperSlide key={news.id} className="news-blog__slide">
              <article className="news-blog__card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="news-blog__image-container">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="news-blog__image"
                  />
                </div>
                <div className="news-blog__content" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  flexGrow: 1, 
                  paddingBottom: '20px',
                  minHeight: '200px',
                  maxHeight: '300px',
                  overflow: 'hidden'
                }}>
                  <h3 className="news-blog__card-title" style={{ 
                    marginBottom: '12px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>{news.title}</h3>
                  <div className="news-blog__meta" style={{ 
                    marginBottom: '8px',
                    fontSize: '0.9em'
                  }}>
                    <span>{news.date}</span>
                    <span className="news-blog__separator">•</span>
                    <span>{news.views} بازدید</span>
                    <span className="news-blog__separator">•</span>
                    <span>{news.category}</span>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="news-blog__author">{news.author}</div>
                    <button 
                      onClick={() => window.location.href = `/blog/${news.slug}`}
                      className="news-blog__read-more-button"
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s'
                      }}
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
          className="news-blog__nav-button news-blog__nav-button--next" 
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
        <button 
          className="news-blog__nav-button news-blog__nav-button--prev" 
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
    </section>
  )
}

// Note: Update the CSS file (NewsBlog.css) to include the following styles:
// .news-blog__swiper--equal-height .swiper-slide {
//   height: auto !important;
// }
// 
// .news-blog__swiper--equal-height .news-blog__card {
//   height: 100%;
// }


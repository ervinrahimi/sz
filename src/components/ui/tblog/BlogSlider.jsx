'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './BlogSlider.css'

export default function BlogSlider() {
  const slides = [
    {
      id: 1,
      title: "معرفی MG 5 جدید: ترکیبی از سبک و کارایی",
      description: "MG 5 جدید با طراحی مدرن و امکانات پیشرفته، استانداردهای جدیدی را در کلاس خود تعیین می‌کند. این خودرو با موتور قدرتمند و مصرف سوخت بهینه، گزینه‌ای عالی برای رانندگی در شهر و جاده است.",
      date: "۱۵ آذر ۱۴۰۲",
      author: "توسط علی محمدی",
      image: "https://images.netdirector.co.uk/gforces-auto/image/upload/w_392,h_294,dpr_2.0,q_auto,c_fill,f_auto,fl_lossy/auto-client/3f0b87b7b4ad94a30d3922c9cad88baa/image_1_all_new_mg5.jpg",
      category: "معرفی خودرو"
    },
    {
      id: 2,
      title: "FMC SX5: آینده خودروهای کراس‌اوور",
      description: "FMC با معرفی SX5، استانداردهای جدیدی در بازار کراس‌اوورها تعیین کرده است. این خودرو با طراحی مدرن و امکانات پیشرفته، تجربه‌ای متفاوت را ارائه می‌دهد.",
      date: "۲۰ آذر ۱۴۰۲",
      author: "توسط مریم احمدی",
      image: "https://www.fardamotors.com/wp-content/uploads/2023/09/FMC-SX5-Slider02.jpg",
      category: "فناوری خودرو"
    },
    {
      id: 3,
      title: "MG GT: نسل جدید خودروهای اسپرت",
      description: "MG GT با طراحی خیره‌کننده و عملکرد فنی برجسته، تعریف جدیدی از خودروهای اسپرت ارائه می‌دهد. این خودرو ترکیبی از زیبایی و کارایی است.",
      date: "۲۵ آذر ۱۴۰۲",
      author: "توسط رضا کریمی",
      image: "https://www.dubicars.com/images/bf8121/r_960x540/generations/generation_649535588e89a_mg-gt-exterior-front-left-angled.jpg",
      category: "مقایسه خودرو"
    },
    {
      id: 4,
      title: "MG4 Electric: آینده حمل و نقل پاک",
      description: "MG4 Electric با طراحی آینده‌نگرانه و فناوری پیشرفته برقی، نشان‌دهنده تعهد MG به آینده‌ای پاک‌تر است. این خودرو ترکیبی از کارایی و سازگاری با محیط زیست را ارائه می‌دهد.",
      date: "۳۰ آذر ۱۴۰۲",
      author: "توسط سارا محمودی",
      image: "https://ev-database.org/img/auto/MG_MG4_Electric_2022/MG_MG4_Electric_2022-01@2x.jpg",
      category: "تجربه رانندگی"
    }
  ]

  return (
    <div className="blog-slider">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="blog-slider-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="blog-slider-slide"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="blog-slider-overlay">
                <div className="blog-slider-content">
                  <div className="blog-slider-content-container">
                    <div className="blog-slider-info" style={{ color: 'white' }}>
                      <span className="blog-slider-category" style={{ color: 'white' }}>
                        {slide.category}
                      </span>
                      <h1 className="blog-slider-title" style={{ color: 'white' }}>
                        {slide.title}
                      </h1>
                      <p className="blog-slider-description" style={{ color: 'white' }}>
                        {slide.description}
                      </p>
                      <div className="blog-slider-meta" style={{ color: 'white' }}>
                        {slide.date} — {slide.author}
                      </div>
                      <button className="blog-slider-button" style={{ color: 'white' }}>
                        ادامه مطلب
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}


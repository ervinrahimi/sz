'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import './FeaturedBlog.css'

export default function FeaturedBlog() {
  const blogs = [
    {
      id: 1,
      title: "MG و FMC: آینده صنعت خودرو",
      description: "بررسی جدیدترین مدل‌های MG و FMC و تاثیر آنها بر آینده صنعت خودروسازی. نگاهی به نوآوری‌های تکنولوژیک و طراحی‌های مدرن این دو برند...",
      author: {
        name: "دکتر مهدی رضایی",
        avatar: "https://img.freepik.com/free-photo/handsome-young-cheerful-man-with-arms-crossed_171337-1073.jpg?t=st=1733941677~exp=1733945277~hmac=469d2bed658e413869aa37a41bac85550731c8057304b68569dc15fac4c5a157&w=1380"
      },
      image: "https://www.dubicars.com/images/bf8121/r_960x540/generations/generation_649535588e89a_mg-gt-exterior-front-left-angled.jpg"
    },
    {
      id: 2,
      title: "مقایسه جامع: MG5 در برابر FMC SX5",
      description: "بررسی تخصصی و مقایسه دو خودروی پرطرفدار MG5 و FMC SX5 از نظر طراحی، عملکرد، امکانات و قیمت...",
      author: {
        name: "سارا احمدی",
        avatar: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-thoughtful-stylish-young-woman-smiling-pleased-dreaming-imaging-perfect-plan-have-interesting-idea-thinking-looking-upper-left-corner_1258-59348.jpg?t=st=1733935475~exp=1733939075~hmac=19ed002a4bb41d1d98e78d0edc8fff44737c7602d2472335f913cc9af0a4c518&w=1380"
      },
      image: "https://www.fardamotors.com/wp-content/uploads/2023/09/FMC-SX5-Slider02.jpg"
    },
    {
      id: 3,
      title: "انقلاب برقی: MG4 Electric",
      description: "بررسی عمیق MG4 Electric و نقش آن در آینده حمل و نقل پاک. چگونه این خودرو می‌تواند استانداردهای جدیدی در صنعت خودروهای برقی تعیین کند...",
      author: {
        name: "امیر کریمی",
        avatar: "https://img.freepik.com/free-photo/handsome-young-cheerful-man-with-arms-crossed_171337-1073.jpg?t=st=1733941677~exp=1733945277~hmac=469d2bed658e413869aa37a41bac85550731c8057304b68569dc15fac4c5a157&w=1380"
      },
      image: "https://ev-database.org/img/auto/MG_MG4_Electric_2022/MG_MG4_Electric_2022-01@2x.jpg"
    }
  ]

  return (
    <section className="featured-blog">
      <div className="featured-blog__container">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            bulletClass: 'featured-blog__bullet',
            bulletActiveClass: 'featured-blog__bullet--active',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          className="featured-blog__swiper"
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <article className="featured-blog__card">
                <div className="featured-blog__content-wrapper">
                  <div className="featured-blog__author">
                    <div className="featured-blog__avatar">
                      <Image
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        width={40}
                        height={40}
                      />
                    </div>
                    <span className="featured-blog__author-name">
                      {blog.author.name}
                    </span>
                  </div>
                  <div className="featured-blog__content">
                    <h2 className="featured-blog__title">
                      {blog.title}
                    </h2>
                    <p className="featured-blog__description">
                      {blog.description}
                      <button className="featured-blog__read-more">
                        ادامه مطلب
                      </button>
                    </p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}


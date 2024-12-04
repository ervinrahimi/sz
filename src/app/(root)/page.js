// src/app/page.jsx

import ProductsBox from '@/components/ui/Products/ProductsBox'
import MiniSlider from '@/components/ui/Slider/MiniSlider'
import styles from './page.module.css'
import { WideLightPoster } from '@/components/ui/Posters/Posters'
import { MainSlider } from '@/components/ui/Slider/Slider'
import prisma from '@/db/client'
import BlogBox from '@/components/ui/blog/blog-box/BlogBox'

export default async function Home() {
  // دریافت اسلایدها
  const slidesData = await prisma.slide.findMany({
    orderBy: { order: 'asc' },
  })

  // دریافت بخش‌های کارت باکس به همراه کارت باکس‌ها و خودروها
  const cardBoxSections = await prisma.cardBoxSection.findMany({
    include: {
      cardBoxes: {
        include: {
          car: true,
        },
      },
    },
    orderBy: { order: 'asc' }, // مرتب‌سازی بخش‌ها بر اساس فیلد order
  })

  const articles = [
    {
      id: 0,
      tag: 'جدیدترین',
      className: 'new',
      title: 'بررسی خودرو سوبا ام فور 2024',
      description: 'نقد و بررسی کامل از طراحی، عملکرد و قیمت خودرو سوبا ام فور.',
      author: 'سباستین',
      date: 'همین الان',
      imageUrl: '/blog/1.jpg',
      viewLink: '/blog/detail'
    },
    {
      id: 1,
      tag: 'بررسی',
      className: 'review',
      title: 'خودروهای MG؛ انتخاب جدید بازار ایران',
      description: 'ویژگی‌ها و تفاوت‌های کلیدی بین مدل‌های مختلف MG.',
      author: 'الکساندر',
      date: 'دو روز پیش',
      imageUrl: '/blog/2.jpg',
      viewLink: '/blog/detail'
    },
    {
      id: 2,
      tag: 'راهنما',
      className: 'guide',
      title: 'چگونه بهترین خودرو خانوادگی انتخاب کنیم؟',
      description: 'راهنمای کامل برای خرید خودرو مناسب خانواده.',
      author: 'لیزا',
      date: 'پنج روز پیش',
      imageUrl: '/blog/3.jpg',
      viewLink: '/blog/detail'
    },
    {
      id: 3,
      tag: 'نکات',
      className: 'tips',
      title: 'نکات مهم برای خرید خودرو دست دوم',
      description: 'چگونه خودروی دست دوم با کیفیت بخریم.',
      author: 'جک',
      date: 'یک هفته پیش',
      imageUrl: '/blog/4.jpg',
      viewLink: '/blog/detail'
    },
    {
      id: 4,
      tag: 'فناوری',
      className: 'tech',
      title: 'تاثیر تکنولوژی بر خودروهای امروزی',
      description: 'نقش هوش مصنوعی و تکنولوژی‌های نوین در خودروهای مدرن.',
      author: 'ماریا',
      date: 'دو هفته پیش',
      imageUrl: '/blog/5.jpg',
      viewLink: '/blog/detail'
    },
    {
      id: 5,
      tag: 'تعمیرات',
      className: 'fixing',
      title: 'چگونه خودرو خود را برای زمستان آماده کنیم؟',
      description: 'نکاتی برای تعمیر و نگهداری خودرو در فصل سرما.',
      author: 'جان',
      date: 'سه هفته پیش',
      imageUrl: '/blog/6.jpg',
      viewLink: '/blog/detail'
    },
    {
      id: 6,
      tag: 'فروشگاه',
      className: 'shop',
      title: 'بهترین نمایشگاه‌های خودرو در ایران',
      description: 'راهنمای خرید از معتبرترین نمایشگاه‌ها.',
      author: 'نیکول',
      date: 'یک ماه پیش',
      imageUrl: '/blog/7.jpg',
      viewLink: '/blog/detail'
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <MainSlider slides={slidesData} />

        <BlogBox
          title="مقالات اخیر"
          subTitle="آخرین مطالب درباره خودروها"
          cardBoxes={articles}
        />
        <WideLightPoster />

        {cardBoxSections[0] && (
          <ProductsBox
            key={cardBoxSections[0].id}
            title={cardBoxSections[0].name}
            subTitle={cardBoxSections[0].subtitle}
            cardBoxes={cardBoxSections[0].cardBoxes}
          />
        )}

        <MiniSlider
          images={{ img1: 't5-sharayet.jpg', img2: 'sx5-sharayet.jpg' }}
          titles={{ t1: 'شرایط فروش خودروی ', t1s: 'T5', t2: 'شرایط فروش خودروی ', t2s: 'SX5' }}
          subtitles={{ s1: 'برای مشاهده کلیک کنید', s2: 'برای مشاهده کلیک کنید' }}
          dates={{ d1: 'آبان 1403', d2: 'آبان 1403' }}
          videos={false}
          links={{ l1: '/67307f996a53b993440edc20', l2: '/67307f286a53b993440edc16' }}
        />

        {cardBoxSections[1] && (
          <ProductsBox
            key={cardBoxSections[1].id}
            title={cardBoxSections[1].name}
            subTitle={cardBoxSections[1].subtitle}
            cardBoxes={cardBoxSections[1].cardBoxes}
          />
        )}

        <MiniSlider
          images={{ img1: 'b511-sharayet.jpg', img2: 'suba-sharayet.jpg' }}
          titles={{
            t1: 'شرایط فروش خودروی ',
            t1s: 'B511',
            t2: 'شرایط فروش خودروی ',
            t2s: 'SUBA M4',
          }}
          subtitles={{ s1: 'برای مشاهده کلیک کنید', s2: 'برای مشاهده کلیک کنید' }}
          dates={{ d1: 'آبان 1403', d2: 'آبان 1403' }}
          videos={false}
          links={{ l1: '/67307e9a6a53b993440edc0b', l2: '/6730801a6a53b993440edc2a' }}
        />

        {cardBoxSections[2] && (
          <ProductsBox
            key={cardBoxSections[2].id}
            title={cardBoxSections[2].name}
            subTitle={cardBoxSections[2].subtitle}
            cardBoxes={cardBoxSections[2].cardBoxes}
          />
        )}
      </div>
    </div>
  )
}

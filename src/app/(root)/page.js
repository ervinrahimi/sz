// src/app/page.jsx

import ProductsBox from '@/components/ui/Products/ProductsBox'
import MiniSlider from '@/components/ui/Slider/MiniSlider'
import styles from './page.module.css'
import { WideLightPoster } from '@/components/ui/Posters/Posters'
import { MainSlider } from '@/components/ui/Slider/Slider'
import prisma from '@/db/client'

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

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <MainSlider slides={slidesData} />

        {cardBoxSections[0] && (
          <ProductsBox
            key={cardBoxSections[0].id}
            title={cardBoxSections[0].name}
            subTitle={cardBoxSections[0].subtitle}
            cardBoxes={cardBoxSections[0].cardBoxes}
          />
        )}

        <WideLightPoster />

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

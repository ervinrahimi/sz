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
  })

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <MainSlider slides={slidesData} />

        <WideLightPoster />

        <MiniSlider
          images={{ img1: 't5-sharayet.jpg', img2: 'sx5-sharayet.jpg' }}
          titles={{ t1: 'شرایط فروش خودروی ', t1s: 'T5', t2: 'شرایط فروش خودروی ', t2s: 'SX5' }}
          subtitles={{ s1: 'برای مشاهده کلیک کنید', s2: 'برای مشاهده کلیک کنید' }}
          dates={{ d1: 'آبان 1403', d2: 'آبان 1403' }}
          videos={false}
          links={{ l1: '/t5', l2: '/sx5' }}
        />

        {cardBoxSections && cardBoxSections.map((section) => (
          <ProductsBox
            key={section.id}
            title={section.name}
            subTitle={section.subtitle}
            cardBoxes={section.cardBoxes}
          />
        ))}

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
          links={{ l1: '/b511', l2: '/suba-m4' }}
        />
      </div>
    </div>
  )
}
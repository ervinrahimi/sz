import ProductsBox from '@/components/ui/Products/ProductsBox'
import MiniSlider from '@/components/ui/Slider/MiniSlider'
import styles from './page.module.css'
import { WideLightPoster } from '@/components/ui/Posters/Posters'
import { MainSlider } from '@/components/ui/Slider/Slider'
import { getSlides } from '@/actions/admin/slides'

export default async function Home() {
  const slidesData = await getSlides()

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        <MainSlider slides={slidesData} />

        <ProductsBox title={false} />

        <WideLightPoster />

        <MiniSlider
          images={{ img1: 't5-sharayet.jpg', img2: 'sx5-sharayet.jpg' }}
          titles={{ t1: 'شرایط فروش خودروی ', t1s: 'T5', t2: 'شرایط فروش خودروی ', t2s: 'SX5' }}
          subtitles={{ s1: 'برای مشاهده کلیک کنید', s2: 'برای مشاهده کلیک کنید' }}
          dates={{ d1: 'آبان 1403', d2: 'آبان 1403' }}
          videos={false}
          links={{ l1: '/t5', l2: '/sx5' }}
        />

        <ProductsBox title={'محصولات محبوب'} subTitle={'آخرین محصولات فروشگاه'} />

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

        <ProductsBox title={'قطعات. یدکی'} subTitle={'آخرین محصولات فروشگاه'} />
      </div>
    </div>
  )
}

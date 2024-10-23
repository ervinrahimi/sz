import Image from 'next/image'
import styles from './page.module.css'
import { MainSlider } from '@/components/ui/Slider/Slider'
import ProductsBox from '@/components/ui/Products/ProductsBox'
import { WideLightPoster } from '@/components/ui/Posters/Posters'
import MiniSlider from '@/components/ui/Slider/MiniSlider'

export default function ProductPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <MainSlider />
        <ProductsBox title={false} />

        <WideLightPoster />

        <MiniSlider />

        <ProductsBox title={'محصولات محبوب'} subTitle={'آخرین محصولات فروشگاه'} />

        <MiniSlider />

        <ProductsBox title={'قطعات یدکی'} subTitle={'آخرین محصولات فروشگاه'} />
      </div>
    </div>
  )
}

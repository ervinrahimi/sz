// import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from 'next/font/local'

const yekanBakh = localFont({
  src: '../assets/fonts/YekanBakhFaNum-VF.woff2',
  weight: '100 900', // محدوده وزن فونت
  style: 'normal',
  variable: '--font-yekanBakh',
  display: 'swap', // این ویژگی برای بهبود لودینگ فونت است
})

const kahroba = localFont({
  src: '../assets/fonts/Kahroba-VF[wght,wdth,CNTR].woff2',
  weight: '100 900', // محدوده وزن فونت
  style: 'normal',
  variable: '--font-kahroba',
  display: 'swap', // این ویژگی برای بهبود لودینگ فونت است
})
export { yekanBakh, kahroba }

// bold
// extrude
// light
// normal
// outline

// نازک (Thin) - 100
// بسیار نازک (Extra-Light) - 200
// نازک (Light) - 300
// نرمال (Regular) - 400
// معمولی (Medium) - 500
// نصف‌بلند (Semi-Bold) - 600
// بلند (Bold) - 700
// بسیار بلند (Extra-Bold) - 800
// بسیار بلند (Ultra-Bold) - 900
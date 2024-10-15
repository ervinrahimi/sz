// import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from 'next/font/local'

const yekanBakh = localFont({
  src: '../assets/fonts/YekanBakhFaNum-VF.woff2',
  weight: '100 900', // محدوده وزن فونت
  style: 'normal',
  variable: '--font-yekanBakh',
  display: 'swap', // این ویژگی برای بهبود لودینگ فونت است
  // variable: '--plus-jakarta-sans',
})

const kahroba = localFont({
  src: '../assets/fonts/Kahroba-VF-FD[wght,wdth,CNTR].woff2',
  weight: '100 900', // محدوده وزن فونت
  style: 'normal',
  variable: '--font-kahroba',
  display: 'swap', // این ویژگی برای بهبود لودینگ فونت است
  // variable: '--plus-jakarta-sans-italic',
})

const cairo = localFont({
  src: '../assets/fonts/Cairo-VariableFont_slnt,wght.ttf',
  weight: '100 900', // محدوده وزن فونت
  style: 'normal',
  variable: '--font-cairo',
  display: 'swap', // این ویژگی برای بهبود لودینگ فونت است
  // variable: '--plus-jakarta-sans-italic',
})

// const nuestadt = localFont({
//   src: [
//     {
//       path: '../assets/fonts/Neustadt W00 Light.woff2',
//       variable: '--nuestadt-Light',
//       weight: '300',
//     },
//     {
//       path: '../assets/fonts/Neustadt W00 Regular.woff2',
//       variable: '--nuestadt-Regular',
//       weight: '400',
//     },
//     {
//       path: '../assets/fonts/Neustadt W00 SemiBold.woff2',
//       variable: '--nuestadt-SemiBold',
//       weight: '600',
//     },
//   ],
// })

// export { inter, lora, sourceCodePro400, sourceCodePro700, greatVibes }
export { yekanBakh, kahroba, cairo }

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

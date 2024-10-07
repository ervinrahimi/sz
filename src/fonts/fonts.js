// import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from 'next/font/local'

const plusJakartaSans = localFont({
  src: '../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf',
  // variable: '--plus-jakarta-sans',
})

const plusJakartaSansItalic = localFont({
  src: '../assets/fonts/PlusJakartaSans-Italic-VariableFont_wght.ttf',
  // variable: '--plus-jakarta-sans-italic',
})

const nuestadt = localFont({
  src: [
    {
      path: '../assets/fonts/Neustadt W00 Light.woff2',
      variable: '--nuestadt-Light',
      weight: '300',
    },
    {
      path: '../assets/fonts/Neustadt W00 Regular.woff2',
      variable: '--nuestadt-Regular',
      weight: '400',
    },
    {
      path: '../assets/fonts/Neustadt W00 SemiBold.woff2',
      variable: '--nuestadt-SemiBold',
      weight: '600',
    },
  ],
})

// export { inter, lora, sourceCodePro400, sourceCodePro700, greatVibes }
export { plusJakartaSans, plusJakartaSansItalic, nuestadt }

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
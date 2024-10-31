// User menu items
export const userMenuItems = [
  {
    id: 1,
    title: 'داشبورد',
    icon: '/icons/dashboard/1.png',
    link: '/Dashboard',
  },
  {
    id: 2,
    title: 'اطلاعات شخصی',
    icon: '/icons/dashboard/2.png',
    link: '/Dashboard/Personal-Information',
  },
  {
    id: 3,
    title: 'تغییر رمز عبور',
    icon: '/icons/dashboard/3.png',
    link: '/Dashboard/Change-Password',
  },
  {
    id: 4,
    title: 'مدیریت پرداخت‌ها',
    icon: '/icons/dashboard/4.png',
    hasSubmenu: true,
    submenuIconOpen: '/icons/dashboard/arrow-up.png',
    submenuIconClose: '/icons/dashboard/arrow-down.png',
    submenu: [
      {
        title: 'اقساط',
        icon: '/icons/dashboard/sunMenu-arrow-left.png',
        link: '/Dashboard/Payments/Installment-Management',
      },
      {
        title: 'ودیعه‌ها',
        icon: '/icons/dashboard/sunMenu-arrow-left.png',
        link: '/Dashboard/Payments/Deposits',
        isToast: true,
        toastMessage: 'این امکان به زودی در دسترس قرار می‌گیرد!',
      },
      {
        title: 'سوابق خرید',
        icon: '/icons/dashboard/sunMenu-arrow-left.png',
        link: '/Dashboard/Payments/PurchaseHistory',
        isToast: true,
        toastMessage: 'این امکان به زودی در دسترس قرار می‌گیرد!',
      },
      {
        title: 'مدیریت پرداخت‌های آینده',
        icon: '/icons/dashboard/sunMenu-arrow-left.png',
        link: '/Dashboard/Payments/FuturePayments',
        isToast: true,
        toastMessage: 'این امکان به زودی در دسترس قرار می‌گیرد!',
      },
    ],
  },
  {
    id: 5,
    title: 'اگهی فروش (بزودی)',
    icon: '/icons/dashboard/5.png',
    link: '#',
    isToast: true,
    toastMessage: 'این امکان به زودی در دسترس قرار می‌گیرد!',
  },
  {
    id: 6,
    title: 'اطلاعیه و پیام‌ها',
    icon: '/icons/dashboard/6.png',
    link: '/Dashboard/Notifications',
  },
  {
    id: 7,
    title: 'بازگشت به صفحه اصلی',
    icon: '/icons/dashboard/7.png',
    link: '/',
  },
  {
    id: 8,
    title: 'خروج از حساب',
    icon: '/icons/dashboard/8.png',
    isLogout: true,
  },
]

// Admin menu items
export const usMenuItems = [
  {
    title: 'داشبورد',
    icon: '/icons/dashboard/1.png',
    link: '/Dashboard',
  },
  {
    title: 'اطلاعات شخصی',
    icon: '/icons/dashboard/2.png',
    link: '/Dashboard/Personal-Information',
  },
  {
    title: 'تغییر رمز عبور',
    icon: '/icons/dashboard/3.png',
    link: '/Dashboard/Change-Password',
  },
  {
    title: 'مدیریت پرداخت‌ها',
    icon: '/icons/dashboard/4.png',
    subMenu: [
      {
        title: 'اقساط',
        icon: '/icons/dashboard/sunMenu-arrow-left.png',
        link: '/Dashboard/Payments/Installments',
      },
      {
        title: 'ودیعه‌ها',
        icon: '/icons/dashboard/sunMenu-arrow-left.png',
        link: '/Dashboard/Payments/Deposits',
      },
      {
        title: 'سوابق خرید',
        icon: '/icons/dashboard/sunMenu-arrow-left.png',
        link: '/Dashboard/Payments/PurchaseHistory',
      },
      {
        title: 'مدیریت پرداخت‌های آینده',
        icon: '/icons/dashboard/sunMenu-arrow-left.png',
        link: '/Dashboard/Payments/FuturePayments',
      },
    ],
  },
  {
    title: 'اگهی فروش (بزودی)',
    icon: '/icons/dashboard/5.png',
    link: '#',
    onClick: 'toast', // برای فراخوانی توابع خاص
  },
  {
    title: 'اطلاعیه و پیام‌ها',
    icon: '/icons/dashboard/6.png',
    link: '/Dashboard/Notifications',
  },
  {
    title: 'بازگشت به صفحه اصلی',
    icon: '/icons/dashboard/7.png',
    link: '/',
  },
  {
    title: 'خروج از حساب',
    icon: '/icons/dashboard/8.png',
    onClick: 'signOut', // برای فراخوانی توابع خاص
  },
]

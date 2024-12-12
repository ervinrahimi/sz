
import HeroSection from '@/components/ui/tblog/HeroSection';
import styles from './page.module.css';
import BlogLayout from '@/components/ui/tblog/BlogLayout';
import ArticleDetail from '@/components/ui/blog/article-detail/ArticleDetail';
import { auth } from '@/security/auth';

export default async function Page() {
  const session = await auth()
  const blogContent = {
    title: 'از iPhone OS به iOS تحولی بزرگ در سیستم‌عامل اپل',
    sections: [
      {
        id: 'introduction',
        heading: 'مقدمه',
        content: 'در سال ۲۰۱۰، اپل به‌صورت جدی فرایند مدرن‌سازی سیستم‌عامل آیفون را آغاز کرد. این فرایند به معنای بهبود قابلیت‌ها، بهینه‌سازی عملکرد و افزودن ویژگی‌های جدیدی بود که تجربه‌ی کاربری را ارتقا می‌داد.'
      },
      {
        id: 'ios-4',
        heading: 'معرفی iOS 4',
        content: 'علاوه‌بر افزودن ویژگی‌های جدید، نام جدیدی نیز برای این سیستم‌عامل انتخاب شد: iOS 4. در iOS 4، ویژگی چندکاره به کاربران اجازه می‌داد همزمان، چند برنامه را باز نگه دارند و بین آن‌ها جابجا شوند. اگرچه اندروید سال‌ها بود که از این ویژگی پشتیبانی می‌کرد، اما معتقد بود این قابلیت در اندروید با هزینه‌های زیادی مانند مصرف بیش از حد باتری و کاهش عملکرد دستگاه همراه است. درنتیجه، اپل این قابلیت را با تأخیر، اما بهینه‌تر و کارآمدتر ارائه داد.'
      },
      {
        id: 'ios-5',
        heading: 'تحول با iOS 5',
        content: 'با معرفی iOS 5 در سال ۲۰۱۱، اپل گام بزرگی در جهت استقلال آیفون از کامپیوتر برداشت. این نسخه قابلیت به‌روزرسانی بی‌سیم (OTA) را معرفی کرد که به کاربران اجازه می‌داد بدون نیاز به اتصال به کامپیوتر، سیستم‌عامل خود را به‌روز کنند. همچنین، مرکز اعلان‌ها و سیری، دستیار صوتی هوشمند اپل، در این نسخه معرفی شدند.'
      },
      {
        id: 'ios-6',
        heading: 'تغییرات iOS 6',
        content: 'iOS 6 در سال ۲۰۱۲ با تغییرات قابل توجهی همراه بود. مهم‌ترین تغییر، جایگزینی Google Maps با Apple Maps بود. اگرچه در ابتدا این تغییر با انتقادهایی روبرو شد، اما اپل به سرعت به بهبود سرویس نقشه خود پرداخت. همچنین، این نسخه ادغام عمیق‌تری با Facebook را ارائه داد و قابلیت FaceTime over Cellular را معرفی کرد.'
      },
      {
        id: 'ios-7',
        heading: 'انقلاب طراحی در iOS 7',
        content: 'سال ۲۰۱۳ شاهد تحول بزرگی در طراحی iOS بود. iOS 7 با رهبری جانی آیو، طراحی کاملاً جدیدی را معرفی کرد که از سبک اسکیومورفیک قبلی به سمت طراحی مسطح و مینیمالیستی حرکت کرد. این تغییر شامل آیکون‌های جدید، پالت رنگی روشن‌تر و افکت‌های شفافیت بود. علاوه بر تغییرات ظاهری، قابلیت‌های جدیدی مانند Control Center و AirDrop نیز اضافه شدند.'
      },
      {
        id: 'ios-8-9',
        heading: 'پیشرفت‌های iOS 8 و 9',
        content: 'با گذشت زمان، iOS به تکامل خود ادامه داد. iOS 8 در سال ۲۰۱۴ قابلیت‌های جدیدی مانند پیام‌های صوتی، ویجت‌ها در مرکز اعلان‌ها و قابلیت Handoff برای همگام‌سازی بهتر بین دستگاه‌های اپل را معرفی کرد. iOS 9 در سال ۲۰۱۵ بر بهبود عملکرد و پایداری سیستم تمرکز کرد و قابلیت‌هایی مانند حالت صرفه‌جویی در مصرف باتری و پیش‌بینی‌های هوشمند Siri را اضافه نمود.'
      },
      {
        id: 'ios-today',
        heading: 'iOS امروز',
        content: 'امروزه، با نسخه‌های جدیدتر iOS، شاهد پیشرفت‌های چشمگیری در زمینه‌هایی مانند واقعیت افزوده (AR)، یادگیری ماشین و حریم خصوصی هستیم. اپل همچنان به نوآوری و بهبود تجربه کاربری در iOS ادامه می‌دهد، و هر ساله با معرفی نسخه‌های جدید، قابلیت‌های جذاب و کاربردی را به این سیستم‌عامل محبوب اضافه می‌کند.'
      }
    ]
  };

  return (
    <div className={styles.pageContainer}>
      <HeroSection />
      <BlogLayout>
        <article className={styles.blogPost}>
          <h1 className={styles.title}>{blogContent.title}</h1>
          {blogContent.sections.map((section, index) => (
            <div key={section.id} id={section.id}>
              <h3 className={styles.sectionHeading}>{section.heading}</h3>
              <p className={styles.paragraph}>{section.content}</p>
            </div>
          ))}
          <img 
            src="/placeholder.svg?height=500&width=300" 
            alt="iOS 4 interface" 
            className={styles.image}
          />
        </article>
      </BlogLayout>
    </div>
  );
}


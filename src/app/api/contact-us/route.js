import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const data = await request.json()

    const contactFormSchema = z.object({
      firstName: z.string().min(2, 'نام باید حداقل دو حرف باشد.'),
      lastName: z.string().min(2, 'نام خانوادگی باید حداقل دو حرف باشد.'),
      email: z.string().email('ایمیل معتبر وارد کنید.'),
      phone: z.string().min(10, 'شماره تماس معتبر وارد کنید.'),
      message: z.string().min(10, 'پیام باید حداقل ۱۰ حرف باشد.'),
    })

    const parsedData = contactFormSchema.parse(data)

    // ساخت محتوای ایمیل
    const emailContent = `
      <h2>پیام جدید از فرم تماس با ما</h2>
      <p><strong>نام:</strong> ${parsedData.firstName} ${parsedData.lastName}</p>
      <p><strong>ایمیل:</strong> ${parsedData.email}</p>
      <p><strong>تلفن:</strong> ${parsedData.phone}</p>
      <p><strong>پیام:</strong></p>
      <p>${parsedData.message.replace(/\n/g, '<br>')}</p>
    `

    // ارسال ایمیل به ادمین
    await resend.emails.send({
      from: 'SZ <noreply@soltanzade.com>',
      to: ['karbasi374@gmail.com'], // آدرس ایمیل مقصد
      subject: 'پیام جدید از فرم تماس با ما',
      html: emailContent,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'مشکلی پیش آمده است' }, { status: 500 })
  }
}

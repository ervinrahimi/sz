// app/api/job-application/route.js

import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const data = await request.json()

    const jobApplicationSchema = z.object({
      fullName: z.string().min(2),
      email: z.string().email(),
      phone: z.string().min(10),
      position: z.string().min(1),
      coverLetter: z.string().min(10),
      linkedIn: z.string().url().optional(),
    })

    const parsedData = jobApplicationSchema.parse(data)

    const emailContent = `
      <h2>درخواست استخدام جدید</h2>
      <p><strong>نام:</strong> ${parsedData.fullName}</p>
      <p><strong>ایمیل:</strong> ${parsedData.email}</p>
      <p><strong>تلفن:</strong> ${parsedData.phone}</p>
      <p><strong>موقعیت شغلی:</strong> ${parsedData.position}</p>
      <p><strong>لینکدین:</strong> ${parsedData.linkedIn || 'ندارد'}</p>
      <p><strong>معرفی:</strong></p>
      <p>${parsedData.coverLetter.replace(/\n/g, '<br>')}</p>
    `

    await resend.emails.send({
      from: 'SZ <noreply@soltanzade.com>',
      to: ['clonerfan@gmail.com'],
      subject: 'درخواست استخدام جدید',
      html: emailContent,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'مشکلی پیش آمده است' }, { status: 500 })
  }
}

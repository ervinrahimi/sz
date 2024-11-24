import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: 'ایمیل وارد نشده است' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailContent = `
      <p>ایمیل جدید از خبرنامه:</p>
      <p><strong>ایمیل:</strong> ${email}</p>
    `;

    // ارسال ایمیل با Resend
    await resend.emails.send({
      from: 'SZ <noreply@soltanzade.com>',
      to: ['karbasi374@gmail.com'], // گیرنده ایمیل
      subject: 'اشتراک جدید در خبرنامه',
      html: emailContent,
    });

    return new Response(JSON.stringify({ message: 'ایمیل با موفقیت ارسال شد' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'خطا در ارسال ایمیل' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

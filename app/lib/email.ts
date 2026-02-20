import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text, html }: { to: string; subject: string; text?: string; html?: string }) => {
  const { data, error } = await resend.emails.send({
    from: 'Themis <onboarding@resend.dev>', 
    to,
    subject,
    text: text || "", 
    html: html || "", 
  })

  if (error) {

    console.error("Email failed to send:", error)
    throw new Error("Failed to send email")
    
  }

  return data
};
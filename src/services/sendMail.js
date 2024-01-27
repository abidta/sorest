import nodemailer from 'nodemailer'
import { generateOtp } from '../utils/generateOtp.js'
import { authTemplate } from '../utils/templates.js'

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
  },
})
const mailOptions = async (otp, mail) => {
  return {
    from: 'no-reply@mail.com',
    to: mail,
    subject: 'Otp verification email',
    text: await authTemplate(otp),
  }
}

export const sendOtp = async (email) => {
  const otp = await generateOtp()
  return await transport.sendMail(await mailOptions(otp, email))
}

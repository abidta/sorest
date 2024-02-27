import nodemailer from 'nodemailer'
import { authTemplate } from '../utils/templates.js'
import { generateOtp } from '../utils/generateOtp.js'

const otpStore = {}
const transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure:false,
  priority:'high',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
  },
})
const mailOptions = (otp, mail) => {
  return {
    from: '"Sorest"<no-reply@mail.com>',
    to: mail,
    subject: 'Otp verification email',
    html: authTemplate(otp),
  }
}

const send = async (email) => {
  const otp = await generateOtp()
  otpStore[email] = otp
  return await transport.sendMail(mailOptions(otp, email))
}
const verify = (email, otp) => {
  if (otpStore[email] == otp) {
    return true
  }
  return false
}
export default { send, verify }

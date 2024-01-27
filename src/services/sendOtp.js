import nodemailer from 'nodemailer'

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
let maqilOptions = {
  from: 'sainulabidjalali@gmail.com',
  to: 'sainulabidofficial@gmail.com',
  subject: 'Node mail test',
  text: 'testingggg.....',
}
export const sendMailTest = async () => {
  return await transport.sendMail(maqilOptions)
}

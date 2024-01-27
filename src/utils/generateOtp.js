import crypto from 'crypto'

export const generateOtp = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(3, (err, buff) => {
      if (err) {
        reject(err)
      }
      resolve(parseInt(buff.toString('hex'), 16).toString().substring(0, 6))
    })
  })
}

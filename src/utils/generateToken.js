import jwt from 'jsonwebtoken'
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_secret, { expiresIn: '1h' })
}

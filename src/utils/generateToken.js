import jwt from 'jsonwebtoken'
export const generateToken = (id, role) => {
  console.log(process.env.JWT_SECRET)
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

import jwt from 'jsonwebtoken'
export const generateToken = (id, role, isVerified) => {
  console.log(process.env.JWT_SECRET)
  return jwt.sign({ id, role, isVerified }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
}

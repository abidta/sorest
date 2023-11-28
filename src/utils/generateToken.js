import jwt from 'jsonwebtoken'
export const generateToken =  (userId) => {
    console.log(process.env.JWT_secret,'secret');
  return  jwt.sign({userId}, process.env.JWT_secret,{expiresIn:'1h'})
}

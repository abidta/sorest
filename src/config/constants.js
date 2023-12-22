let TTL_COOKIE = 3600 * 1000

export const tokenDef = Object.freeze({
  user: 'access_token',
  admin: 'admin_token',
  super: 'super_token',
})
export const role = Object.freeze({
  admin: 'admin',
  user: 'user',
  super: 'super',
})
export const cookieOptions={
  maxAge:TTL_COOKIE,
  httpOnly:true,

}

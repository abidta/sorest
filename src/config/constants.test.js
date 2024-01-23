import { describe, expect, it } from 'vitest'
import { roleDef, tokenDef } from './constants'

describe('Constants check', () => {
  it('token def object check', () => {
    expect(tokenDef).toEqual({
      user: 'access_token',
      admin: 'admin_token',
      super: 'super_token',
    })
  })
  it('rol def object check',()=>{
    expect(roleDef).toEqual({
        admin: 'admin',
        user: 'user',
        super: 'super',
    })
  })
})

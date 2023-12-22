import createError from 'http-errors'
import { User, Admin } from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js'

/**
 * @typedef Token
 * @property {string}
 */
/**
 * 
 * @param {*} payload 
 * @param {*} role 
 * 
 */
export const createPerson = async (payload, role) => {}
/**
 *
 * @param {Object} data
 * @param {string} role
 * @returns {Promise<Token>} token
 */
export const loginPerson = async (data, role) => {
  const { email, password } = data
  let Person = role === 'admin' ? Admin : User
  //check person exists
  let person = await Person.exists({ email: email })
  if (!person) {
    //no Person with this email, throw error
    throw createError(401, 'Person not found, check email')
  }
  //email validation success, get Person details for password checking
  let [personData] = await Person.find(Person._id)
  //check password is correct
  let isCorrect = await personData.matchPassword(password)
  if (!isCorrect) {
    //password is not correct throw new error
    throw new createError(401, 'password dosent match, check password')
  }
  let token = generateToken(person._id, personData.role)
  return token
}
export const logoutPerson = (role) => {}

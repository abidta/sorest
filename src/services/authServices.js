import createError from 'http-errors'
import { User, Admin } from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js'

/**
 * @typedef Token
 * @property {string}
 * @typedef Person
 * @property {object}
 */
/**
 *
 * @param {object} payload
 * @param {string} role
 *@returns {Promise<Person>} person
 */
export const createPerson = async (payload, role) => {
  let Person = role === 'admin' ? Admin : User
  const { username, fullName, email, password } = payload
  const isVerified = 'pending'
  //check user exist
  let personExist = await Person.exists({
    $or: [{ username: username }, { email: email }],
  })
  console.log(personExist, 'lok')
  if (personExist) {
    //if a email alredy registered, throw new error
    throw createError(400, 'user already exist')
  }
  // new user, create new doc
  let person = await Person.create({
    username,
    email,
    password,
    fullName,
    role,
    isVerified,
  })
  console.log(person)
  return person
}
/**
 *
 * @param {object} payload
 * @param {string} role
 * @returns {Promise<Token>} token
 */
export const loginPerson = async (payload, role) => {
  const { email, password } = payload
  let Person = role === 'admin' ? Admin : User
  //check person exists
  console.log(email);
  let person = await Person.exists({
    $or: [{ email: email }, { username: email }],
  })
  console.log(person);
  if (!person) {
    //no Person with this email, throw error
    throw createError(401, 'Person not found, check email')
  }
  //email validation success, get Person details for password checking
  let personData = await Person.findById(person._id).select('-posts')
  console.log(personData)
  //check password is correct
  let isCorrect = await personData.matchPassword(password)
  if (!isCorrect) {
    //password is not correct throw new error
    throw new createError(401, 'password dosent match, check password')
  }
  //for deleting password
  personData.set('password')
  let token = generateToken(person._id, personData.role, personData?.isVerified)
  return { token, user: personData }
}

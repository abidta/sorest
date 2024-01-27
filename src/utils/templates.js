

export const authTemplate = async (otp) => {
  return `
  <h2>Otp verification</h2>
  Your one time password is ${otp}`
}

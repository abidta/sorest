/**
 *
 * @class SuccessResponse
 * @constructor
 * @param {string} message
 * @param {object|string} data
 */
export class SuccessResponse {
  constructor(message, data) {
    this.message = message ?? 'Ok'
    this.success = true
    this.data = data ?? {}
    this.error = false
  }
}
export class ErrorResponse {
  /**
   *
   * @param {string} message
   * @param {object} errData
   */
  constructor(message, data = null) {
    this.message = message ?? 'Something went wrong'
    this.success = false
    this.error = true
    this.data = data
  }
}

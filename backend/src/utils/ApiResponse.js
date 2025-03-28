/**
 * API Response Wrapper
 * @param success - boolean flag of success
 * @param status - status code (e.x. 200, 404 etc)
 * @param data - some data
 * @param message - additional message
 */
class ApiResponse {
  constructor(success, status, data, message) {
    this.success = success
    this.status = status
    this.data = data
    this.message = message
  }
}

export { ApiResponse }

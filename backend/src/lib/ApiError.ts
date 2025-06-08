export class ApiError extends Error {
  status: number;
  errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static Unauthorized(message = 'Не авторизован') {
    return new ApiError(401, message);
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new ApiError(400, message, errors);
  }

  static Forbidden(message = 'Нет доступа') {
    return new ApiError(403, message);
  }

  static NotFound(message = 'Не найдено') {
    return new ApiError(404, message);
  }

  static Conflict(message: string) {
    return new ApiError(409, message);
  }

  static Internal(message = 'Внутренняя ошибка сервера') {
    return new ApiError(500, message);
  }
}

/**
 * Database error
 */
class DbError extends Error {
  name = 'DbError';

  /**
   * create error class
   * @param {string} message error message
   */
  constructor(message) {
    super(message);
  }
}

/**
 * http error
 */
class HttpError extends Error {
  name = 'HttpError';
  statusCode;
  cause = null;

  /**
   * create error class
   * @param {string} message error message
   * @param {string} statusCode status code
   * @param {any} cause cause
   */
  constructor(message, statusCode, cause = null) {
    super(message);
    this.statusCode = statusCode;
    this.cause = cause;
  }
}

/**
 * backend error
 */
class BackEndError extends Error {
  name = 'BackEndError';
  statusCode;
  cause = null;

  /**
   * create error class
   * @param {string} statusCode status code
   * @param {any} cause cause
   */
  constructor(statusCode, cause = null) {
    super('back end error');
    this.statusCode = statusCode;
    this.cause = cause;
  }
}

/**
 * frontend error
 */
class FrontEndError extends Error {
  name = 'FrontEndError';
  statusCode;
  cause = null;

  /**
   * create error class
   * @param {string} statusCode status code
   * @param {any} cause cause
   */
  constructor(statusCode, cause = null) {
    super('front end error');
    this.statusCode = statusCode;
    this.cause = cause;
  }
}

/**
 * Web error
 */
class WebError extends Error {
  name = 'WebError';
  cause = null;

  /**
   * create error class
   * @param {string} message error message
   * @param {any} cause cause
   */
  constructor(message, cause) {
    super(message);
    this.cause = cause;
  }
}

export { WebError, DbError, HttpError, BackEndError, FrontEndError };
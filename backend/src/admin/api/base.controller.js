/**
 * Base Controller
 * Base class for RESTful API controllers with common response methods
 */

/**
 * BaseController provides common response methods for API controllers
 */
class BaseController {
  /**
   * Send a success response
   * @param {Object} res - Express response object
   * @param {any} data - Response data
   * @param {number} status - HTTP status code (default: 200)
   */
  sendSuccess(res, data, status = 200) {
    return res.status(status).json({
      success: true,
      data
    });
  }

  /**
   * Send a paginated response
   * @param {Object} res - Express response object
   * @param {Array} data - Data array
   * @param {Object} pagination - Pagination metadata
   * @param {number} status - HTTP status code (default: 200)
   */
  sendPaginated(res, data, pagination, status = 200) {
    return res.status(status).json({
      success: true,
      data,
      pagination
    });
  }

  /**
   * Send an error response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {number} status - HTTP status code (default: 500)
   * @param {Object} errors - Additional error details (optional)
   */
  sendError(res, message, status = 500, errors = null) {
    const response = {
      success: false,
      message
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(status).json(response);
  }

  /**
   * Send a "not found" response
   * @param {Object} res - Express response object
   * @param {string} message - Error message (default: "Resource not found")
   */
  sendNotFound(res, message = 'Resource not found') {
    return this.sendError(res, message, 404);
  }

  /**
   * Send a "bad request" response
   * @param {Object} res - Express response object
   * @param {string} message - Error message (default: "Bad request")
   * @param {Object} errors - Validation errors (optional)
   */
  sendBadRequest(res, message = 'Bad request', errors = null) {
    return this.sendError(res, message, 400, errors);
  }

  /**
   * Send an "unauthorized" response
   * @param {Object} res - Express response object
   * @param {string} message - Error message (default: "Unauthorized")
   */
  sendUnauthorized(res, message = 'Unauthorized') {
    return this.sendError(res, message, 401);
  }
  /**
   * Send a "forbidden" response
   * @param {Object} res - Express response object
   * @param {string} message - Error message (default: "Forbidden")
   */
  sendForbidden(res, message = 'Forbidden') {
    return this.sendError(res, message, 403);
  }

  /**
   * Send a custom response
   * @param {Object} res - Express response object
   * @param {number} status - HTTP status code
   * @param {Object} data - Response data
   */
  sendResponse(res, status, data) {
    return res.status(status).json(data);
  }
}

export default BaseController;
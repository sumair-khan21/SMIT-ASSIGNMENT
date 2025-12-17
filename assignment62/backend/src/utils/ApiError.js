// ═══════════════════════════════════════════════════════════
//                    CUSTOM API ERROR CLASS
//              (Errors ko properly handle karne ke liye)
// ═══════════════════════════════════════════════════════════

class ApiError extends Error {
    
    // ─────────────────────────────────────────────────────────
    // Constructor (jab error create hota hai)
    // ─────────────────────────────────────────────────────────
    constructor(statusCode, message, errors = [], stack = '') {
        super(message);  // Error class ka constructor call karo
        
        this.statusCode = statusCode;  // HTTP status code (400, 404, 500, etc.)
        this.message = message;        // Error message
        this.errors = errors;          // Validation errors (array)
        this.success = false;          // API response mein success: false
        this.data = null;              // No data on error

        // Stack trace (error kahan hua)
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    // ─────────────────────────────────────────────────────────
    // Static Methods (Commonly Used Errors)
    // Yeh methods directly call kar sakte ho
    // ─────────────────────────────────────────────────────────
    
    // 400 - Bad Request (Galat data bheja)
    static badRequest(message = 'Bad Request', errors = []) {
        return new ApiError(400, message, errors);
    }

    // 401 - Unauthorized (Login nahi kiya)
    static unauthorized(message = 'Unauthorized - Please login') {
        return new ApiError(401, message);
    }

    // 403 - Forbidden (Permission nahi hai)
    static forbidden(message = 'Forbidden - You do not have permission') {
        return new ApiError(403, message);
    }

    // 404 - Not Found (Data nahi mila)
    static notFound(message = 'Resource not found') {
        return new ApiError(404, message);
    }

    // 409 - Conflict (Duplicate data)
    static conflict(message = 'Conflict - Resource already exists') {
        return new ApiError(409, message);
    }

    // 429 - Too Many Requests (Rate limit exceed)
    static tooManyRequests(message = 'Too many requests - Please try again later') {
        return new ApiError(429, message);
    }

    // 500 - Internal Server Error
    static internal(message = 'Internal Server Error') {
        return new ApiError(500, message);
    }

    // 400 - Validation Error (Multiple errors)
    static validationError(errors = []) {
        return new ApiError(400, 'Validation Error', errors);
    }
}

// ─────────────────────────────────────────────────────────────
// Export class
// ─────────────────────────────────────────────────────────────
module.exports = ApiError;
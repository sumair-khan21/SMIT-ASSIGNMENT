// ═══════════════════════════════════════════════════════════
//                  STANDARD API RESPONSE CLASS
//          (Success responses ko format karne ke liye)
// ═══════════════════════════════════════════════════════════

class ApiResponse {
    
    // ─────────────────────────────────────────────────────────
    // Constructor
    // ─────────────────────────────────────────────────────────
    constructor(statusCode, message, data = null) {
        this.statusCode = statusCode;       // HTTP status code
        this.success = statusCode < 400;    // true if code is 2xx or 3xx
        this.message = message;             // Success message
        this.data = data;                   // Response data
    }

    // ─────────────────────────────────────────────────────────
    // Static Methods (Commonly Used Success Responses)
    // ─────────────────────────────────────────────────────────
    
    // 200 - OK (General success)
    static success(message = 'Success', data = null) {
        return new ApiResponse(200, message, data);
    }

    // 201 - Created (New resource created)
    static created(message = 'Created successfully', data = null) {
        return new ApiResponse(201, message, data);
    }

    // 204 - No Content (Success but no data to return)
    static noContent(message = 'No content') {
        return new ApiResponse(204, message, null);
    }

    // ─────────────────────────────────────────────────────────
    // Send Response Helper Method
    // Express response object ko directly use karta hai
    // ─────────────────────────────────────────────────────────
    send(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            data: this.data
        });
    }
}

// ─────────────────────────────────────────────────────────────
// Export class
// ─────────────────────────────────────────────────────────────
module.exports = ApiResponse;
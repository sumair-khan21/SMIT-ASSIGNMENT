// ═══════════════════════════════════════════════════════════
//                      HELPER FUNCTIONS
//              (Reusable utility functions)
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// 1. Async Handler
//    Async functions ke errors ko automatically catch karta hai
// ─────────────────────────────────────────────────────────────
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// USE CASE:
// Without asyncHandler:
// exports.getUser = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.params.id);
//         res.json(user);
//     } catch (error) {
//         next(error);  // Har jagah yeh likhna padega
//     }
// };

// With asyncHandler:
// exports.getUser = asyncHandler(async (req, res, next) => {
//     const user = await User.findById(req.params.id);
//     res.json(user);  // Automatic error handling!
// });

// ─────────────────────────────────────────────────────────────
// 2. Clean Object
//    Object se undefined, null, empty values remove karta hai
// ─────────────────────────────────────────────────────────────
const cleanObject = (obj) => {
    const cleaned = {};
    
    Object.keys(obj).forEach(key => {
        if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
            cleaned[key] = obj[key];
        }
    });
    
    return cleaned;
};

// USE CASE:
// const data = { name: 'Ali', age: undefined, email: null, city: '' };
// cleanObject(data);
// Result: { name: 'Ali' }

// ─────────────────────────────────────────────────────────────
// 3. Generate Random String
//    Random string generate karta hai (tokens ke liye)
// ─────────────────────────────────────────────────────────────
const generateRandomString = (length = 32) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }  
    
    return result;
};
// USE CASE:
// const resetToken = generateRandomString(64);
// Result: 'aB3xY9...' (64 characters)

// ─────────────────────────────────────────────────────────────
// 4. Get Pagination
//    Query parameters se pagination calculate karta hai
// ─────────────────────────────────────────────────────────────
const getPagination = (query) => {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
    const skip = (page - 1) * limit;
    
    return { page, limit, skip };
};

// USE CASE:
// GET /api/jobs?page=2&limit=20
// getPagination(req.query);
// Result: { page: 2, limit: 20, skip: 20 }

// ─────────────────────────────────────────────────────────────
// 5. Create Pagination Response
//    Pagination metadata ke saath response banata hai
// ─────────────────────────────────────────────────────────────
const createPaginationResponse = (data, total, page, limit) => {
    return {
        data,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit,
            hasNextPage: page < Math.ceil(total / limit),
            hasPrevPage: page > 1
        }
    };
};

// USE CASE:
// const jobs = await Job.find().skip(skip).limit(limit);
// const total = await Job.countDocuments();
// const response = createPaginationResponse(jobs, total, page, limit);
// Result: {
//   data: [...jobs...],
//   pagination: {
//     currentPage: 2,
//     totalPages: 10,
//     totalItems: 95,
//     itemsPerPage: 10,
//     hasNextPage: true,
//     hasPrevPage: true
//   }
// }

// ─────────────────────────────────────────────────────────────
// 6. Slugify
//    String ko URL-friendly slug mein convert karta hai
// ─────────────────────────────────────────────────────────────
const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Spaces ko - se replace karo
        .replace(/[^\w\-]+/g, '')    // Special characters remove karo
        .replace(/\-\-+/g, '-')      // Multiple - ko single - se replace karo
        .replace(/^-+/, '')          // Start se - remove karo
        .replace(/-+$/, '');         // End se - remove karo
};

// USE CASE:
// slugify('Full Stack Developer @ Google!');
// Result: 'full-stack-developer-google'

// ─────────────────────────────────────────────────────────────
// 7. Calculate Reading Time
//    Text ki reading time calculate karta hai (optional)
// ─────────────────────────────────────────────────────────────
const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
};

// USE CASE:
// const jobDescription = 'Long description...';
// const readTime = calculateReadingTime(jobDescription);
// Result: 5 (minutes)

// ─────────────────────────────────────────────────────────────
// 8. Format Date
//    Date ko readable format mein convert karta hai
// ─────────────────────────────────────────────────────────────
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// USE CASE:
// formatDate(new Date());
// Result: 'December 17, 2024'

// ─────────────────────────────────────────────────────────────
// 9. Time Ago
//    Kitna time pehle hua tha (1 hour ago, 2 days ago)
// ─────────────────────────────────────────────────────────────
const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
};

// USE CASE:
// const jobPostedAt = new Date('2024-12-16');
// timeAgo(jobPostedAt);
// Result: '1 day ago'

// ─────────────────────────────────────────────────────────────
// Export All Functions
// ─────────────────────────────────────────────────────────────
module.exports = {
    // asyncHandler,
    cleanObject,
    generateRandomString,
    getPagination,
    createPaginationResponse,
    slugify,
    calculateReadingTime,
    formatDate,
    timeAgo
};
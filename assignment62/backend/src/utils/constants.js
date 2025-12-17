// ═══════════════════════════════════════════════════════════
//                      APP CONSTANTS
//           (Sare constant values ek jagah)
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// USER ROLES (Admin, Employer, Job Seeker)
// ─────────────────────────────────────────────────────────────
const USER_ROLES = {
    ADMIN: 'admin',
    EMPLOYER: 'employer',
    SEEKER: 'seeker'
};

// Array format (schema mein enum ke liye use hoga)
const USER_ROLES_ARRAY = Object.values(USER_ROLES);
// Result: ['admin', 'employer', 'seeker']

// ─────────────────────────────────────────────────────────────
// GENDER OPTIONS
// ─────────────────────────────────────────────────────────────
const GENDER = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
};

const GENDER_ARRAY = Object.values(GENDER);

// ─────────────────────────────────────────────────────────────
// JOB TYPES (Full-time, Part-time, etc.)
// ─────────────────────────────────────────────────────────────
const JOB_TYPES = {
    FULL_TIME: 'full-time',
    PART_TIME: 'part-time',
    CONTRACT: 'contract',
    INTERNSHIP: 'internship',
    FREELANCE: 'freelance'
};

const JOB_TYPES_ARRAY = Object.values(JOB_TYPES);

// ─────────────────────────────────────────────────────────────
// WORK MODES (Office, Remote, Hybrid)
// ─────────────────────────────────────────────────────────────
const WORK_MODES = {
    ONSITE: 'onsite',
    REMOTE: 'remote',
    HYBRID: 'hybrid'
};

const WORK_MODES_ARRAY = Object.values(WORK_MODES);

// ─────────────────────────────────────────────────────────────
// EXPERIENCE LEVELS
// ─────────────────────────────────────────────────────────────
const EXPERIENCE_LEVELS = {
    ENTRY: 'entry',
    MID: 'mid',
    SENIOR: 'senior',
    LEAD: 'lead',
    EXECUTIVE: 'executive'
};

const EXPERIENCE_LEVELS_ARRAY = Object.values(EXPERIENCE_LEVELS);

// ─────────────────────────────────────────────────────────────
// JOB STATUS
// ─────────────────────────────────────────────────────────────
const JOB_STATUS = {
    DRAFT: 'draft',         // Employer ne save kiya but publish nahi
    ACTIVE: 'active',       // Live job posting
    CLOSED: 'closed',       // Employer ne band kar di
    EXPIRED: 'expired'      // Deadline khatam ho gayi
};

const JOB_STATUS_ARRAY = Object.values(JOB_STATUS);

// ─────────────────────────────────────────────────────────────
// APPLICATION STATUS (Job application ki states)
// ─────────────────────────────────────────────────────────────
const APPLICATION_STATUS = {
    PENDING: 'pending',           // Just applied
    REVIEWED: 'reviewed',         // Employer ne dekha
    SHORTLISTED: 'shortlisted',   // Selected for interview
    INTERVIEWED: 'interviewed',   // Interview ho gaya
    OFFERED: 'offered',           // Job offer mila
    HIRED: 'hired',               // Candidate hire ho gaya
    REJECTED: 'rejected',         // Employer ne reject kiya
    WITHDRAWN: 'withdrawn'        // Candidate ne khud cancel kiya
};

const APPLICATION_STATUS_ARRAY = Object.values(APPLICATION_STATUS);

// ─────────────────────────────────────────────────────────────
// COMPANY SIZES
// ─────────────────────────────────────────────────────────────
const COMPANY_SIZES = {
    STARTUP: '1-10',
    SMALL: '11-50',
    MEDIUM: '51-200',
    LARGE: '201-500',
    ENTERPRISE: '500+'
};

const COMPANY_SIZES_ARRAY = Object.values(COMPANY_SIZES);

// ─────────────────────────────────────────────────────────────
// INDUSTRIES
// ─────────────────────────────────────────────────────────────
const INDUSTRIES = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'E-commerce',
    'Manufacturing',
    'Retail',
    'Media',
    'Telecommunications',
    'Real Estate',
    'Consulting',
    'Marketing',
    'Agriculture',
    'Construction',
    'Hospitality',
    'Transportation',
    'Energy',
    'Legal',
    'Government',
    'Non-Profit',
    'Other'
];

// ─────────────────────────────────────────────────────────────
// CURRENCIES
// ─────────────────────────────────────────────────────────────
const CURRENCIES = ['PKR', 'USD', 'EUR', 'GBP', 'AED', 'SAR'];

// ─────────────────────────────────────────────────────────────
// VALIDATION LIMITS (Min/Max values)
// ─────────────────────────────────────────────────────────────
const VALIDATION = {
    // Name validation
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
    
    // Password validation
    PASSWORD_MIN_LENGTH: 8,
    
    // Text field limits
    BIO_MAX_LENGTH: 500,
    DESCRIPTION_MAX_LENGTH: 5000,
    
    // Array limits
    SKILLS_MAX_COUNT: 20,
    
    // Age limits
    MIN_AGE: 16,
    MAX_AGE: 100,
    
    // Salary limits
    MIN_SALARY: 0,
    MAX_SALARY: 100000000,
    
    // Other limits
    MAX_IMAGES: 5,
    MAX_EXPERIENCE_YEARS: 50,
    MAX_EDUCATION_ENTRIES: 10
};

// ─────────────────────────────────────────────────────────────
// EXPORT ALL CONSTANTS
// ─────────────────────────────────────────────────────────────
module.exports = {
    USER_ROLES,
    USER_ROLES_ARRAY,
    GENDER,
    GENDER_ARRAY,
    JOB_TYPES,
    JOB_TYPES_ARRAY,
    WORK_MODES,
    WORK_MODES_ARRAY,
    EXPERIENCE_LEVELS,
    EXPERIENCE_LEVELS_ARRAY,
    JOB_STATUS,
    JOB_STATUS_ARRAY,
    APPLICATION_STATUS,
    APPLICATION_STATUS_ARRAY,
    COMPANY_SIZES,
    COMPANY_SIZES_ARRAY,
    INDUSTRIES,
    CURRENCIES,
    VALIDATION
};
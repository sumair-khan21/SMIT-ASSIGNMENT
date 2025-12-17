// ═══════════════════════════════════════════════════════════
//                   APP CONFIGURATION
//        (.env file se values load karke export karte hain)
// ═══════════════════════════════════════════════════════════

// Pehle dotenv load karo (taake process.env use kar sakein)
require('dotenv').config();

// ─────────────────────────────────────────────────────────────
// Configuration Object
// ─────────────────────────────────────────────────────────────
const config = {
    
    // Server settings
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // Database settings
    mongodbUri: process.env.MONGODB_URI,
    
    // JWT settings
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE || '7d',
    jwtCookieExpire: parseInt(process.env.JWT_COOKIE_EXPIRE) || 7,
    
    // Bcrypt settings
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12,
    
    // Admin default credentials
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
};

// ─────────────────────────────────────────────────────────────
// Validate Required Configuration
// Yeh check karta hai ke zaruri values .env mein hain ya nahi
// ─────────────────────────────────────────────────────────────
const requiredConfigs = ['mongodbUri', 'jwtSecret'];

for (const key of requiredConfigs) {
    if (!config[key]) {
        throw new Error(`Missing required environment variable: ${key.toUpperCase()}`);
    }
}

// ─────────────────────────────────────────────────────────────
// Export configuration object
// ─────────────────────────────────────────────────────────────
module.exports = config;
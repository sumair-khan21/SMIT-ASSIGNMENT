// ═══════════════════════════════════════════════════════════
//                      SERVER ENTRY POINT
//              (Application yahan se start hoti hai)
// ═══════════════════════════════════════════════════════════

const app = require('./app');
const config = require('./config/config');
const connectDB = require('./config/db');

// ═══════════════════════════════════════════════════════════
//                  UNCAUGHT EXCEPTION HANDLER
//              (Synchronous errors jo catch nahi hue)
// ═══════════════════════════════════════════════════════════

process.on('uncaughtException', (err) => {
    console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    console.error('Stack:', err.stack);
    process.exit(1);  // Exit immediately
});

// ═══════════════════════════════════════════════════════════
//                      START SERVER
// ═══════════════════════════════════════════════════════════

const startServer = async () => {
    try {
        // ─────────────────────────────────────────────────────
        // Step 1: Connect to Database
        // ─────────────────────────────────────────────────────
        await connectDB();

        // ─────────────────────────────────────────────────────
        // Step 2: Start Express Server
        // ─────────────────────────────────────────────────────
        const server = app.listen(config.port, () => {
            console.log(` Server running in ${config.nodeEnv} mode on port ${config.port}`);
        });

        // ─────────────────────────────────────────────────────
        // UNHANDLED PROMISE REJECTION
        // Async errors jo catch nahi hue
        // ─────────────────────────────────────────────────────
        process.on('unhandledRejection', (err) => {
            console.error('💥 UNHANDLED REJECTION! Shutting down gracefully...');
            console.error('Error Name:', err.name);
            console.error('Error Message:', err.message);
            
            // Server band karo phir exit karo
            server.close(() => {
                console.log('Server closed');
                process.exit(1);
            });
        });

        // ─────────────────────────────────────────────────────
        // SIGTERM SIGNAL
        // Jab hosting provider server band kare (Heroku, Railway, etc.)
        // ─────────────────────────────────────────────────────
        process.on('SIGTERM', () => {
            console.log('👋 SIGTERM received. Shutting down gracefully...');
            
            server.close(() => {
                console.log('Server closed gracefully');
                process.exit(0);
            });
        });

        // ─────────────────────────────────────────────────────
        // SIGINT SIGNAL (Ctrl+C)
        // Development mein jab Ctrl+C press karo
        // ─────────────────────────────────────────────────────
        process.on('SIGINT', () => {
            console.log('\n👋 SIGINT received. Shutting down gracefully...');
            
            server.close(() => {
                console.log('Server closed gracefully');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

// ═══════════════════════════════════════════════════════════
//                      RUN SERVER
// ═══════════════════════════════════════════════════════════

startServer();


// ... baqi code ke niche
startServer();

// Vercel ke liye export lazmi hai
module.exports = app;
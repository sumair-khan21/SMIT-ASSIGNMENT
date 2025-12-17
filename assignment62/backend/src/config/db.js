// ═══════════════════════════════════════════════════════════
//                   DATABASE CONNECTION
//              (MongoDB se connect karne ke liye)
// ═══════════════════════════════════════════════════════════

const mongoose = require('mongoose');
const config = require('./config');

// ─────────────────────────────────────────────────────────────
// Connect to MongoDB Database
// ─────────────────────────────────────────────────────────────
const connectDB = async () => {
    try {
        // Connection options
        const options = {
            maxPoolSize: 10,              // Maximum 10 connections at a time
            serverSelectionTimeoutMS: 5000,  // 5 seconds timeout
            socketTimeoutMS: 45000,       // Close sockets after 45 seconds
        };

        // MongoDB se connect karo
        const conn = await mongoose.connect(config.mongodbUri, options);

        // Success message
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📁 Database Name: ${conn.connection.name}`);

        // ─────────────────────────────────────────────────────────
        // Connection Events (Optional but useful)
        // ─────────────────────────────────────────────────────────
        
        // Jab connection error aaye
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err.message);
        });

        // Jab MongoDB disconnect ho jaye
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB disconnected');
        });

        // ─────────────────────────────────────────────────────────
        // Graceful Shutdown
        // Jab server band ho, toh database connection bhi band karo
        // ─────────────────────────────────────────────────────────
        
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });

    } catch (error) {
        // Agar connection fail ho jaye
        console.error('❌ MongoDB Connection Failed:', error.message);
        process.exit(1);  // Exit the application
    }
};

// ─────────────────────────────────────────────────────────────
// Export function
// ─────────────────────────────────────────────────────────────
module.exports = connectDB;
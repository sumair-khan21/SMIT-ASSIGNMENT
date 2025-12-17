const config = require('./src/config/config');

console.log('📋 Configuration Loaded:');
console.log('Port:', config.port);
console.log('Environment:', config.nodeEnv);
console.log('MongoDB URI:', config.mongodbUri ? '✅ Set' : '❌ Missing');
console.log('JWT Secret:', config.jwtSecret ? '✅ Set' : '❌ Missing');
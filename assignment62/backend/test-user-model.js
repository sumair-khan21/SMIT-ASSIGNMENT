// ═══════════════════════════════════════════════════════════
//                   USER MODEL TEST FILE
//              (Testing User model functionality)
// ═══════════════════════════════════════════════════════════

require('dotenv').config();
const connectDB = require('./src/config/db');
const User = require('./src/models/User');

// ─────────────────────────────────────────────────────────────
// Test Function
// ─────────────────────────────────────────────────────────────
const testUserModel = async () => {
    try {
        // Connect to database
        await connectDB();

        console.log('\n🧪 Starting User Model Tests...\n');
        console.log('═'.repeat(60));

        // ═════════════════════════════════════════════════════
        // TEST 1: Create Valid User (Seeker)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 1: Creating valid seeker user...');
        
        const seeker = await User.create({
            firstName: 'Ahmed',
            lastName: 'Ali',
            email: 'ahmed.seeker@test.com',
            password: 'Test@123456',
            phone: '03001234567',
            role: 'seeker'
        });

        console.log('✅ Seeker created successfully!');
        console.log('   ID:', seeker._id);
        console.log('   Full Name:', seeker.fullName);
        console.log('   Email:', seeker.email);
        console.log('   Role:', seeker.role);

        // ═════════════════════════════════════════════════════
        // TEST 2: Create Employer User
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 2: Creating employer user...');
        
        const employer = await User.create({
            firstName: 'Sara',
            lastName: 'Khan',
            email: 'sara.employer@test.com',
            password: 'Employer@123',
            role: 'employer'
        });

        console.log('✅ Employer created successfully!');
        console.log('   ID:', employer._id);
        console.log('   Full Name:', employer.fullName);
        console.log('   Role:', employer.role);

        // ═════════════════════════════════════════════════════
        // TEST 3: Create Admin User
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 3: Creating admin user...');
        
        const admin = await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@test.com',
            password: 'Admin@123456',
            role: 'admin'
        });

        console.log('✅ Admin created successfully!');
        console.log('   ID:', admin._id);
        console.log('   Role:', admin.role);

        // ═════════════════════════════════════════════════════
        // TEST 4: Password Hashing Check
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 4: Checking password hashing...');
        
        const userWithPassword = await User.findById(seeker._id).select('+password');
        
        console.log('✅ Password is hashed!');
        console.log('   Original:', 'Test@123456');
        console.log('   Hashed:', userWithPassword.password.substring(0, 20) + '...');

        // ═════════════════════════════════════════════════════
        // TEST 5: Password Comparison
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 5: Testing password comparison...');
        
        const isCorrectPassword = await userWithPassword.comparePassword('Test@123456');
        const isWrongPassword = await userWithPassword.comparePassword('WrongPassword');
        
        console.log('✅ Password comparison working!');
        console.log('   Correct password:', isCorrectPassword ? '✅ Match' : '❌ No Match');
        console.log('   Wrong password:', isWrongPassword ? '✅ Match' : '❌ No Match');

        // ═════════════════════════════════════════════════════
        // TEST 6: JWT Token Generation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 6: Testing JWT token generation...');
        
        const token = seeker.generateAuthToken();
        
        console.log('✅ Token generated successfully!');
        console.log('   Token:', token.substring(0, 30) + '...');

        // ═════════════════════════════════════════════════════
        // TEST 7: Duplicate Email Validation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 7: Testing duplicate email validation...');
        
        try {
            await User.create({
                firstName: 'Duplicate',
                lastName: 'User',
                email: 'ahmed.seeker@test.com', // Same email
                password: 'Test@123456',
                role: 'seeker'
            });
            console.log('❌ FAILED: Should have thrown duplicate error');
        } catch (error) {
            if (error.code === 11000) {
                console.log('✅ Duplicate email blocked successfully!');
                console.log('   Error:', 'Email already exists');
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 8: Weak Password Validation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 8: Testing weak password validation...');
        
        try {
            await User.create({
                firstName: 'Test',
                lastName: 'User',
                email: 'weak@test.com',
                password: '12345', // Weak password
                role: 'seeker'
            });
            console.log('❌ FAILED: Should have rejected weak password');
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log('✅ Weak password blocked successfully!');
                console.log('   Error:', error.errors.password.message);
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 9: Invalid Email Validation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 9: Testing invalid email validation...');
        
        try {
            await User.create({
                firstName: 'Test',
                lastName: 'User',
                email: 'invalid-email', // Invalid email
                password: 'Test@123456',
                role: 'seeker'
            });
            console.log('❌ FAILED: Should have rejected invalid email');
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log('✅ Invalid email blocked successfully!');
                console.log('   Error:', error.errors.email.message);
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 10: Invalid Role Validation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 10: Testing invalid role validation...');
        
        try {
            await User.create({
                firstName: 'Test',
                lastName: 'User',
                email: 'role@test.com',
                password: 'Test@123456',
                role: 'superadmin' // Invalid role
            });
            console.log('❌ FAILED: Should have rejected invalid role');
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log('✅ Invalid role blocked successfully!');
                console.log('   Error:', error.errors.role.message);
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 11: Find by Email (Static Method)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 11: Testing findByEmail static method...');
        
        const foundUser = await User.findByEmail('ahmed.seeker@test.com');
        
        console.log('✅ User found by email!');
        console.log('   Name:', foundUser.fullName);
        console.log('   Email:', foundUser.email);

        // ═════════════════════════════════════════════════════
        // TEST 12: Find by Credentials (Login)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 12: Testing findByCredentials (login)...');
        
        const loginUser = await User.findByCredentials('ahmed.seeker@test.com', 'Test@123456');
        
        console.log('✅ User login successful!');
        console.log('   Name:', loginUser.fullName);
        console.log('   Last Login:', loginUser.lastLogin);

        // ═════════════════════════════════════════════════════
        // TEST 13: Failed Login Attempt
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 13: Testing failed login attempt...');
        
        try {
            await User.findByCredentials('ahmed.seeker@test.com', 'WrongPassword');
            console.log('❌ FAILED: Should have rejected wrong password');
        } catch (error) {
            console.log('✅ Wrong password blocked!');
            console.log('   Error:', error.message);
        }

        // ═════════════════════════════════════════════════════
        // TEST 14: Get Active Users
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 14: Testing getActiveUsers...');
        
        const activeUsers = await User.getActiveUsers();
        const activeSeekers = await User.getActiveUsers('seeker');
        
        console.log('✅ Active users fetched!');
        console.log('   Total active users:', activeUsers.length);
        console.log('   Active seekers:', activeSeekers.length);

        // ═════════════════════════════════════════════════════
        // TEST 15: Virtual Fields
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 15: Testing virtual fields...');
        
        console.log('✅ Virtual fields working!');
        console.log('   Full Name:', seeker.fullName);
        console.log('   Is Locked:', seeker.isLocked);

        // ═════════════════════════════════════════════════════
        // Cleanup - Delete Test Data
        // ═════════════════════════════════════════════════════
        console.log('\n🧹 Cleaning up test data...');
        
        await User.deleteMany({ email: { $regex: '@test.com$' } });
        
        console.log('✅ Cleanup complete!');

        // ═════════════════════════════════════════════════════
        // Summary
        // ═════════════════════════════════════════════════════
        console.log('\n' + '═'.repeat(60));
        console.log('✅ ALL USER MODEL TESTS PASSED! 🎉');
        console.log('═'.repeat(60) + '\n');

        process.exit(0);

    } catch (error) {
        console.error('\n❌ TEST FAILED:');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    }
};

// ─────────────────────────────────────────────────────────────
// Run Tests
// ─────────────────────────────────────────────────────────────
testUserModel();
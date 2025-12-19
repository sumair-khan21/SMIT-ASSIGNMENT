// ═══════════════════════════════════════════════════════════
//            EMPLOYER PROFILE MODEL TEST FILE
//        (Testing EmployerProfile model functionality)
// ═══════════════════════════════════════════════════════════

require('dotenv').config();
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const EmployerProfile = require('./src/models/EmployerProfile');

// ─────────────────────────────────────────────────────────────
// Test Function
// ─────────────────────────────────────────────────────────────
const testEmployerProfile = async () => {
    try {
        // Connect to database
        await connectDB();

        console.log('\n🧪 Starting EmployerProfile Model Tests...\n');
        console.log('═'.repeat(60));

        // ═════════════════════════════════════════════════════
        // SETUP: Create test users first
        // ═════════════════════════════════════════════════════
        console.log('\n⚙️  SETUP: Creating test users...');
        
        const employer1 = await User.create({
            firstName: 'Tech',
            lastName: 'Company',
            email: 'employer1@test.com',
            password: 'Test@123456',
            role: 'employer'
        });

        const employer2 = await User.create({
            firstName: 'Startup',
            lastName: 'Inc',
            email: 'employer2@test.com',
            password: 'Test@123456',
            role: 'employer'
        });

        const adminUser = await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@test.com',
            password: 'Admin@123456',
            role: 'admin'
        });

        console.log('✅ Test users created!');
        console.log('   Employer 1:', employer1._id);
        console.log('   Employer 2:', employer2._id);
        console.log('   Admin:', adminUser._id);

        // ═════════════════════════════════════════════════════
        // TEST 1: Create Basic Employer Profile
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 1: Creating basic employer profile...');
        
        const basicProfile = await EmployerProfile.create({
            userId: employer1._id,
            companyName: 'Tech Solutions Ltd',
            industry: 'Technology',
            companySize: '11-50'
        });

        console.log('✅ Basic profile created!');
        console.log('   Profile ID:', basicProfile._id);
        console.log('   Company Name:', basicProfile.companyName);
        console.log('   Industry:', basicProfile.industry);
        console.log('   Profile Completeness:', basicProfile.profileCompleteness + '%');

        // ═════════════════════════════════════════════════════
        // TEST 2: Create Complete Employer Profile
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 2: Creating complete employer profile...');
        
        const completeProfile = await EmployerProfile.create({
            userId: employer2._id,
            companyName: 'Innovative Systems Pvt Ltd',
            companyLogo: 'https://example.com/logo.png',
            companyWebsite: 'https://innovativesystems.com',
            industry: 'Technology',
            companySize: '51-200',
            foundedYear: 2015,
            description: 'A leading technology company specializing in software development and IT solutions. We build innovative products for clients worldwide.',
            
            headquarters: {
                city: 'Karachi',
                country: 'Pakistan',
                address: 'DHA Phase 5, Karachi'
            },
            
            socialLinks: {
                linkedin: 'https://linkedin.com/company/innovative-systems',
                twitter: 'https://twitter.com/innovativesys',
                facebook: 'https://facebook.com/innovativesystems'
            }
        });

        console.log('✅ Complete profile created!');
        console.log('   Company Name:', completeProfile.companyName);
        console.log('   Founded Year:', completeProfile.foundedYear);
        console.log('   Company Age:', completeProfile.companyAge, 'years');
        console.log('   Profile Completeness:', completeProfile.profileCompleteness + '%');
        console.log('   Verified:', completeProfile.isVerified ? '✅' : '❌');

        // ═════════════════════════════════════════════════════
        // TEST 3: Populate User Data
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 3: Testing populate (user data)...');
        
        const populatedProfile = await EmployerProfile.findById(basicProfile._id)
            .populate('userId', 'firstName lastName email');
        
        console.log('✅ Populate working!');
        console.log('   User Name:', populatedProfile.userId.firstName + ' ' + populatedProfile.userId.lastName);
        console.log('   User Email:', populatedProfile.userId.email);

        // ═════════════════════════════════════════════════════
        // TEST 4: Company Verification (Admin Feature)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 4: Testing company verification...');
        
        console.log('   Before verification:', completeProfile.isVerified);
        
        await completeProfile.verifyCompany(adminUser._id);
        
        const verifiedProfile = await EmployerProfile.findById(completeProfile._id)
            .populate('verifiedBy', 'firstName lastName');
        
        console.log('✅ Company verified!');
        console.log('   Is Verified:', verifiedProfile.isVerified);
        console.log('   Verified At:', verifiedProfile.verifiedAt);
        console.log('   Verified By:', verifiedProfile.verifiedBy.fullName);

        // ═════════════════════════════════════════════════════
        // TEST 5: Unverify Company
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 5: Testing company unverification...');
        
        await verifiedProfile.unverifyCompany();
        
        const unverifedProfile = await EmployerProfile.findById(completeProfile._id);
        
        console.log('✅ Company unverified!');
        console.log('   Is Verified:', unverifedProfile.isVerified);
        console.log('   Verified At:', unverifedProfile.verifiedAt);

        // Re-verify for next tests
        await unverifedProfile.verifyCompany(adminUser._id);

        // ═════════════════════════════════════════════════════
        // TEST 6: Find by User ID (Static Method)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 6: Testing findByUserId...');
        
        const foundProfile = await EmployerProfile.findByUserId(employer1._id);
        
        console.log('✅ findByUserId working!');
        console.log('   Found Company:', foundProfile.companyName);
        console.log('   User Name:', foundProfile.userId.fullName);

        // ═════════════════════════════════════════════════════
        // TEST 7: Find Verified Companies
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 7: Testing findVerified...');
        
        const verifiedCompanies = await EmployerProfile.findVerified();
        
        console.log('✅ findVerified working!');
        console.log('   Verified Companies:', verifiedCompanies.length);
        verifiedCompanies.forEach(profile => {
            console.log('   -', profile.companyName);
        });

        // ═════════════════════════════════════════════════════
        // TEST 8: Search by Industry
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 8: Testing searchByIndustry...');
        
        const techCompanies = await EmployerProfile.searchByIndustry('Technology');
        
        console.log('✅ searchByIndustry working!');
        console.log('   Technology Companies:', techCompanies.length);
        techCompanies.forEach(profile => {
            console.log('   -', profile.companyName);
        });

        // ═════════════════════════════════════════════════════
        // TEST 9: Find by Location
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 9: Testing findByLocation...');
        
        const karachiCompanies = await EmployerProfile.findByLocation('Karachi');
        
        console.log('✅ findByLocation working!');
        console.log('   Companies in Karachi:', karachiCompanies.length);

        // ═════════════════════════════════════════════════════
        // TEST 10: Get Pending Verifications (Admin Feature)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 10: Testing getPendingVerifications...');
        
        // Create unverified profile
        const employer3 = await User.create({
            firstName: 'New',
            lastName: 'Company',
            email: 'employer3@test.com',
            password: 'Test@123456',
            role: 'employer'
        });

        await EmployerProfile.create({
            userId: employer3._id,
            companyName: 'New Startup Ltd',
            industry: 'Finance'
        });

        const pendingVerifications = await EmployerProfile.getPendingVerifications();
        
        console.log('✅ getPendingVerifications working!');
        console.log('   Pending Verifications:', pendingVerifications.length);
        pendingVerifications.forEach(profile => {
            console.log('   -', profile.companyName, '(Created:', profile.userId.createdAt.toLocaleDateString() + ')');
        });

        // ═════════════════════════════════════════════════════
        // TEST 11: Duplicate Profile Prevention
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 11: Testing duplicate profile prevention...');
        
        try {
            await EmployerProfile.create({
                userId: employer1._id,  // Same user
                companyName: 'Another Company'
            });
            console.log('❌ FAILED: Should have prevented duplicate profile');
        } catch (error) {
            if (error.code === 11000) {
                console.log('✅ Duplicate profile blocked!');
                console.log('   Error: User already has a company profile');
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 12: Invalid URL Validation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 12: Testing invalid URL validation...');
        
        try {
            const tempUser = await User.create({
                firstName: 'Temp',
                lastName: 'User',
                email: 'temp@test.com',
                password: 'Test@123456',
                role: 'employer'
            });

            await EmployerProfile.create({
                userId: tempUser._id,
                companyName: 'Test Company',
                companyWebsite: 'not-a-valid-url'
            });
            console.log('❌ FAILED: Should have rejected invalid URL');
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log('✅ Invalid URL blocked!');
                console.log('   Error:', error.errors.companyWebsite.message);
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 13: Invalid Industry Validation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 13: Testing invalid industry validation...');
        
        try {
            const tempUser2 = await User.create({
                firstName: 'Temp2',
                lastName: 'User',
                email: 'temp2@test.com',
                password: 'Test@123456',
                role: 'employer'
            });

            await EmployerProfile.create({
                userId: tempUser2._id,
                companyName: 'Test Company',
                industry: 'InvalidIndustry'
            });
            console.log('❌ FAILED: Should have rejected invalid industry');
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log('✅ Invalid industry blocked!');
                console.log('   Error:', error.errors.industry.message);
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 14: Company Age Virtual Field
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 14: Testing companyAge virtual field...');
        
        const ageTestProfile = await EmployerProfile.findById(completeProfile._id);
        
        console.log('✅ Virtual field working!');
        console.log('   Founded Year:', ageTestProfile.foundedYear);
        console.log('   Company Age:', ageTestProfile.companyAge, 'years');
        console.log('   Current Year:', new Date().getFullYear());

        // ═════════════════════════════════════════════════════
        // TEST 15: Profile Completeness Calculation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 15: Testing profile completeness...');
        
        const minimalUser = await User.create({
            firstName: 'Minimal',
            lastName: 'Company',
            email: 'minimal@test.com',
            password: 'Test@123456',
            role: 'employer'
        });

        const minimalProfile = await EmployerProfile.create({
            userId: minimalUser._id,
            companyName: 'Minimal Company'
        });

        console.log('✅ Profile completeness calculated!');
        console.log('   Minimal Profile:', minimalProfile.profileCompleteness + '%');
        console.log('   Basic Profile:', basicProfile.profileCompleteness + '%');
        console.log('   Complete Profile:', completeProfile.profileCompleteness + '%');

        // ═════════════════════════════════════════════════════
        // Cleanup - Delete Test Data
        // ═════════════════════════════════════════════════════
        console.log('\n🧹 Cleaning up test data...');
        
        await EmployerProfile.deleteMany({});
        await User.deleteMany({ email: { $regex: '@test.com$' } });
        
        console.log('✅ Cleanup complete!');

        // ═════════════════════════════════════════════════════
        // Summary
        // ═════════════════════════════════════════════════════
        console.log('\n' + '═'.repeat(60));
        console.log('✅ ALL EMPLOYER PROFILE MODEL TESTS PASSED! 🎉');
        console.log('═'.repeat(60) + '\n');

        process.exit(0);

    } catch (error) {
        console.error('\n❌ TEST FAILED:');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        if (error.errors) {
            console.error('Validation Errors:', error.errors);
        }
        console.error('Stack:', error.stack);
        process.exit(1);
    }
};

// ─────────────────────────────────────────────────────────────
// Run Tests
// ─────────────────────────────────────────────────────────────
testEmployerProfile();
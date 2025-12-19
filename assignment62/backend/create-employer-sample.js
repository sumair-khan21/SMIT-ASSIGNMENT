require('dotenv').config();
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const EmployerProfile = require('./src/models/EmployerProfile');

const createEmployerSamples = async () => {
    try {
        await connectDB();

        console.log('\n📝 Creating Employer Sample Data...\n');

        // ═════════════════════════════════════════════════════
        // Sample 1: Tech Company
        // ═════════════════════════════════════════════════════
        const employer1 = await User.create({
            firstName: 'Tech',
            lastName: 'Solutions',
            email: 'hr@techsolutions.com',
            password: 'Tech@123456',
            phone: '03001234567',
            role: 'employer'
        });

        const profile1 = await EmployerProfile.create({
            userId: employer1._id,
            companyName: 'Tech Solutions Pakistan',
            companyLogo: 'https://via.placeholder.com/200x200?text=Tech+Solutions',
            companyWebsite: 'https://techsolutions.com',
            industry: 'Technology',
            companySize: '51-200',
            foundedYear: 2015,
            description: 'Leading software development company in Pakistan. We specialize in web and mobile application development, cloud solutions, and IT consulting services. Our team of 150+ professionals delivers innovative solutions to clients worldwide.',
            
            headquarters: {
                city: 'Karachi',
                country: 'Pakistan',
                address: 'Plot 123, DHA Phase 5, Karachi'
            },
            
            socialLinks: {
                linkedin: 'https://linkedin.com/company/techsolutions',
                twitter: 'https://twitter.com/techsolutions',
                facebook: 'https://facebook.com/techsolutions'
            }
        });

        console.log('✅ Company 1 created:', profile1.companyName);
        console.log('   Profile Completeness:', profile1.profileCompleteness + '%');

        // ═════════════════════════════════════════════════════
        // Sample 2: Finance Company
        // ═════════════════════════════════════════════════════
        const employer2 = await User.create({
            firstName: 'Finance',
            lastName: 'Corp',
            email: 'careers@financecorp.com',
            password: 'Finance@123456',
            phone: '03009876543',
            role: 'employer'
        });

        const profile2 = await EmployerProfile.create({
            userId: employer2._id,
            companyName: 'FinanceCorp International',
            companyLogo: 'https://via.placeholder.com/200x200?text=FinanceCorp',
            companyWebsite: 'https://financecorp.com',
            industry: 'Finance',
            companySize: '201-500',
            foundedYear: 2010,
            description: 'Premier financial services company providing banking, investment, and insurance solutions. With over 300 employees across Pakistan, we are committed to financial excellence and customer satisfaction.',
            
            headquarters: {
                city: 'Lahore',
                country: 'Pakistan',
                address: 'Main Boulevard, Gulberg III, Lahore'
            },
            
            socialLinks: {
                linkedin: 'https://linkedin.com/company/financecorp',
                facebook: 'https://facebook.com/financecorp'
            },
            
            isVerified: true,
            verifiedAt: new Date()
        });

        console.log('✅ Company 2 created:', profile2.companyName);
        console.log('   Profile Completeness:', profile2.profileCompleteness + '%');
        console.log('   Verified:', profile2.isVerified ? '✅' : '❌');

        // ═════════════════════════════════════════════════════
        // Sample 3: E-commerce Startup
        // ═════════════════════════════════════════════════════
        const employer3 = await User.create({
            firstName: 'Shop',
            lastName: 'Now',
            email: 'jobs@shopnow.pk',
            password: 'Shop@123456',
            phone: '03111234567',
            role: 'employer'
        });

        const profile3 = await EmployerProfile.create({
            userId: employer3._id,
            companyName: 'ShopNow Pakistan',
            companyLogo: 'https://via.placeholder.com/200x200?text=ShopNow',
            companyWebsite: 'https://shopnow.pk',
            industry: 'E-commerce',
            companySize: '11-50',
            foundedYear: 2020,
            description: 'Fast-growing e-commerce platform revolutionizing online shopping in Pakistan. We connect buyers and sellers through our innovative marketplace.',
            
            headquarters: {
                city: 'Islamabad',
                country: 'Pakistan',
                address: 'Blue Area, F-7, Islamabad'
            },
            
            socialLinks: {
                linkedin: 'https://linkedin.com/company/shopnow',
                twitter: 'https://twitter.com/shopnowpk'
            }
        });

        console.log('✅ Company 3 created:', profile3.companyName);
        console.log('   Company Age:', profile3.companyAge, 'years');
        console.log('   Profile Completeness:', profile3.profileCompleteness + '%');

        // ═════════════════════════════════════════════════════
        // Sample 4: Healthcare Company (Unverified)
        // ═════════════════════════════════════════════════════
        const employer4 = await User.create({
            firstName: 'Health',
            lastName: 'Care',
            email: 'recruitment@healthplus.com',
            password: 'Health@123456',
            role: 'employer'
        });

        const profile4 = await EmployerProfile.create({
            userId: employer4._id,
            companyName: 'HealthPlus Medical Services',
            industry: 'Healthcare',
            companySize: '1-10',
            foundedYear: 2023,
            description: 'New healthcare startup providing telemedicine and home healthcare services.',
            
            headquarters: {
                city: 'Karachi',
                country: 'Pakistan'
            }
        });

        console.log('✅ Company 4 created:', profile4.companyName);
        console.log('   Profile Completeness:', profile4.profileCompleteness + '%');
        console.log('   Verified:', profile4.isVerified ? '✅' : '❌ (Pending)');

        // ═════════════════════════════════════════════════════
        // Sample 5: Education Company
        // ═════════════════════════════════════════════════════
        const employer5 = await User.create({
            firstName: 'Edu',
            lastName: 'Tech',
            email: 'careers@edutech.pk',
            password: 'Edu@123456',
            role: 'employer'
        });

        const profile5 = await EmployerProfile.create({
            userId: employer5._id,
            companyName: 'EduTech Learning Solutions',
            companyWebsite: 'https://edutech.pk',
            industry: 'Education',
            companySize: '11-50',
            foundedYear: 2018,
            description: 'EdTech company providing online learning platforms and educational technology solutions for schools and universities.',
            
            headquarters: {
                city: 'Lahore',
                country: 'Pakistan'
            },
            
            isVerified: true,
            verifiedAt: new Date()
        });

        console.log('✅ Company 5 created:', profile5.companyName);
        console.log('   Profile Completeness:', profile5.profileCompleteness + '%');

        // ═════════════════════════════════════════════════════
        // Summary
        // ═════════════════════════════════════════════════════
        console.log('\n' + '═'.repeat(60));
        console.log('✅ Employer Sample Data Created Successfully!');
        console.log('═'.repeat(60));
        console.log('\nCreated:');
        console.log('  • 5 Employer Users');
        console.log('  • 5 Company Profiles');
        console.log('  • 2 Verified Companies');
        console.log('  • 3 Unverified Companies');
        console.log('\nIndustries:');
        console.log('  • Technology (1)');
        console.log('  • Finance (1)');
        console.log('  • E-commerce (1)');
        console.log('  • Healthcare (1)');
        console.log('  • Education (1)');
        console.log('\nCheck MongoDB Compass now! 🔍');
        console.log('Collections:');
        console.log('  • users');
        console.log('  • employerprofiles');
        console.log('═'.repeat(60) + '\n');

        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.code === 11000) {
            console.error('\n💡 Tip: Email already exists! Run cleanup first:');
            console.error('   node cleanup-db.js');
        }
        process.exit(1);
    }
};

createEmployerSamples();
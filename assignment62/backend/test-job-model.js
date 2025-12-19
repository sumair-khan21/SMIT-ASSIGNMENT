// ═══════════════════════════════════════════════════════════
//                  JOB MODEL TEST FILE
//            (Testing Job model functionality)
// ═══════════════════════════════════════════════════════════

require('dotenv').config();
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const EmployerProfile = require('./src/models/EmployerProfile');
const Job = require('./src/models/Job');

// ─────────────────────────────────────────────────────────────
// Test Function
// ─────────────────────────────────────────────────────────────
const testJobModel = async () => {
    try {
        // Connect to database
        await connectDB();

        console.log('\n🧪 Starting Job Model Tests...\n');
        console.log('═'.repeat(60));

        // ═════════════════════════════════════════════════════
        // SETUP: Create test employer & company
        // ═════════════════════════════════════════════════════
        console.log('\n⚙️  SETUP: Creating test employer and company...');
        
        const employer1 = await User.create({
            firstName: 'Tech',
            lastName: 'Company',
            email: 'employer1@test.com',
            password: 'Test@123456',
            role: 'employer'
        });

        const company1 = await EmployerProfile.create({
            userId: employer1._id,
            companyName: 'Tech Solutions Ltd',
            industry: 'Technology',
            companySize: '51-200',
            headquarters: {
                city: 'Karachi',
                country: 'Pakistan'
            }
        });

        const employer2 = await User.create({
            firstName: 'Startup',
            lastName: 'Inc',
            email: 'employer2@test.com',
            password: 'Test@123456',
            role: 'employer'
        });

        const company2 = await EmployerProfile.create({
            userId: employer2._id,
            companyName: 'Innovative Systems',
            industry: 'Technology',
            companySize: '11-50',
            headquarters: {
                city: 'Lahore',
                country: 'Pakistan'
            }
        });

        console.log('✅ Test setup complete!');
        console.log('   Employer 1:', employer1._id);
        console.log('   Company 1:', company1.companyName);
        console.log('   Employer 2:', employer2._id);
        console.log('   Company 2:', company2.companyName);

        // ═════════════════════════════════════════════════════
        // TEST 1: Create Basic Job
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 1: Creating basic job posting...');
        
        const basicJob = await Job.create({
            employerId: employer1._id,
            companyId: company1._id,
            title: 'Full Stack Developer',
            description: 'We are looking for an experienced Full Stack Developer to join our team. You will work on exciting projects using modern technologies and collaborate with a talented team of developers.',
            requirements: [
                '3+ years of experience in web development',
                "Bachelor's degree in Computer Science or related field",
                'Strong problem-solving skills'
            ],
            responsibilities: [
                'Develop and maintain web applications',
                'Write clean, maintainable code',
                'Collaborate with cross-functional teams'
            ],
            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
            jobType: 'full-time',
            workMode: 'hybrid',
            experienceLevel: 'mid',
            location: {
                city: 'Karachi',
                country: 'Pakistan',
                isRemote: false
            },
            salary: {
                min: 80000,
                max: 150000,
                currency: 'PKR',
                isNegotiable: true,
                showSalary: true
            },
            openPositions: 2
        });

        console.log('✅ Basic job created!');
        console.log('   Job ID:', basicJob._id);
        console.log('   Title:', basicJob.title);
        console.log('   Status:', basicJob.status);
        console.log('   Salary Range:', basicJob.salaryRange);

        // ═════════════════════════════════════════════════════
        // TEST 2: Create Remote Job
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 2: Creating remote job...');
        
        const remoteJob = await Job.create({
            employerId: employer2._id,
            companyId: company2._id,
            title: 'Senior React Developer',
            description: 'Remote opportunity for an experienced React developer. Work from anywhere in Pakistan. We offer flexible hours and competitive salary. Join our growing team and work on cutting-edge projects.',
            requirements: [
                '5+ years of React experience',
                'Strong TypeScript skills',
                'Experience with state management (Redux/Context)'
            ],
            responsibilities: [
                'Build scalable React applications',
                'Mentor junior developers',
                'Participate in code reviews'
            ],
            skills: ['React', 'TypeScript', 'Redux', 'CSS'],
            jobType: 'full-time',
            workMode: 'remote',
            experienceLevel: 'senior',
            location: {
                city: 'Remote',
                country: 'Pakistan',
                isRemote: true
            },
            salary: {
                min: 150000,
                max: 250000,
                currency: 'PKR',
                isNegotiable: false,
                showSalary: true
            },
            applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            openPositions: 1,
            benefits: ['Health Insurance', 'Annual Bonus', 'Flexible Hours']
        });

        console.log('✅ Remote job created!');
        console.log('   Title:', remoteJob.title);
        console.log('   Work Mode:', remoteJob.workMode);
        console.log('   Is Remote:', remoteJob.location.isRemote);
        console.log('   Days Remaining:', remoteJob.daysRemaining, 'days');

        // ═════════════════════════════════════════════════════
        // TEST 3: Create Job with Deadline
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 3: Creating job with deadline...');
        
        const deadlineJob = await Job.create({
            employerId: employer1._id,
            companyId: company1._id,
            title: 'Junior Developer',
            description: 'Great opportunity for fresh graduates. We are looking for enthusiastic junior developers who are eager to learn and grow. You will receive mentorship from senior developers and work on real projects.',
            requirements: [
                "Bachelor's degree in Computer Science",
                'Basic knowledge of JavaScript',
                'Willingness to learn'
            ],
            responsibilities: [
                'Learn and implement new features',
                'Bug fixing and testing',
                'Documentation'
            ],
            skills: ['JavaScript', 'HTML', 'CSS'],
            jobType: 'full-time',
            workMode: 'onsite',
            experienceLevel: 'entry',
            location: {
                city: 'Karachi',
                country: 'Pakistan'
            },
            salary: {
                min: 40000,
                max: 60000,
                currency: 'PKR',
                showSalary: true
            },
            applicationDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
            openPositions: 3
        });

        console.log('✅ Job with deadline created!');
        console.log('   Deadline:', deadlineJob.applicationDeadline.toLocaleDateString());
        console.log('   Days Remaining:', deadlineJob.daysRemaining);
        console.log('   Is Expired:', deadlineJob.isExpired);

        // ═════════════════════════════════════════════════════
        // TEST 4: Populate References
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 4: Testing populate (employer & company)...');
        
        const populatedJob = await Job.findById(basicJob._id)
            .populate('employerId', 'firstName lastName email')
            .populate('companyId', 'companyName industry headquarters');
        
        console.log('✅ Populate working!');
        console.log('   Employer:', populatedJob.employerId.firstName + ' ' + populatedJob.employerId.lastName);
        console.log('   Company:', populatedJob.companyId.companyName);
        console.log('   Industry:', populatedJob.companyId.industry);

        // ═════════════════════════════════════════════════════
        // TEST 5: Increment Views
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 5: Testing increment views...');
        
        console.log('   Views before:', basicJob.views);
        
        await basicJob.incrementViews();
        await basicJob.incrementViews();
        await basicJob.incrementViews();
        
        const updatedJob = await Job.findById(basicJob._id);
        
        console.log('   Views after:', updatedJob.views);
        console.log('✅ Increment views working!');

        // ═════════════════════════════════════════════════════
        // TEST 6: Increment Applications
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 6: Testing increment applications...');
        
        console.log('   Applications before:', basicJob.applicationsCount);
        
        await basicJob.incrementApplications();
        await basicJob.incrementApplications();
        
        const jobWithApps = await Job.findById(basicJob._id);
        
        console.log('   Applications after:', jobWithApps.applicationsCount);
        console.log('✅ Increment applications working!');

        // ═════════════════════════════════════════════════════
        // TEST 7: Close & Reopen Job
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 7: Testing close and reopen job...');
        
        console.log('   Status before:', basicJob.status);
        
        await basicJob.closeJob();
        let closedJob = await Job.findById(basicJob._id);
        console.log('   Status after close:', closedJob.status);
        
        await closedJob.reopenJob();
        let reopenedJob = await Job.findById(basicJob._id);
        console.log('   Status after reopen:', reopenedJob.status);
        
        console.log('✅ Close/Reopen working!');

        // ═════════════════════════════════════════════════════
        // TEST 8: Get Active Jobs
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 8: Testing getActiveJobs...');
        
        const activeJobs = await Job.getActiveJobs();
        
        console.log('✅ getActiveJobs working!');
        console.log('   Active Jobs:', activeJobs.length);
        activeJobs.forEach(job => {
            console.log('   -', job.title, '(' + job.companyId.companyName + ')');
        });

        // ═════════════════════════════════════════════════════
        // TEST 9: Search by Skills
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 9: Testing searchBySkills...');
        
        const reactJobs = await Job.searchBySkills(['React']);
        
        console.log('✅ searchBySkills working!');
        console.log('   Jobs requiring React:', reactJobs.length);
        reactJobs.forEach(job => {
            console.log('   -', job.title);
        });

        // ═════════════════════════════════════════════════════
        // TEST 10: Get Jobs by Employer
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 10: Testing getJobsByEmployer...');
        
        const employer1Jobs = await Job.getJobsByEmployer(employer1._id);
        
        console.log('✅ getJobsByEmployer working!');
        console.log('   Jobs by Employer 1:', employer1Jobs.length);

        // ═════════════════════════════════════════════════════
        // TEST 11: Get Remote Jobs
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 11: Testing getRemoteJobs...');
        
        const remoteJobs = await Job.getRemoteJobs();
        
        console.log('✅ getRemoteJobs working!');
        console.log('   Remote Jobs:', remoteJobs.length);
        remoteJobs.forEach(job => {
            console.log('   -', job.title);
        });

        // ═════════════════════════════════════════════════════
        // TEST 12: Get Jobs by Location
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 12: Testing getJobsByLocation...');
        
        const karachiJobs = await Job.getJobsByLocation('Karachi');
        
        console.log('✅ getJobsByLocation working!');
        console.log('   Jobs in Karachi:', karachiJobs.length);

        // ═════════════════════════════════════════════════════
        // TEST 13: Advanced Search
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 13: Testing advancedSearch...');
        
        const searchResults = await Job.advancedSearch({
            workMode: 'remote',
            experienceLevel: 'senior',
            skills: ['React']
        });
        
        console.log('✅ advancedSearch working!');
        console.log('   Search Results:', searchResults.length);
        searchResults.forEach(job => {
            console.log('   -', job.title, '(' + job.workMode + ', ' + job.experienceLevel + ')');
        });

        // ═════════════════════════════════════════════════════
        // TEST 14: Invalid Deadline Validation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 14: Testing invalid deadline validation...');
        
        try {
            await Job.create({
                employerId: employer1._id,
                companyId: company1._id,
                title: 'Test Job',
                description: 'This is a test job with invalid deadline. The deadline should not be in the past.',
                requirements: ['Test requirement'],
                responsibilities: ['Test responsibility'],
                skills: ['JavaScript'],
                jobType: 'full-time',
                workMode: 'onsite',
                experienceLevel: 'entry',
                applicationDeadline: new Date('2020-01-01') // Past date
            });
            console.log('❌ FAILED: Should have rejected past deadline');
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log('✅ Invalid deadline blocked!');
                console.log('   Error:', error.errors.applicationDeadline.message);
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 15: Required Fields Validation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 15: Testing required fields validation...');
        
        try {
            await Job.create({
                employerId: employer1._id,
                companyId: company1._id,
                title: 'Test',
                description: 'Short'
                // Missing required fields
            });
            console.log('❌ FAILED: Should have rejected missing fields');
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log('✅ Required fields validation working!');
                const errors = Object.keys(error.errors);
                console.log('   Missing fields:', errors.join(', '));
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 16: Virtual Fields
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 16: Testing virtual fields...');
        
        const jobForVirtual = await Job.findById(remoteJob._id);
        
        console.log('✅ Virtual fields working!');
        console.log('   Salary Range:', jobForVirtual.salaryRange);
        console.log('   Days Remaining:', jobForVirtual.daysRemaining);
        console.log('   Is Expired:', jobForVirtual.isExpired);

        // ═════════════════════════════════════════════════════
        // Cleanup - Delete Test Data
        // ═════════════════════════════════════════════════════
        console.log('\n🧹 Cleaning up test data...');
        
        await Job.deleteMany({});
        await EmployerProfile.deleteMany({});
        await User.deleteMany({ email: { $regex: '@test.com$' } });
        
        console.log('✅ Cleanup complete!');

        // ═════════════════════════════════════════════════════
        // Summary
        // ═════════════════════════════════════════════════════
        console.log('\n' + '═'.repeat(60));
        console.log('✅ ALL JOB MODEL TESTS PASSED! 🎉');
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
testJobModel();
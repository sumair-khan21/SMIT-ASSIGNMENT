// ═══════════════════════════════════════════════════════════
//               APPLICATION MODEL TEST FILE
//         (Testing Application model functionality)
// ═══════════════════════════════════════════════════════════

require('dotenv').config();
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const SeekerProfile = require('./src/models/SeekerProfile');
const EmployerProfile = require('./src/models/EmployerProfile');
const Job = require('./src/models/Job');
const Application = require('./src/models/Application');

// ─────────────────────────────────────────────────────────────
// Test Function
// ─────────────────────────────────────────────────────────────
const testApplicationModel = async () => {
    try {
        // Connect to database
        await connectDB();

        console.log('\n🧪 Starting Application Model Tests...\n');
        console.log('═'.repeat(60));

        // ═════════════════════════════════════════════════════
        // SETUP: Create test data
        // ═════════════════════════════════════════════════════
        console.log('\n⚙️  SETUP: Creating test users, companies, and jobs...');
        
        // Create Seeker 1
        const seeker1 = await User.create({
            firstName: 'Ahmed',
            lastName: 'Khan',
            email: 'seeker1@test.com',
            password: 'Test@123456',
            role: 'seeker'
        });

        const seekerProfile1 = await SeekerProfile.create({
            userId: seeker1._id,
            title: 'Full Stack Developer',
            skills: ['React', 'Node.js', 'MongoDB'],
            resume: 'https://example.com/resume1.pdf'
        });

        // Create Seeker 2
        const seeker2 = await User.create({
            firstName: 'Sara',
            lastName: 'Ali',
            email: 'seeker2@test.com',
            password: 'Test@123456',
            role: 'seeker'
        });

        const seekerProfile2 = await SeekerProfile.create({
            userId: seeker2._id,
            title: 'React Developer',
            skills: ['React', 'JavaScript'],
            resume: 'https://example.com/resume2.pdf'
        });

        // Create Employer
        const employer = await User.create({
            firstName: 'Tech',
            lastName: 'Company',
            email: 'employer@test.com',
            password: 'Test@123456',
            role: 'employer'
        });

        const company = await EmployerProfile.create({
            userId: employer._id,
            companyName: 'Tech Solutions Ltd',
            industry: 'Technology',
            companySize: '51-200'
        });

        // Create Job 1
        const job1 = await Job.create({
            employerId: employer._id,
            companyId: company._id,
            title: 'Full Stack Developer',
            description: 'We are looking for an experienced Full Stack Developer to join our team. Great opportunity to work with modern technologies.',
            requirements: ['3+ years experience', 'React expertise'],
            responsibilities: ['Build web apps', 'Code reviews'],
            skills: ['React', 'Node.js', 'MongoDB'],
            jobType: 'full-time',
            workMode: 'hybrid',
            experienceLevel: 'mid',
            location: {
                city: 'Karachi',
                country: 'Pakistan'
            },
            salary: {
                min: 80000,
                max: 150000,
                currency: 'PKR',
                showSalary: true
            },
            openPositions: 2
        });

        // Create Job 2
        const job2 = await Job.create({
            employerId: employer._id,
            companyId: company._id,
            title: 'React Developer',
            description: 'Looking for a React specialist to build modern web applications.',
            requirements: ['React experience'],
            responsibilities: ['Build UIs'],
            skills: ['React', 'JavaScript'],
            jobType: 'full-time',
            workMode: 'remote',
            experienceLevel: 'mid',
            location: {
                city: 'Remote',
                country: 'Pakistan',
                isRemote: true
            },
            salary: {
                min: 70000,
                max: 120000,
                currency: 'PKR',
                showSalary: true
            },
            openPositions: 1
        });

        console.log('✅ Test setup complete!');
        console.log('   Seekers:', 2);
        console.log('   Employer:', employer.fullName);
        console.log('   Company:', company.companyName);
        console.log('   Jobs:', 2);

        // ═════════════════════════════════════════════════════
        // TEST 1: Create Application
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 1: Creating job application...');
        
        const application1 = await Application.create({
            jobId: job1._id,
            seekerId: seeker1._id,
            employerId: employer._id,
            coverLetter: 'I am very interested in this position. I have 3+ years of experience in Full Stack development and I believe I would be a great fit for your team.',
            resume: seekerProfile1.resume
        });

        console.log('✅ Application created!');
        console.log('   Application ID:', application1._id);
        console.log('   Status:', application1.status);
        console.log('   Applied At:', application1.appliedAt.toLocaleDateString());
        console.log('   Status History Length:', application1.statusHistory.length);

        // ═════════════════════════════════════════════════════
        // TEST 2: Create Multiple Applications
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 2: Creating multiple applications...');
        
        const application2 = await Application.create({
            jobId: job1._id,
            seekerId: seeker2._id,
            employerId: employer._id,
            coverLetter: 'I would love to join your team as a Full Stack Developer.',
            resume: seekerProfile2.resume
        });

        const application3 = await Application.create({
            jobId: job2._id,
            seekerId: seeker1._id,
            employerId: employer._id,
            coverLetter: 'I am applying for the React Developer position.',
            resume: seekerProfile1.resume
        });

        console.log('✅ Multiple applications created!');
        console.log('   Total applications for Job 1:', 2);
        console.log('   Total applications by Seeker 1:', 2);

        // ═════════════════════════════════════════════════════
        // TEST 3: Duplicate Application Prevention
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 3: Testing duplicate application prevention...');
        
        try {
            await Application.create({
                jobId: job1._id,
                seekerId: seeker1._id,  // Same seeker, same job
                employerId: employer._id
            });
            console.log('❌ FAILED: Should have prevented duplicate application');
        } catch (error) {
            if (error.code === 11000) {
                console.log('✅ Duplicate application blocked!');
                console.log('   Error: User already applied to this job');
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 4: Populate References
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 4: Testing populate (job, seeker, employer)...');
        
        const populatedApp = await Application.findById(application1._id)
            .populate('jobId', 'title location salary')
            .populate('seekerId', 'firstName lastName email')
            .populate('employerId', 'firstName lastName');
        
        console.log('✅ Populate working!');
        console.log('   Job Title:', populatedApp.jobId.title);
        console.log('   Seeker:', populatedApp.seekerId.firstName + ' ' + populatedApp.seekerId.lastName);
        console.log('   Employer:', populatedApp.employerId.firstName + ' ' + populatedApp.employerId.lastName);

        // ═════════════════════════════════════════════════════
        // TEST 5: Update Status (Instance Method)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 5: Testing updateStatus method...');
        
        console.log('   Status before:', application1.status);
        console.log('   History length before:', application1.statusHistory.length);
        
        await application1.updateStatus('reviewed', employer._id, 'Good profile');
        
        const updatedApp = await Application.findById(application1._id);
        
        console.log('   Status after:', updatedApp.status);
        console.log('   History length after:', updatedApp.statusHistory.length);
        console.log('✅ updateStatus working!');

        // ═════════════════════════════════════════════════════
        // TEST 6: Shortlist Application
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 6: Testing shortlist method...');
        
        await updatedApp.shortlist(employer._id, 'Strong technical skills');
        
        const shortlistedApp = await Application.findById(application1._id);
        
        console.log('✅ Shortlist working!');
        console.log('   Status:', shortlistedApp.status);
        console.log('   Latest note:', shortlistedApp.statusHistory[shortlistedApp.statusHistory.length - 1].note);

        // ═════════════════════════════════════════════════════
        // TEST 7: Interview & Hire Flow
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 7: Testing interview and hire flow...');
        
        await shortlistedApp.markInterviewed(employer._id, 'Excellent interview performance');
        
        let interviewedApp = await Application.findById(application1._id);
        console.log('   After interview - Status:', interviewedApp.status);
        
        await interviewedApp.hire(employer._id, 'Welcome to the team!');
        
        let hiredApp = await Application.findById(application1._id);
        console.log('   After hiring - Status:', hiredApp.status);
        console.log('   Total status changes:', hiredApp.statusHistory.length);
        
        console.log('✅ Interview & Hire flow working!');

        // ═════════════════════════════════════════════════════
        // TEST 8: Reject Application
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 8: Testing reject method...');
        
        await application2.reject(employer._id, 'Not a good fit for current requirements');
        
        const rejectedApp = await Application.findById(application2._id);
        
        console.log('✅ Reject working!');
        console.log('   Status:', rejectedApp.status);
        console.log('   Rejection note:', rejectedApp.statusHistory[rejectedApp.statusHistory.length - 1].note);

        // ═════════════════════════════════════════════════════
        // TEST 9: Withdraw Application (by seeker)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 9: Testing withdraw method (seeker)...');
        
        await application3.withdraw();
        
        const withdrawnApp = await Application.findById(application3._id);
        
        console.log('✅ Withdraw working!');
        console.log('   Status:', withdrawnApp.status);

        // ═════════════════════════════════════════════════════
        // TEST 10: Get Job Applications
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 10: Testing getJobApplications...');
        
        const job1Apps = await Application.getJobApplications(job1._id);
        
        console.log('✅ getJobApplications working!');
        console.log('   Applications for Job 1:', job1Apps.length);
        job1Apps.forEach(app => {
            console.log('   -', app.seekerId.firstName, '(' + app.status + ')');
        });

        // ═════════════════════════════════════════════════════
        // TEST 11: Get Seeker Applications
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 11: Testing getSeekerApplications...');
        
        const seeker1Apps = await Application.getSeekerApplications(seeker1._id);
        
        console.log('✅ getSeekerApplications working!');
        console.log('   Applications by Seeker 1:', seeker1Apps.length);
        seeker1Apps.forEach(app => {
            console.log('   -', app.jobId.title, '(' + app.status + ')');
        });

        // ═════════════════════════════════════════════════════
        // TEST 12: Get Employer Applications
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 12: Testing getEmployerApplications...');
        
        const employerApps = await Application.getEmployerApplications(employer._id);
        
        console.log('✅ getEmployerApplications working!');
        console.log('   Applications received:', employerApps.length);
        employerApps.forEach(app => {
            console.log('   -', app.jobId.title, '-', app.seekerId.firstName, '(' + app.status + ')');
        });

        // ═════════════════════════════════════════════════════
        // TEST 13: Filter by Status
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 13: Testing filter by status...');
        
        const hiredApps = await Application.getEmployerApplications(employer._id, 'hired');
        const rejectedApps = await Application.getEmployerApplications(employer._id, 'rejected');
        
        console.log('✅ Filter by status working!');
        console.log('   Hired applications:', hiredApps.length);
        console.log('   Rejected applications:', rejectedApps.length);

        // ═════════════════════════════════════════════════════
        // TEST 14: Has Applied Check
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 14: Testing hasApplied check...');
        
        const applied1 = await Application.hasApplied(job1._id, seeker1._id);
        const applied2 = await Application.hasApplied(job2._id, seeker2._id);
        
        console.log('✅ hasApplied working!');
        console.log('   Seeker 1 applied to Job 1:', applied1 ? 'Yes' : 'No');
        console.log('   Seeker 2 applied to Job 2:', applied2 ? 'Yes' : 'No');

        // ═════════════════════════════════════════════════════
        // TEST 15: Get Pending Count
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 15: Testing getPendingCount...');
        
        const pendingCount = await Application.getPendingCount(employer._id);
        
        console.log('✅ getPendingCount working!');
        console.log('   Pending applications:', pendingCount);

        // ═════════════════════════════════════════════════════
        // TEST 16: Virtual Field - Days Since Applied
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 16: Testing daysSinceApplied virtual field...');
        
        const appWithVirtual = await Application.findById(application1._id);
        
        console.log('✅ Virtual field working!');
        console.log('   Days since applied:', appWithVirtual.daysSinceApplied);

        // ═════════════════════════════════════════════════════
        // TEST 17: Status History
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 17: Testing status history tracking...');
        
        const appHistory = await Application.findById(application1._id)
            .populate('statusHistory.changedBy', 'firstName lastName');
        
        console.log('✅ Status history working!');
        console.log('   Total status changes:', appHistory.statusHistory.length);
        console.log('   History:');
        appHistory.statusHistory.forEach((h, i) => {
            const changedBy = h.changedBy ? h.changedBy.fullName : 'System';
            console.log(`   ${i + 1}. ${h.status} (by ${changedBy}) - ${h.note || 'No note'}`);
        });

        // ═════════════════════════════════════════════════════
        // Cleanup - Delete Test Data
        // ═════════════════════════════════════════════════════
        console.log('\n🧹 Cleaning up test data...');
        
        await Application.deleteMany({});
        await Job.deleteMany({});
        await SeekerProfile.deleteMany({});
        await EmployerProfile.deleteMany({});
        await User.deleteMany({ email: { $regex: '@test.com$' } });
        
        console.log('✅ Cleanup complete!');

        // ═════════════════════════════════════════════════════
        // Summary
        // ═════════════════════════════════════════════════════
        console.log('\n' + '═'.repeat(60));
        console.log('✅ ALL APPLICATION MODEL TESTS PASSED! 🎉');
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
testApplicationModel();
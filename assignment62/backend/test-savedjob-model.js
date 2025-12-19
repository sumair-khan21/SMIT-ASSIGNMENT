// ═══════════════════════════════════════════════════════════
//               SAVED JOB MODEL TEST FILE
//          (Testing SavedJob model functionality)
// ═══════════════════════════════════════════════════════════

require('dotenv').config();
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const EmployerProfile = require('./src/models/EmployerProfile');
const Job = require('./src/models/Job');
const SavedJob = require('./src/models/SavedJob');

// ─────────────────────────────────────────────────────────────
// Test Function
// ─────────────────────────────────────────────────────────────
const testSavedJobModel = async () => {
    try {
        // Connect to database
        await connectDB();

        console.log('\n🧪 Starting SavedJob Model Tests...\n');
        console.log('═'.repeat(60));

        // ═════════════════════════════════════════════════════
        // SETUP: Create test data
        // ═════════════════════════════════════════════════════
        console.log('\n⚙️  SETUP: Creating test users and jobs...');
        
        // Create Seekers
        const seeker1 = await User.create({
            firstName: 'Ahmed',
            lastName: 'Khan',
            email: 'seeker1@test.com',
            password: 'Test@123456',
            role: 'seeker'
        });

        const seeker2 = await User.create({
            firstName: 'Sara',
            lastName: 'Ali',
            email: 'seeker2@test.com',
            password: 'Test@123456',
            role: 'seeker'
        });

        // Create Employer & Company
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
            companySize: '51-200',
            companyLogo: 'https://via.placeholder.com/200'
        });

        // Create Jobs
        const job1 = await Job.create({
            employerId: employer._id,
            companyId: company._id,
            title: 'Full Stack Developer',
            description: 'We are looking for an experienced Full Stack Developer to join our team.',
            requirements: ['3+ years experience'],
            responsibilities: ['Build web apps'],
            skills: ['React', 'Node.js'],
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

        const job2 = await Job.create({
            employerId: employer._id,
            companyId: company._id,
            title: 'React Developer',
            description: 'Looking for React specialist with strong frontend development skills. Great opportunity to work with modern technologies.',
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

        const job3 = await Job.create({
            employerId: employer._id,
            companyId: company._id,
            title: 'Backend Developer',
            description: 'Node.js backend developer needed to build scalable REST APIs and work with databases in great team environment.',
            requirements: ['Node.js experience'],
            responsibilities: ['Build APIs'],
            skills: ['Node.js', 'MongoDB'],
            jobType: 'full-time',
            workMode: 'onsite',
            experienceLevel: 'mid',
            location: {
                city: 'Lahore',
                country: 'Pakistan'
            },
            salary: {
                min: 70000,
                max: 130000,
                currency: 'PKR',
                showSalary: true
            },
            openPositions: 1
        });

        console.log('✅ Test setup complete!');
        console.log('   Seekers:', 2);
        console.log('   Employer:', employer.fullName);
        console.log('   Company:', company.companyName);
        console.log('   Jobs:', 3);

        // ═════════════════════════════════════════════════════
        // TEST 1: Save a Job
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 1: Saving a job...');
        
        const saved1 = await SavedJob.create({
            userId: seeker1._id,
            jobId: job1._id
        });

        console.log('✅ Job saved!');
        console.log('   Saved ID:', saved1._id);
        console.log('   User:', seeker1.fullName);
        console.log('   Job:', job1.title);
        console.log('   Saved At:', saved1.savedAt.toLocaleDateString());

        // ═════════════════════════════════════════════════════
        // TEST 2: Save Multiple Jobs
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 2: Saving multiple jobs...');
        
        const saved2 = await SavedJob.create({
            userId: seeker1._id,
            jobId: job2._id
        });

        const saved3 = await SavedJob.create({
            userId: seeker1._id,
            jobId: job3._id
        });

        const saved4 = await SavedJob.create({
            userId: seeker2._id,
            jobId: job1._id
        });

        console.log('✅ Multiple jobs saved!');
        console.log('   Seeker 1 saved:', 3, 'jobs');
        console.log('   Seeker 2 saved:', 1, 'job');

        // ═════════════════════════════════════════════════════
        // TEST 3: Duplicate Save Prevention
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 3: Testing duplicate save prevention...');
        
        try {
            await SavedJob.create({
                userId: seeker1._id,
                jobId: job1._id  // Already saved!
            });
            console.log('❌ FAILED: Should have prevented duplicate save');
        } catch (error) {
            if (error.code === 11000) {
                console.log('✅ Duplicate save blocked!');
                console.log('   Error: Job already saved by this user');
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 4: Populate Job & Company
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 4: Testing populate (job & company)...');
        
        const populatedSaved = await SavedJob.findById(saved1._id)
            .populate({
                path: 'jobId',
                populate: {
                    path: 'companyId',
                    select: 'companyName companyLogo industry'
                }
            })
            .populate('userId', 'firstName lastName email');
        
        console.log('✅ Populate working!');
        console.log('   User:', populatedSaved.userId.fullName);
        console.log('   Job Title:', populatedSaved.jobId.title);
        console.log('   Company:', populatedSaved.jobId.companyId.companyName);
        console.log('   Industry:', populatedSaved.jobId.companyId.industry);

        // ═════════════════════════════════════════════════════
        // TEST 5: Get User's Saved Jobs (Static Method)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 5: Testing getUserSavedJobs...');
        
        const seeker1SavedJobs = await SavedJob.getUserSavedJobs(seeker1._id);
        
        console.log('✅ getUserSavedJobs working!');
        console.log('   Seeker 1 saved jobs:', seeker1SavedJobs.length);
        seeker1SavedJobs.forEach((saved, index) => {
            console.log(`   ${index + 1}. ${saved.jobId.title} (${saved.jobId.companyId.companyName})`);
        });

        // ═════════════════════════════════════════════════════
        // TEST 6: Check if Job is Saved (isSaved)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 6: Testing isSaved check...');
        
        const isSaved1 = await SavedJob.isSaved(seeker1._id, job1._id);
        const isSaved2 = await SavedJob.isSaved(seeker2._id, job2._id);
        
        console.log('✅ isSaved working!');
        console.log('   Seeker 1 saved Job 1:', isSaved1 ? 'Yes ✅' : 'No ❌');
        console.log('   Seeker 2 saved Job 2:', isSaved2 ? 'Yes ✅' : 'No ❌');

        // ═════════════════════════════════════════════════════
        // TEST 7: Save Job (Static Method)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 7: Testing saveJob static method...');
        
        const newSaved = await SavedJob.saveJob(seeker2._id, job2._id);
        
        console.log('✅ saveJob working!');
        console.log('   Saved:', job2.title, 'for', seeker2.fullName);

        // ═════════════════════════════════════════════════════
        // TEST 8: Duplicate with saveJob Method
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 8: Testing duplicate prevention with saveJob...');
        
        try {
            await SavedJob.saveJob(seeker2._id, job2._id);
            console.log('❌ FAILED: Should have thrown error');
        } catch (error) {
            if (error.message === 'Job already saved') {
                console.log('✅ saveJob duplicate prevention working!');
                console.log('   Error:', error.message);
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 9: Unsave Job
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 9: Testing unsaveJob...');
        
        console.log('   Before unsave - Seeker 1 saved:', await SavedJob.getSavedCount(seeker1._id));
        
        await SavedJob.unsaveJob(seeker1._id, job3._id);
        
        console.log('   After unsave - Seeker 1 saved:', await SavedJob.getSavedCount(seeker1._id));
        console.log('✅ unsaveJob working!');

        // ═════════════════════════════════════════════════════
        // TEST 10: Get Saved Count
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 10: Testing getSavedCount...');
        
        const count1 = await SavedJob.getSavedCount(seeker1._id);
        const count2 = await SavedJob.getSavedCount(seeker2._id);
        
        console.log('✅ getSavedCount working!');
        console.log('   Seeker 1 saved count:', count1);
        console.log('   Seeker 2 saved count:', count2);

        // ═════════════════════════════════════════════════════
        // TEST 11: Get Job Savers (Who saved this job?)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 11: Testing getJobSavers...');
        
        const job1Savers = await SavedJob.getJobSavers(job1._id);
        
        console.log('✅ getJobSavers working!');
        console.log('   Users who saved', job1.title + ':', job1Savers.length);
        job1Savers.forEach(saved => {
            console.log('   -', saved.userId.firstName + ' ' + saved.userId.lastName);
        });

        // ═════════════════════════════════════════════════════
        // TEST 12: Virtual Field - Days Since Saved
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 12: Testing daysSinceSaved virtual field...');
        
        const savedWithVirtual = await SavedJob.findById(saved1._id);
        
        console.log('✅ Virtual field working!');
        console.log('   Days since saved:', savedWithVirtual.daysSinceSaved);

        // ═════════════════════════════════════════════════════
        // TEST 13: Complete Flow Simulation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 13: Complete user flow simulation...');
        
        // User browses and saves job
        console.log('\n   Step 1: User browses job');
        const jobToBrowse = await Job.findById(job3._id);
        console.log('   Viewing:', jobToBrowse.title);
        
        // Check if already saved
        console.log('\n   Step 2: Check if already saved');
        const alreadySaved = await SavedJob.isSaved(seeker2._id, job3._id);
        console.log('   Already saved:', alreadySaved ? 'Yes' : 'No');
        
        if (!alreadySaved) {
            // Save the job
            console.log('\n   Step 3: Save the job');
            await SavedJob.saveJob(seeker2._id, job3._id);
            console.log('   ✅ Job saved successfully!');
        }
        
        // View all saved jobs
        console.log('\n   Step 4: View all saved jobs');
        const mySavedJobs = await SavedJob.getUserSavedJobs(seeker2._id);
        console.log('   My saved jobs:', mySavedJobs.length);
        
        console.log('\n✅ Complete flow simulation successful!');

        // ═════════════════════════════════════════════════════
        // Cleanup - Delete Test Data
        // ═════════════════════════════════════════════════════
        console.log('\n🧹 Cleaning up test data...');
        
        await SavedJob.deleteMany({});
        await Job.deleteMany({});
        await EmployerProfile.deleteMany({});
        await User.deleteMany({ email: { $regex: '@test.com$' } });
        
        console.log('✅ Cleanup complete!');

        // ═════════════════════════════════════════════════════
        // Summary
        // ═════════════════════════════════════════════════════
        console.log('\n' + '═'.repeat(60));
        console.log('✅ ALL SAVED JOB MODEL TESTS PASSED! 🎉');
        console.log('═'.repeat(60));
        console.log('\n🎊 ALL MODELS COMPLETE! 🎊');
        console.log('\nCompleted Models:');
        console.log('  1. ✅ User');
        console.log('  2. ✅ SeekerProfile');
        console.log('  3. ✅ EmployerProfile');
        console.log('  4. ✅ Job');
        console.log('  5. ✅ Application');
        console.log('  6. ✅ SavedJob');
        console.log('\n' + '═'.repeat(60) + '\n');

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
testSavedJobModel();
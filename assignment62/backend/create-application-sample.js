require('dotenv').config();
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const SeekerProfile = require('./src/models/SeekerProfile');
const EmployerProfile = require('./src/models/EmployerProfile');
const Job = require('./src/models/Job');
const Application = require('./src/models/Application');

const createApplicationSamples = async () => {
    try {
        await connectDB();

        console.log('\n📝 Creating Complete Sample Data (Seekers + Applications)...\n');

        // ═════════════════════════════════════════════════════
        // Create Seekers
        // ═════════════════════════════════════════════════════
        
        // Seeker 1
        const seeker1 = await User.create({
            firstName: 'Ahmed',
            lastName: 'Khan',
            email: 'ahmed.seeker@example.com',
            password: 'Ahmed@123456',
            phone: '03001234567',
            role: 'seeker'
        });

        const seekerProfile1 = await SeekerProfile.create({
            userId: seeker1._id,
            title: 'Full Stack Developer',
            bio: 'Experienced MERN stack developer with 3+ years of experience',
            skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
            experience: [{
                company: 'Previous Company',
                position: 'Software Developer',
                startDate: new Date('2021-01-01'),
                isCurrent: true,
                description: 'Working on MERN stack projects'
            }],
            education: [{
                institution: 'University of Karachi',
                degree: "Bachelor's",
                field: 'Computer Science',
                startYear: 2017,
                endYear: 2021
            }],
            resume: 'https://example.com/ahmed-resume.pdf',
            location: {
                city: 'Karachi',
                country: 'Pakistan'
            }
        });

        console.log('✅ Seeker 1 created:', seeker1.fullName);

        // Seeker 2
        const seeker2 = await User.create({
            firstName: 'Sara',
            lastName: 'Ali',
            email: 'sara.seeker@example.com',
            password: 'Sara@123456',
            phone: '03009876543',
            role: 'seeker'
        });

        const seekerProfile2 = await SeekerProfile.create({
            userId: seeker2._id,
            title: 'Frontend Developer',
            bio: 'React specialist with passion for UI/UX',
            skills: ['React', 'TypeScript', 'CSS', 'Tailwind'],
            resume: 'https://example.com/sara-resume.pdf',
            location: {
                city: 'Lahore',
                country: 'Pakistan'
            }
        });

        console.log('✅ Seeker 2 created:', seeker2.fullName);

        // Seeker 3
        const seeker3 = await User.create({
            firstName: 'Usman',
            lastName: 'Shah',
            email: 'usman.seeker@example.com',
            password: 'Usman@123456',
            role: 'seeker'
        });

        const seekerProfile3 = await SeekerProfile.create({
            userId: seeker3._id,
            title: 'Backend Developer',
            bio: 'Node.js expert with database optimization skills',
            skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
            resume: 'https://example.com/usman-resume.pdf',
            location: {
                city: 'Islamabad',
                country: 'Pakistan'
            }
        });

        console.log('✅ Seeker 3 created:', seeker3.fullName);

        // Seeker 4
        const seeker4 = await User.create({
            firstName: 'Fatima',
            lastName: 'Noor',
            email: 'fatima.seeker@example.com',
            password: 'Fatima@123456',
            role: 'seeker'
        });

        const seekerProfile4 = await SeekerProfile.create({
            userId: seeker4._id,
            title: 'Junior Developer',
            bio: 'Fresh graduate eager to learn',
            skills: ['JavaScript', 'HTML', 'CSS', 'React'],
            resume: 'https://example.com/fatima-resume.pdf'
        });

        console.log('✅ Seeker 4 created:', seeker4.fullName);

        // ═════════════════════════════════════════════════════
        // Get Existing Employers & Jobs
        // ═════════════════════════════════════════════════════
        
        const employers = await User.find({ role: 'employer' });
        const jobs = await Job.find({ status: 'active' });

        if (employers.length === 0 || jobs.length === 0) {
            console.log('\n⚠️  Warning: No employers or jobs found!');
            console.log('   Run create-job-sample.js first to create jobs');
            process.exit(0);
        }

        const employer1 = employers[0];
        const job1 = jobs[0];
        const job2 = jobs[1] || jobs[0];

        console.log('\n✅ Found existing data:');
        console.log('   Employers:', employers.length);
        console.log('   Active Jobs:', jobs.length);

        // ═════════════════════════════════════════════════════
        // Create Applications
        // ═════════════════════════════════════════════════════
        console.log('\n📝 Creating job applications...\n');

        // Application 1: Ahmed → Job 1 (Hired)
        const app1 = await Application.create({
            jobId: job1._id,
            seekerId: seeker1._id,
            employerId: job1.employerId,
            coverLetter: 'I am very excited about this opportunity. With my 3+ years of MERN stack experience, I believe I would be a great fit for your team. I have successfully delivered multiple projects and I am passionate about creating scalable web applications.',
            resume: seekerProfile1.resume
        });

        await app1.updateStatus('reviewed', employer1._id, 'Strong profile');
        await app1.shortlist(employer1._id, 'Excellent technical skills');
        await app1.markInterviewed(employer1._id, 'Great interview performance');
        await app1.hire(employer1._id, 'Welcome to the team!');

        console.log('✅ Application 1:', seeker1.fullName, '→', job1.title);
        console.log('   Status: hired ✅');

        // Application 2: Sara → Job 1 (Shortlisted)
        const app2 = await Application.create({
            jobId: job1._id,
            seekerId: seeker2._id,
            employerId: job1.employerId,
            coverLetter: 'I would love to join your company. My React expertise and passion for frontend development make me an ideal candidate for this position.',
            resume: seekerProfile2.resume
        });

        await app2.updateStatus('reviewed', employer1._id, 'Good candidate');
        await app2.shortlist(employer1._id, 'Strong frontend skills');

        console.log('✅ Application 2:', seeker2.fullName, '→', job1.title);
        console.log('   Status: shortlisted 📋');

        // Application 3: Usman → Job 1 (Rejected)
        const app3 = await Application.create({
            jobId: job1._id,
            seekerId: seeker3._id,
            employerId: job1.employerId,
            coverLetter: 'I am interested in this Full Stack position. I have strong backend skills with Node.js.',
            resume: seekerProfile3.resume
        });

        await app3.updateStatus('reviewed', employer1._id, 'Reviewed application');
        await app3.reject(employer1._id, 'Looking for stronger frontend experience');

        console.log('✅ Application 3:', seeker3.fullName, '→', job1.title);
        console.log('   Status: rejected ❌');

        // Application 4: Fatima → Job 1 (Pending)
        const app4 = await Application.create({
            jobId: job1._id,
            seekerId: seeker4._id,
            employerId: job1.employerId,
            coverLetter: 'I am a fresh graduate with strong fundamentals and eagerness to learn. I would appreciate the opportunity to work with your team.',
            resume: seekerProfile4.resume
        });

        console.log('✅ Application 4:', seeker4.fullName, '→', job1.title);
        console.log('   Status: pending ⏳');

        // Application 5: Ahmed → Job 2 (Interviewed)
        if (job2._id.toString() !== job1._id.toString()) {
            const app5 = await Application.create({
                jobId: job2._id,
                seekerId: seeker1._id,
                employerId: job2.employerId,
                coverLetter: 'I am also interested in this position as it aligns with my career goals.',
                resume: seekerProfile1.resume
            });

            await app5.updateStatus('reviewed', employer1._id);
            await app5.shortlist(employer1._id, 'Potential candidate');
            await app5.markInterviewed(employer1._id, 'Interview scheduled');

            console.log('✅ Application 5:', seeker1.fullName, '→', job2.title);
            console.log('   Status: interviewed 🎤');
        }

        // Application 6: Sara → Job 2 (Reviewed)
        if (job2._id.toString() !== job1._id.toString()) {
            const app6 = await Application.create({
                jobId: job2._id,
                seekerId: seeker2._id,
                employerId: job2.employerId,
                coverLetter: 'This role perfectly matches my skills and experience.',
                resume: seekerProfile2.resume
            });

            await app6.updateStatus('reviewed', employer1._id, 'Under consideration');

            console.log('✅ Application 6:', seeker2.fullName, '→', job2.title);
            console.log('   Status: reviewed 👀');
        }

        // ═════════════════════════════════════════════════════
        // Increment job statistics
        // ═════════════════════════════════════════════════════
        await job1.incrementApplications();
        await job1.incrementApplications();
        await job1.incrementApplications();
        await job1.incrementApplications();
        await job1.incrementViews();
        await job1.incrementViews();
        await job1.incrementViews();

        // ═════════════════════════════════════════════════════
        // Summary
        // ═════════════════════════════════════════════════════
        console.log('\n' + '═'.repeat(60));
        console.log('✅ Application Sample Data Created Successfully!');
        console.log('═'.repeat(60));
        console.log('\nCreated:');
        console.log('  • 4 Job Seekers');
        console.log('  • 4 Seeker Profiles');
        console.log('  • 6 Job Applications');
        console.log('\nApplication Statuses:');
        console.log('  • Pending: 1');
        console.log('  • Reviewed: 1');
        console.log('  • Shortlisted: 1');
        console.log('  • Interviewed: 1');
        console.log('  • Hired: 1');
        console.log('  • Rejected: 1');
        console.log('\nCheck MongoDB Compass now! 🔍');
        console.log('Collections:');
        console.log('  • users (seekers + employers)');
        console.log('  • seekerprofiles');
        console.log('  • employerprofiles');
        console.log('  • jobs');
        console.log('  • applications ← NEW!');
        console.log('═'.repeat(60) + '\n');

        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.code === 11000) {
            console.error('\n💡 Tip: Data already exists! Run cleanup first.');
        }
        console.error('Stack:', error.stack);
        process.exit(1);
    }
};

createApplicationSamples();
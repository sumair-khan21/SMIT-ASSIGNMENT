require('dotenv').config();
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const EmployerProfile = require('./src/models/EmployerProfile');
const Job = require('./src/models/Job');

const createJobSamples = async () => {
    try {
        await connectDB();

        console.log('\n📝 Creating Job Sample Data...\n');

        // ═════════════════════════════════════════════════════
        // Setup: Create Employers & Companies
        // ═════════════════════════════════════════════════════
        
        // Employer 1
        const employer1 = await User.create({
            firstName: 'Tech',
            lastName: 'Solutions',
            email: 'hr@techsolutions.com',
            password: 'Tech@123456',
            role: 'employer'
        });

        const company1 = await EmployerProfile.create({
            userId: employer1._id,
            companyName: 'Tech Solutions Pakistan',
            companyLogo: 'https://via.placeholder.com/200x200?text=Tech+Solutions',
            industry: 'Technology',
            companySize: '51-200',
            foundedYear: 2015,
            headquarters: {
                city: 'Karachi',
                country: 'Pakistan'
            },
            isVerified: true
        });

        console.log('✅ Employer 1 & Company created:', company1.companyName);

        // Employer 2
        const employer2 = await User.create({
            firstName: 'Finance',
            lastName: 'Corp',
            email: 'careers@financecorp.com',
            password: 'Finance@123456',
            role: 'employer'
        });

        const company2 = await EmployerProfile.create({
            userId: employer2._id,
            companyName: 'FinanceCorp International',
            companyLogo: 'https://via.placeholder.com/200x200?text=FinanceCorp',
            industry: 'Finance',
            companySize: '201-500',
            foundedYear: 2010,
            headquarters: {
                city: 'Lahore',
                country: 'Pakistan'
            },
            isVerified: true
        });

        console.log('✅ Employer 2 & Company created:', company2.companyName);

        // Employer 3
        const employer3 = await User.create({
            firstName: 'Startup',
            lastName: 'Hub',
            email: 'jobs@startuphub.pk',
            password: 'Startup@123456',
            role: 'employer'
        });

        const company3 = await EmployerProfile.create({
            userId: employer3._id,
            companyName: 'Startup Hub Pakistan',
            companyLogo: 'https://via.placeholder.com/200x200?text=Startup+Hub',
            industry: 'E-commerce',
            companySize: '11-50',
            foundedYear: 2020,
            headquarters: {
                city: 'Islamabad',
                country: 'Pakistan'
            },
            isVerified: false
        });

        console.log('✅ Employer 3 & Company created:', company3.companyName);

        // ═════════════════════════════════════════════════════
        // JOB 1: Full Stack Developer (Karachi)
        // ═════════════════════════════════════════════════════
        const job1 = await Job.create({
            employerId: employer1._id,
            companyId: company1._id,
            title: 'Full Stack Developer',
            description: 'We are looking for an experienced Full Stack Developer to join our growing team. You will work on cutting-edge projects using MERN stack and collaborate with talented developers. This is a great opportunity to grow your career in a dynamic environment.',
            requirements: [
                '3+ years of experience in web development',
                "Bachelor's degree in Computer Science or related field",
                'Strong problem-solving skills',
                'Experience with Agile methodologies'
            ],
            responsibilities: [
                'Develop and maintain web applications using MERN stack',
                'Write clean, maintainable, and well-documented code',
                'Collaborate with cross-functional teams',
                'Participate in code reviews and technical discussions'
            ],
            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
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
            applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            openPositions: 2,
            benefits: ['Health Insurance', 'Annual Bonus', 'Paid Leave'],
            tags: ['urgent', 'featured']
        });

        console.log('✅ Job 1 created:', job1.title);

        // ═════════════════════════════════════════════════════
        // JOB 2: Senior React Developer (Remote)
        // ═════════════════════════════════════════════════════
        const job2 = await Job.create({
            employerId: employer1._id,
            companyId: company1._id,
            title: 'Senior React Developer',
            description: 'Remote opportunity for an experienced React developer. Work from anywhere in Pakistan with flexible hours. We are building next-generation web applications and need talented developers to join our team. Competitive salary and great benefits package.',
            requirements: [
                '5+ years of React experience',
                'Strong TypeScript skills',
                'Experience with state management (Redux/Context)',
                'Excellent communication skills for remote work'
            ],
            responsibilities: [
                'Build scalable React applications',
                'Mentor junior developers',
                'Participate in architecture decisions',
                'Conduct code reviews and ensure quality'
            ],
            skills: ['React', 'TypeScript', 'Redux', 'CSS', 'Git'],
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
            applicationDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
            openPositions: 1,
            benefits: ['Flexible Hours', 'Work From Home', 'Annual Bonus', 'Health Insurance'],
            tags: ['remote', 'featured']
        });

        console.log('✅ Job 2 created:', job2.title);

        // ═════════════════════════════════════════════════════
        // JOB 3: Junior Developer (Lahore)
        // ═════════════════════════════════════════════════════
        const job3 = await Job.create({
            employerId: employer2._id,
            companyId: company2._id,
            title: 'Junior Software Developer',
            description: 'Great opportunity for fresh graduates to start their career in software development. We provide comprehensive training and mentorship. Work on real projects and learn from experienced developers in a supportive environment.',
            requirements: [
                "Bachelor's degree in Computer Science",
                'Basic knowledge of JavaScript and programming concepts',
                'Willingness to learn and grow',
                'Good communication skills'
            ],
            responsibilities: [
                'Learn and implement new features under supervision',
                'Bug fixing and testing',
                'Write documentation',
                'Participate in team meetings'
            ],
            skills: ['JavaScript', 'HTML', 'CSS', 'Git'],
            jobType: 'full-time',
            workMode: 'onsite',
            experienceLevel: 'entry',
            location: {
                city: 'Lahore',
                country: 'Pakistan',
                isRemote: false
            },
            salary: {
                min: 40000,
                max: 60000,
                currency: 'PKR',
                isNegotiable: false,
                showSalary: true
            },
            applicationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
            openPositions: 3,
            benefits: ['Training Program', 'Career Growth', 'Paid Leave']
        });

        console.log('✅ Job 3 created:', job3.title);

        // ═════════════════════════════════════════════════════
        // JOB 4: Backend Developer (Karachi)
        // ═════════════════════════════════════════════════════
        const job4 = await Job.create({
            employerId: employer1._id,
            companyId: company1._id,
            title: 'Backend Developer - Node.js',
            description: 'Looking for a skilled Backend Developer with strong Node.js experience. You will design and implement APIs, work with databases, and ensure application performance and scalability.',
            requirements: [
                '2+ years of Node.js experience',
                'Experience with REST APIs',
                'Knowledge of MongoDB or PostgreSQL',
                'Understanding of authentication and security'
            ],
            responsibilities: [
                'Design and develop REST APIs',
                'Database design and optimization',
                'Implement authentication and authorization',
                'Write unit and integration tests'
            ],
            skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST API'],
            jobType: 'full-time',
            workMode: 'hybrid',
            experienceLevel: 'mid',
            location: {
                city: 'Karachi',
                country: 'Pakistan',
                isRemote: false
            },
            salary: {
                min: 70000,
                max: 120000,
                currency: 'PKR',
                isNegotiable: true,
                showSalary: true
            },
            applicationDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
            openPositions: 1
        });

        console.log('✅ Job 4 created:', job4.title);

        // ═════════════════════════════════════════════════════
        // JOB 5: UI/UX Designer (Remote)
        // ═════════════════════════════════════════════════════
        const job5 = await Job.create({
            employerId: employer3._id,
            companyId: company3._id,
            title: 'UI/UX Designer',
            description: 'Join our creative team as a UI/UX Designer. Design beautiful and intuitive user interfaces for web and mobile applications. Work remotely and be part of exciting e-commerce projects.',
            requirements: [
                '2+ years of UI/UX design experience',
                'Proficiency in Figma or Adobe XD',
                'Strong portfolio showcasing design work',
                'Understanding of user-centered design principles'
            ],
            responsibilities: [
                'Create wireframes and prototypes',
                'Design user interfaces for web and mobile',
                'Collaborate with developers',
                'Conduct user research and usability testing'
            ],
            skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Design', 'Prototyping'],
            jobType: 'contract',
            workMode: 'remote',
            experienceLevel: 'mid',
            location: {
                city: 'Remote',
                country: 'Pakistan',
                isRemote: true
            },
            salary: {
                min: 60000,
                max: 100000,
                currency: 'PKR',
                isNegotiable: true,
                showSalary: true
            },
            applicationDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            openPositions: 1,
            benefits: ['Remote Work', 'Flexible Hours']
        });

        console.log('✅ Job 5 created:', job5.title);

        // ═════════════════════════════════════════════════════
        // JOB 6: DevOps Engineer (Closed - for testing)
        // ═════════════════════════════════════════════════════
        const job6 = await Job.create({
            employerId: employer2._id,
            companyId: company2._id,
            title: 'DevOps Engineer',
            description: 'This position has been filled. We were looking for a DevOps Engineer with AWS and Docker experience.',
            requirements: ['AWS experience', 'Docker knowledge'],
            responsibilities: ['Manage infrastructure', 'CI/CD pipelines'],
            skills: ['AWS', 'Docker', 'Kubernetes'],
            jobType: 'full-time',
            workMode: 'onsite',
            experienceLevel: 'senior',
            location: {
                city: 'Lahore',
                country: 'Pakistan'
            },
            salary: {
                min: 120000,
                max: 200000,
                currency: 'PKR',
                showSalary: false
            },
            openPositions: 1,
            status: 'closed'
        });

        console.log('✅ Job 6 created:', job6.title, '(Status:', job6.status + ')');

        // ═════════════════════════════════════════════════════
        // Summary
        // ═════════════════════════════════════════════════════
        console.log('\n' + '═'.repeat(60));
        console.log('✅ Job Sample Data Created Successfully!');
        console.log('═'.repeat(60));
        console.log('\nCreated:');
        console.log('  • 3 Employers');
        console.log('  • 3 Companies (2 verified, 1 unverified)');
        console.log('  • 6 Jobs (5 active, 1 closed)');
        console.log('\nJob Types:');
        console.log('  • Full-time: 4');
        console.log('  • Contract: 1');
        console.log('\nWork Modes:');
        console.log('  • Hybrid: 2');
        console.log('  • Remote: 2');
        console.log('  • Onsite: 2');
        console.log('\nLocations:');
        console.log('  • Karachi: 2');
        console.log('  • Lahore: 2');
        console.log('  • Remote: 2');
        console.log('\nCheck MongoDB Compass now! 🔍');
        console.log('Collections:');
        console.log('  • users');
        console.log('  • employerprofiles');
        console.log('  • jobs');
        console.log('═'.repeat(60) + '\n');

        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.code === 11000) {
            console.error('\n💡 Tip: Data already exists! Run cleanup first:');
            console.error('   node cleanup-db.js');
        }
        process.exit(1);
    }
};

createJobSamples();
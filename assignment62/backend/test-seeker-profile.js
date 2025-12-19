// ═══════════════════════════════════════════════════════════
//              SEEKER PROFILE MODEL TEST FILE
//          (Testing SeekerProfile model functionality)
// ═══════════════════════════════════════════════════════════

require('dotenv').config();
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const SeekerProfile = require('./src/models/SeekerProfile');

// ─────────────────────────────────────────────────────────────
// Test Function
// ─────────────────────────────────────────────────────────────
const testSeekerProfile = async () => {
    try {
        // Connect to database
        await connectDB();

        console.log('\n🧪 Starting SeekerProfile Model Tests...\n');
        console.log('═'.repeat(60));

        // ═════════════════════════════════════════════════════
        // SETUP: Create a test user first
        // ═════════════════════════════════════════════════════
        console.log('\n⚙️  SETUP: Creating test user...');
        
        const testUser = await User.create({
            firstName: 'Test',
            lastName: 'Seeker',
            email: 'seeker@test.com',
            password: 'Test@123456',
            role: 'seeker'
        });

        console.log('✅ Test user created!');
        console.log('   User ID:', testUser._id);
        console.log('   Name:', testUser.fullName);

        // ═════════════════════════════════════════════════════
        // TEST 1: Create Basic Seeker Profile
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 1: Creating basic seeker profile...');
        
        const basicProfile = await SeekerProfile.create({
            userId: testUser._id,
            title: 'Full Stack Developer',
            bio: 'Passionate developer with 3 years of experience',
            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB']
        });

        console.log('✅ Basic profile created!');
        console.log('   Profile ID:', basicProfile._id);
        console.log('   Title:', basicProfile.title);
        console.log('   Skills:', basicProfile.skills);
        console.log('   Profile Completeness:', basicProfile.profileCompleteness + '%');

        // ═════════════════════════════════════════════════════
        // TEST 2: Add Experience
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 2: Adding work experience...');
        
        await basicProfile.addExperience({
            company: 'Tech Solutions Inc',
            position: 'Frontend Developer',
            startDate: new Date('2021-01-01'),
            endDate: new Date('2022-12-31'),
            isCurrent: false,
            description: 'Worked on React and Vue.js projects'
        });

        await basicProfile.addExperience({
            company: 'Innovative Systems',
            position: 'Full Stack Developer',
            startDate: new Date('2023-01-01'),
            isCurrent: true,
            description: 'Currently working on MERN stack applications'
        });

        const profileWithExp = await SeekerProfile.findById(basicProfile._id);
        
        console.log('✅ Experience added!');
        console.log('   Total Experiences:', profileWithExp.experience.length);
        console.log('   Current Company:', profileWithExp.experience[1].company);
        console.log('   Total Experience:', profileWithExp.totalExperience, 'years');

        // ═════════════════════════════════════════════════════
        // TEST 3: Add Education
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 3: Adding education...');
        
        await profileWithExp.addEducation({
            institution: 'University of Karachi',
            degree: "Bachelor's",
            field: 'Computer Science',
            startYear: 2016,
            endYear: 2020
        });

        const profileWithEdu = await SeekerProfile.findById(basicProfile._id);
        
        console.log('✅ Education added!');
        console.log('   Degree:', profileWithEdu.education[0].degree);
        console.log('   Field:', profileWithEdu.education[0].field);
        console.log('   Institution:', profileWithEdu.education[0].institution);

        // ═════════════════════════════════════════════════════
        // TEST 4: Complete Profile with All Fields
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 4: Creating complete profile...');
        
        // Create another user
        const completeUser = await User.create({
            firstName: 'Complete',
            lastName: 'Profile',
            email: 'complete@test.com',
            password: 'Test@123456',
            role: 'seeker'
        });

                const completeProfile = await SeekerProfile.create({
            userId: completeUser._id,
            title: 'Senior React Developer',
            bio: 'Experienced developer specializing in React and Node.js with a proven track record',
            skills: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'AWS'],
            
            experience: [{
                company: 'Google',
                position: 'Senior Developer',
                startDate: new Date('2020-01-01'),
                isCurrent: true,
                description: 'Leading frontend development team'
            }],
            
            education: [{
                institution: 'MIT',
                degree: "Master's",
                field: 'Computer Science',
                startYear: 2018,
                endYear: 2020
            }],
            
            resume: 'https://example.com/resume.pdf',
            
            location: {
                city: 'Karachi',
                country: 'Pakistan'
            },
            
            preferences: {
                expectedSalary: {
                    min: 150000,
                    max: 250000,
                    currency: 'PKR'
                },
                jobType: ['full-time', 'part-time'],  // ✅ Valid job types
                workMode: ['remote', 'hybrid'],        // ✅ Valid work modes
                preferredLocations: ['Karachi', 'Remote']
            },
            
            socialLinks: {
                linkedin: 'https://linkedin.com/in/testuser',
                github: 'https://github.com/testuser',
                portfolio: 'https://testuser.com'
            }
        });

        console.log('✅ Complete profile created!');
        console.log('   Profile Completeness:', completeProfile.profileCompleteness + '%');
        console.log('   Expected Salary:', 
            completeProfile.preferences.expectedSalary.min + ' - ' + 
            completeProfile.preferences.expectedSalary.max + ' ' + 
            completeProfile.preferences.expectedSalary.currency
        );
        console.log('   Job Types:', completeProfile.preferences.jobType);
        console.log('   Work Modes:', completeProfile.preferences.workMode);  // ✅ Add this
        console.log('   LinkedIn:', completeProfile.socialLinks.linkedin);

       // ═════════════════════════════════════════════════════
// TEST 5: Skill Management
// ═════════════════════════════════════════════════════
console.log('\n📝 TEST 5: Testing skill management...');

// Fresh document fetch karo
let skillProfile = await SeekerProfile.findById(basicProfile._id);
console.log('   Before:', skillProfile.skills);

// Add skills
await skillProfile.addSkill('TypeScript');
await skillProfile.addSkill('Docker');

// Reload after adding
skillProfile = await SeekerProfile.findById(basicProfile._id);
console.log('   After adding:', skillProfile.skills);

// Remove skill
await skillProfile.removeSkill('MongoDB');

// Reload after removing
skillProfile = await SeekerProfile.findById(basicProfile._id);
console.log('   After removing:', skillProfile.skills);
console.log('✅ Skill management working!');

        // ═════════════════════════════════════════════════════
        // TEST 6: Populate User Data
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 6: Testing populate (user data)...');
        
        const populatedProfile = await SeekerProfile.findById(basicProfile._id)
            .populate('userId', 'firstName lastName email avatar');
        
        console.log('✅ Populate working!');
        console.log('   User Name:', populatedProfile.userId.firstName + ' ' + populatedProfile.userId.lastName);
        console.log('   User Email:', populatedProfile.userId.email);

        // ═════════════════════════════════════════════════════
        // TEST 7: Find by User ID (Static Method)
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 7: Testing findByUserId...');
        
        const foundProfile = await SeekerProfile.findByUserId(testUser._id);
        
        console.log('✅ findByUserId working!');
        console.log('   Found Profile:', foundProfile.title);
        console.log('   User Name:', foundProfile.userId.fullName);

        // ═════════════════════════════════════════════════════
        // TEST 8: Search by Skills
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 8: Testing searchBySkills...');
        
        const reactDevs = await SeekerProfile.searchBySkills(['React']);
        
        console.log('✅ searchBySkills working!');
        console.log('   Found', reactDevs.length, 'profiles with React skill');
        reactDevs.forEach(profile => {
            console.log('   -', profile.title, '(' + profile.userId.fullName + ')');
        });

        // ═════════════════════════════════════════════════════
        // TEST 9: Find by Location
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 9: Testing findByLocation...');
        
        const karachiProfiles = await SeekerProfile.findByLocation('Karachi');
        
        console.log('✅ findByLocation working!');
        console.log('   Found', karachiProfiles.length, 'profiles in Karachi');

        // ═════════════════════════════════════════════════════
        // TEST 10: Duplicate Profile Prevention
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 10: Testing duplicate profile prevention...');
        
        try {
            await SeekerProfile.create({
                userId: testUser._id,  // Same user ID
                title: 'Another Profile'
            });
            console.log('❌ FAILED: Should have prevented duplicate profile');
        } catch (error) {
            if (error.code === 11000) {
                console.log('✅ Duplicate profile blocked!');
                console.log('   Error: User already has a profile');
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 11: Invalid URL Validation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 11: Testing invalid URL validation...');
        
        try {
            await SeekerProfile.create({
                userId: new User()._id,
                resume: 'not-a-valid-url'
            });
            console.log('❌ FAILED: Should have rejected invalid URL');
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log('✅ Invalid URL blocked!');
                console.log('   Error:', error.errors.resume.message);
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 12: Experience Date Validation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 12: Testing experience date validation...');
        
        try {
            const tempUser = await User.create({
                firstName: 'Temp',
                lastName: 'User',
                email: 'temp@test.com',
                password: 'Test@123456',
                role: 'seeker'
            });

            await SeekerProfile.create({
                userId: tempUser._id,
                experience: [{
                    company: 'ABC',
                    position: 'Developer',
                    startDate: new Date('2023-01-01'),
                    endDate: new Date('2022-01-01')  // End before start!
                }]
            });
            console.log('❌ FAILED: Should have rejected invalid dates');
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log('✅ Invalid experience dates blocked!');
                console.log('   Error: End date before start date');
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 13: Skills Limit Validation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 13: Testing skills limit...');
        
        try {
            const tempUser2 = await User.create({
                firstName: 'Temp2',
                lastName: 'User',
                email: 'temp2@test.com',
                password: 'Test@123456',
                role: 'seeker'
            });

            const manySkills = Array(25).fill().map((_, i) => `Skill${i}`);
            
            await SeekerProfile.create({
                userId: tempUser2._id,
                skills: manySkills  // More than 20 skills
            });
            console.log('❌ FAILED: Should have rejected too many skills');
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log('✅ Too many skills blocked!');
                console.log('   Error: Cannot add more than 20 skills');
            }
        }

        // ═════════════════════════════════════════════════════
        // TEST 14: Virtual Field - Total Experience
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 14: Testing totalExperience virtual field...');
        
        const expProfile = await SeekerProfile.findById(profileWithExp._id);
        
        console.log('✅ Virtual field working!');
        console.log('   Total Experience:', expProfile.totalExperience, 'years');
        console.log('   Experience Count:', expProfile.experience.length);

        // ═════════════════════════════════════════════════════
        // TEST 15: Profile Completeness Calculation
        // ═════════════════════════════════════════════════════
        console.log('\n📝 TEST 15: Testing profile completeness...');
        
        const emptyUser = await User.create({
            firstName: 'Empty',
            lastName: 'Profile',
            email: 'empty@test.com',
            password: 'Test@123456',
            role: 'seeker'
        });

        const emptyProfile = await SeekerProfile.create({
            userId: emptyUser._id
        });

        console.log('✅ Profile completeness calculated!');
        console.log('   Empty Profile:', emptyProfile.profileCompleteness + '%');
        console.log('   Basic Profile:', basicProfile.profileCompleteness + '%');
        console.log('   Complete Profile:', completeProfile.profileCompleteness + '%');

        // ═════════════════════════════════════════════════════
        // Cleanup - Delete Test Data
        // ═════════════════════════════════════════════════════
        console.log('\n🧹 Cleaning up test data...');
        
        // await SeekerProfile.deleteMany({});
        // await User.deleteMany({ email: { $regex: '@test.com$' } });
        
        console.log('✅ Cleanup complete!');

        // ═════════════════════════════════════════════════════
        // Summary
        // ═════════════════════════════════════════════════════
        console.log('\n' + '═'.repeat(60));
        console.log('✅ ALL SEEKER PROFILE MODEL TESTS PASSED! 🎉');
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
testSeekerProfile();
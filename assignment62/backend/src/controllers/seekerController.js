const SeekerProfile = require('../models/SeekerProfile');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// ═══════════════════════════════════════════════════════════
//                  SEEKER PROFILE CONTROLLERS
// ═══════════════════════════════════════════════════════════

// @desc    Get seeker profile
// @route   GET /api/seeker/profile
// @access  Private (Seeker only)
exports.getProfile = async (req, res, next) => {
  try {
    const profile = await SeekerProfile.findOne({ userId: req.user.id })
      .populate('userId', 'firstName lastName email phone avatar');

    if (!profile) {
      throw new ApiError(404, 'Profile not found. Please create your profile first.');
    }

    res.status(200).json(
      new ApiResponse(200, { profile }, 'Profile fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Create seeker profile
// @route   POST /api/seeker/profile
// @access  Private (Seeker only)
exports.createProfile = async (req, res, next) => {
  try {
    // Check if profile already exists
    const existingProfile = await SeekerProfile.findOne({ userId: req.user.id });
    
    if (existingProfile) {
      throw new ApiError(400, 'Profile already exists. Use update endpoint to modify.');
    }

    // Create new profile
    const profileData = {
      userId: req.user.id,
      ...req.body
    };

    const profile = await SeekerProfile.create(profileData);

    // Populate user data
    await profile.populate('userId', 'firstName lastName email phone avatar');

    res.status(201).json(
      new ApiResponse(201, { profile }, 'Profile created successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Update seeker profile
// @route   PUT /api/seeker/profile
// @access  Private (Seeker only)
exports.updateProfile = async (req, res, next) => {
  try {
    let profile = await SeekerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      throw new ApiError(404, 'Profile not found. Please create your profile first.');
    }

    // Update profile
    profile = await SeekerProfile.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('userId', 'firstName lastName email phone avatar');

    res.status(200).json(
      new ApiResponse(200, { profile }, 'Profile updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Delete seeker profile
// @route   DELETE /api/seeker/profile
// @access  Private (Seeker only)
exports.deleteProfile = async (req, res, next) => {
  try {
    const profile = await SeekerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      throw new ApiError(404, 'Profile not found');
    }

    await profile.deleteOne();

    res.status(200).json(
      new ApiResponse(200, null, 'Profile deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Add experience to profile
// @route   POST /api/seeker/profile/experience
// @access  Private (Seeker only)
exports.addExperience = async (req, res, next) => {
  try {
    const profile = await SeekerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      throw new ApiError(404, 'Profile not found. Please create your profile first.');
    }

    profile.experience.unshift(req.body);
    await profile.save();

    res.status(200).json(
      new ApiResponse(200, { profile }, 'Experience added successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Update experience
// @route   PUT /api/seeker/profile/experience/:expId
// @access  Private (Seeker only)
exports.updateExperience = async (req, res, next) => {
  try {
    const profile = await SeekerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      throw new ApiError(404, 'Profile not found');
    }

    const expIndex = profile.experience.findIndex(
      exp => exp._id.toString() === req.params.expId
    );

    if (expIndex === -1) {
      throw new ApiError(404, 'Experience not found');
    }

    profile.experience[expIndex] = {
      ...profile.experience[expIndex].toObject(),
      ...req.body
    };

    await profile.save();

    res.status(200).json(
      new ApiResponse(200, { profile }, 'Experience updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Delete experience
// @route   DELETE /api/seeker/profile/experience/:expId
// @access  Private (Seeker only)
exports.deleteExperience = async (req, res, next) => {
  try {
    const profile = await SeekerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      throw new ApiError(404, 'Profile not found');
    }

    profile.experience = profile.experience.filter(
      exp => exp._id.toString() !== req.params.expId
    );

    await profile.save();

    res.status(200).json(
      new ApiResponse(200, { profile }, 'Experience deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Add education to profile
// @route   POST /api/seeker/profile/education
// @access  Private (Seeker only)
exports.addEducation = async (req, res, next) => {
  try {
    const profile = await SeekerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      throw new ApiError(404, 'Profile not found. Please create your profile first.');
    }

    profile.education.unshift(req.body);
    await profile.save();

    res.status(200).json(
      new ApiResponse(200, { profile }, 'Education added successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Update education
// @route   PUT /api/seeker/profile/education/:eduId
// @access  Private (Seeker only)
exports.updateEducation = async (req, res, next) => {
  try {
    const profile = await SeekerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      throw new ApiError(404, 'Profile not found');
    }

    const eduIndex = profile.education.findIndex(
      edu => edu._id.toString() === req.params.eduId
    );

    if (eduIndex === -1) {
      throw new ApiError(404, 'Education not found');
    }

    profile.education[eduIndex] = {
      ...profile.education[eduIndex].toObject(),
      ...req.body
    };

    await profile.save();

    res.status(200).json(
      new ApiResponse(200, { profile }, 'Education updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Delete education
// @route   DELETE /api/seeker/profile/education/:eduId
// @access  Private (Seeker only)
exports.deleteEducation = async (req, res, next) => {
  try {
    const profile = await SeekerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      throw new ApiError(404, 'Profile not found');
    }

    profile.education = profile.education.filter(
      edu => edu._id.toString() !== req.params.eduId
    );

    await profile.save();

    res.status(200).json(
      new ApiResponse(200, { profile }, 'Education deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
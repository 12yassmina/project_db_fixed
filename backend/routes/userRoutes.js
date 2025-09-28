const express = require('express');
const router = express.Router();

const {
  getProfile,
  updateProfile,
  updateAvatar,
  changePassword,
  deleteAccount,
  getUserStats
} = require('../controllers/userController');

const {
  validateProfileUpdate,
  validateChangePassword,
  validateAvatarUpdate,
  validateDeleteAccount
} = require('../middleware/validation');

const { protect, sensitiveOperationLimit } = require('../middleware/auth');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, validateProfileUpdate, updateProfile);

// @route   PUT /api/users/avatar
// @desc    Update user avatar
// @access  Private
router.put('/avatar', protect, validateAvatarUpdate, updateAvatar);

// @route   PUT /api/users/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', protect, validateChangePassword, sensitiveOperationLimit(3, 60 * 60 * 1000), changePassword);

// @route   DELETE /api/users/profile
// @desc    Delete user account
// @access  Private
router.delete('/profile', protect, validateDeleteAccount, sensitiveOperationLimit(2, 24 * 60 * 60 * 1000), deleteAccount);

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', protect, getUserStats);

module.exports = router;

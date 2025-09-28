const { body, param, query } = require('express-validator');

// User registration validation
const validateRegister = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
    
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
    
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
    
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    
  body('phone')
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid phone number'),
    
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date of birth')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 13) {
        throw new Error('You must be at least 13 years old to register');
      }
      
      if (age > 120) {
        throw new Error('Please provide a valid date of birth');
      }
      
      return true;
    }),
    
  body('nationality')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Nationality cannot exceed 50 characters'),
    
  body('preferredLanguage')
    .optional()
    .isIn(['en', 'fr', 'ar', 'es'])
    .withMessage('Preferred language must be one of: en, fr, ar, es'),
    
  body('worldCupPreferences.interestedCities')
    .optional()
    .isArray()
    .withMessage('Interested cities must be an array'),
    
  body('worldCupPreferences.interestedCities.*')
    .optional()
    .isIn(['casablanca', 'rabat', 'marrakech', 'tangier', 'agadir', 'fez'])
    .withMessage('Invalid city selection'),
    
  body('worldCupPreferences.accommodationType')
    .optional()
    .isIn(['hotel', 'rental', 'hostel', 'camping'])
    .withMessage('Accommodation type must be one of: hotel, rental, hostel, camping'),
    
  body('worldCupPreferences.budgetRange.min')
    .optional()
    .isNumeric()
    .withMessage('Budget minimum must be a number')
    .isFloat({ min: 0 })
    .withMessage('Budget minimum cannot be negative'),
    
  body('worldCupPreferences.budgetRange.max')
    .optional()
    .isNumeric()
    .withMessage('Budget maximum must be a number')
    .isFloat({ min: 0 })
    .withMessage('Budget maximum cannot be negative')
    .custom((value, { req }) => {
      if (req.body.worldCupPreferences?.budgetRange?.min && value < req.body.worldCupPreferences.budgetRange.min) {
        throw new Error('Budget maximum must be greater than minimum');
      }
      return true;
    })
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
    
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Profile update validation
const validateProfileUpdate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
    
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
    
  body('phone')
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid phone number'),
    
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date of birth')
    .custom((value) => {
      if (value) {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (age < 13) {
          throw new Error('You must be at least 13 years old');
        }
        
        if (age > 120) {
          throw new Error('Please provide a valid date of birth');
        }
      }
      return true;
    }),
    
  body('nationality')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Nationality cannot exceed 50 characters'),
    
  body('preferredLanguage')
    .optional()
    .isIn(['en', 'fr', 'ar', 'es'])
    .withMessage('Preferred language must be one of: en, fr, ar, es'),
    
  body('address.street')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Street address cannot exceed 100 characters'),
    
  body('address.city')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('City cannot exceed 50 characters'),
    
  body('address.state')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('State cannot exceed 50 characters'),
    
  body('address.country')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Country cannot exceed 50 characters'),
    
  body('address.zipCode')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Zip code cannot exceed 20 characters'),
    
  body('worldCupPreferences.favoriteTeams')
    .optional()
    .isArray()
    .withMessage('Favorite teams must be an array'),
    
  body('worldCupPreferences.interestedCities')
    .optional()
    .isArray()
    .withMessage('Interested cities must be an array'),
    
  body('worldCupPreferences.interestedCities.*')
    .optional()
    .isIn(['casablanca', 'rabat', 'marrakech', 'tangier', 'agadir', 'fez'])
    .withMessage('Invalid city selection'),
    
  body('worldCupPreferences.accommodationType')
    .optional()
    .isIn(['hotel', 'rental', 'hostel', 'camping'])
    .withMessage('Accommodation type must be one of: hotel, rental, hostel, camping'),
    
  body('worldCupPreferences.budgetRange.min')
    .optional()
    .isNumeric()
    .withMessage('Budget minimum must be a number')
    .isFloat({ min: 0 })
    .withMessage('Budget minimum cannot be negative'),
    
  body('worldCupPreferences.budgetRange.max')
    .optional()
    .isNumeric()
    .withMessage('Budget maximum must be a number')
    .isFloat({ min: 0 })
    .withMessage('Budget maximum cannot be negative')
    .custom((value, { req }) => {
      if (req.body.worldCupPreferences?.budgetRange?.min && value < req.body.worldCupPreferences.budgetRange.min) {
        throw new Error('Budget maximum must be greater than minimum');
      }
      return true;
    })
];

// Change password validation
const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
    
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number')
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error('New password must be different from current password');
      }
      return true;
    })
];

// Reset password validation
const validateResetPassword = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
];

// Forgot password validation
const validateForgotPassword = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

// Avatar update validation
const validateAvatarUpdate = [
  body('avatar')
    .isURL()
    .withMessage('Avatar must be a valid URL')
    .matches(/\.(jpg|jpeg|png|gif|webp)$/i)
    .withMessage('Avatar must be a valid image URL (jpg, jpeg, png, gif, webp)')
];

// Delete account validation
const validateDeleteAccount = [
  body('password')
    .notEmpty()
    .withMessage('Password is required to delete account')
];

// Token parameter validation
const validateTokenParam = [
  param('token')
    .isLength({ min: 64, max: 64 })
    .withMessage('Invalid token format')
    .matches(/^[a-f0-9]{64}$/)
    .withMessage('Invalid token format')
];

module.exports = {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
  validateChangePassword,
  validateResetPassword,
  validateForgotPassword,
  validateAvatarUpdate,
  validateDeleteAccount,
  validateTokenParam
};

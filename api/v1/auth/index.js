'use strict';

const router = require('express').Router();
const AuthManager = require('./auth.service');
const AuthController = require('./auth.controller');

router.post('/login', AuthController.login);
router.post('/logout', AuthManager.isAuthenticated, AuthController.logout);
// router.post('/forgot-password', AuthController.passwordResetRequest);
// router.post('/reset-password', AuthController.resetPassword);
// router.post('/change-password', AuthManager.isAuthenticated, AuthController.changePassword);
// router.get('/verify-email/:token', AuthController.verifyEmail);
// router.post('/guest-login', AuthController.guestLogin);

module.exports = router;
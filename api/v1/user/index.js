'use strict';
const express =  require('express');
const router = express.Router();

const UserController = require("./user.controller");

router.post('/add', UserController.addUser);
router.get('/view',UserController.getUserDetails)
router.post('/update', UserController.updateUserDetails);
router.post('/register', UserController.create);



module.exports = router;
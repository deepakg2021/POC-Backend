'use strict';
const express =  require('express');
const router = express.Router();

const UserController = require("./user.controller");

router.post('/add-cases', UserController.addCases);
router.get('/view',UserController.getCaseDetails);
router.get('/view-all-cases',UserController.getAll);
router.post('/update', UserController.updateCaseDetails);
router.post('/register', UserController.create);
router.get('/getme', UserController.getMe);


module.exports = router;
const express = require('express');
const router = express.Router();

const showAllAppNameController = require('../controller/showAllAppName');
const getAppNameFromUserController = require('../controller/getAppNameFromUser');

router.get('/getAllApps',showAllAppNameController.getAllApps);

router.post('/getAppNameFromUser',getAppNameFromUserController.getAppNameFromUser);

module.exports = router;
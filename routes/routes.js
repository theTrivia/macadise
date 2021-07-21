const express = require('express');
const router = express.Router();

const showAllAppNameController = require('../controller/showAllAppName');

router.get('/',showAllAppNameController.getAllApps);

module.exports = router;
const express = require("express");
const router = new express.Router();
const callingController = require("../controllers/callingController");
const validation = require('../utilities/validate');
const passport = require("passport")
const {isAuthenticated} = require("../middleware/authenticate");



router.get('/', callingController.getAll);


router.get('/:id', callingController.getSingle);


router.post('/', validation.saveCalling, isAuthenticated, callingController.createCalling);


router.put('/:id', validation.saveCalling, isAuthenticated, callingController.updateCalling);


router.delete('/:id', isAuthenticated, callingController.deleteCalling);

module.exports = router;
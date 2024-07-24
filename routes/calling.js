const express = require("express");
const router = new express.Router();
const callingController = require("../controllers/callingController");
const validation = require('../utilities/validate');
const passport = require("passport")
const {isAuthenticated} = require("../middleware/authenticate");



router.get('/', memberController.getAll);


router.get('/:id', memberController.getSingle);


router.post('/', validation.saveCalling, isAuthenticated, memberController.createCalling);


router.put('/:id', validation.saveCalling, isAuthenticated, memberController.updateCalling);


router.delete('/:id', isAuthenticated, memberController.deleteCalling);

module.exports = router;
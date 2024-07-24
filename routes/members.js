const express = require("express");
const router = new express.Router();
const memberController = require("../controllers/memberController");
const validation = require('../utilities/validate');
const passport = require("passport")
const {isAuthenticated} = require("../middleware/authenticate");



router.get('/', memberController.getAll);

router.get('/:id', memberController.getSingle);

router.post('/', validation.saveMember, memberController.createMember);

router.put('/:id', validation.saveMember, memberController.updateMember);

router.delete('/:id', memberController.deleteMember);

module.exports = router;
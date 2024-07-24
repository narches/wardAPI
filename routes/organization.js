const express = require("express");
const router = new express.Router();
const orgsController = require("../controllers/orgsController");
const validation = require('../utilities/validate');
const passport = require("passport")
const {isAuthenticated} = require("../middleware/authenticate");



router.get('/', orgsController.getAll);

router.get('/:id', orgsController.getSingle);

router.post('/', validation.saveOrgs, isAuthenticated, orgsController.createOrgs);

router.put('/:id', validation.saveOrgs, isAuthenticated, orgsController.updateOrgs);

router.delete('/:id', isAuthenticated, orgsController.deleteOrgs);

module.exports = router;
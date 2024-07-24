const express = require("express");
const router = new express.Router();
const userController = require("../controllers/userController");
const validation = require('../utilities/validate');
const passport = require("passport")
const {isAuthenticated} = require("../middleware/authenticate");



router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', validation.saveUser, isAuthenticated, userController.createUser);

router.put('/:id', validation.saveUser, isAuthenticated, userController.updateUser);

router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;


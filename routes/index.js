// Needed Resources 
const express = require("express")
const router = new express.Router()
const swaggerDocument = require('../swagger.json');
const passport = require("passport");



router.use('/', require('./swagger'));



router.use('/users', require('./users'));


router.use('/members', require('./members'));


router.use('/calling', require('./calling'));


router.use('/organization', require('./organization'));



router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    })
});




module.exports = router;

const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Register route
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username });
  newUser.setPassword(password);

  newUser.save()
    .then(() => res.redirect('/login'))
    .catch(err => res.status(400).send('Error registering user.'));
});

// Login route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

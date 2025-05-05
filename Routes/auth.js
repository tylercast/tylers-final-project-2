// routes/auth.js
const express = require('express');
const router = express.Router();

// Temporary in-memory user store
const users = [];

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.render('register', { error: 'Email already in use.' });
  }
  users.push({ username, email, password });
  res.redirect('/auth/login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.render('login', { error: 'Invalid credentials.' });
  }
  req.session.user = user;
  res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/auth/login'));
});

module.exports = router;

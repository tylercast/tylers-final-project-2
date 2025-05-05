require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');
const videoData = require('./videoData');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'localdevsecret',
  resave: false,
  saveUninitialized: false
}));

app.use('/auth', authRoutes);
app.use('/video', videoRoutes);

app.get('/', (req, res) => res.redirect('/auth/login'));

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', {
      user: req.session.user,
      videos: videoData
    });
  } else {
    res.redirect('/auth/login');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

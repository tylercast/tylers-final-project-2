// routes/video.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const videoPath = path.join(__dirname, '../videoData.js');

let videos = require('../videoData');

router.post('/upload', (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');

  const { title, url, description } = req.body;
  const newVideo = {
    title,
    url,
    description: description || ''
  };
  
  videos.push(newVideo);

  // Save to file (simple overwrite approach)
  const videoExport = 'module.exports = ' + JSON.stringify(videos, null, 2);
  try {
    fs.writeFileSync(videoPath, videoExport);
  } catch (err) {
    console.error('Error saving videoData:', err);
  }

  res.redirect('/dashboard');
});

module.exports = router;



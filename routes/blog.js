const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/', async (req, res) => {
  const sql = `
    SELECT id, title, img, imgalt, link, content1, content2, content3, content4, content5, datetime FROM blog`;
  const [results] = await db.query(sql);
  res.json(results);
});

module.exports = router;
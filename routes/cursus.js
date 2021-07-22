const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/', async (req, res) => {
  const sql = `
    SELECT id, name, price, teacher1, teacher2, teacher3, teacher4, teacher5 FROM language`;
  const [results] = await db.query(sql);
  res.json(results);
});

module.exports = router;
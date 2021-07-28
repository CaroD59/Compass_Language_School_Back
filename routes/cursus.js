const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/', async (req, res) => {
  const sql = `
    SELECT id, name, price FROM language`;
  const [results] = await db.query(sql);
  res.json(results);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql =
    `SELECT id, name, price FROM language WHERE id=?`;
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.status(200).json(results);
});

module.exports = router;
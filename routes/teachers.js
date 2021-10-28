const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/', async (req, res) => {
  const sql = `
    SELECT 
      id, firstname, lastname, email, mobile, admin
    FROM 
      teachers`;
  const [results] = await db.query(sql);
  res.json(results);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = `
  SELECT 
    firstname, lastname, email, mobile, admin 
  FROM 
    teachers 
  WHERE 
    id=?`;
  const sqlValues = [id];
  const [[results]] = await db.query(sql, sqlValues);
  res.json(results);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    firstname,
    lastname,
    email,
    mobile,
    admin,
  } = req.body;
  const sql = `
  UPDATE 
    teachers 
  SET 
   firstname=?, lastname=?, email=?, mobile=?, admin=? 
  WHERE 
    id=?`;
  const sqlValues = [
    firstname,
    lastname,
    email,
    mobile,
    admin,
    id,
  ];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.status(500).send('Generic error message');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = `
  DELETE FROM 
    teachers 
  WHERE 
    id=?`;
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

module.exports = router;

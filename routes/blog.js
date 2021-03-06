const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/', async (req, res) => {
  const sql =
    'SELECT id, title, img, imgalt, link, content1, content2, content3, content4, content5, datetime FROM blog';
  const [results] = await db.query(sql);
  res.json(results);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql =
    'SELECT id, title, img, imgalt, link, content1, content2, content3, content4, content5, datetime FROM blog WHERE id=?';
  const sqlValues = [id];
  const [[results]] = await db.query(sql, sqlValues);
  res.json(results);
});

router.post('/', async (req, res) => {
  const {
    title,
    img,
    imgalt,
    link,
    content1,
    content2,
    content3,
    content4,
    content5,
  } = req.body;
  const sql =
    'INSERT INTO blog (title, img, imgalt, link, content1, content2, content3, content4, content 5) VALUES(?,?,?,?,?,?,?,?,?)';
  const sqlValues = [
    title,
    img,
    imgalt,
    link,
    content1,
    content2,
    content3,
    content4,
    content5,
  ];
  try {
    const [results] = await db.query(sql, sqlValues);
    return res.status(201).json(results);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      // 409: Conflict
      return res.status(409).send('Something went wrong...');
    }
    if (err.code === 'ER_BAD_NULL_ERROR') {
      // 422 : Unprocessable Entity
      return res.status(422).send('Please fill all fields!');
    }
    return res.status(500).send('Generic error message');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    img,
    imgalt,
    link,
    content1,
    content2,
    content3,
    content4,
    content5,
  } = req.body;
  const sql = `
  UPDATE 
    blog
  SET 
    title=?, img=?, imgalt=?, link=?, content1=?, content2=?, content3=?, content4=?, content5=? 
  WHERE 
    id=?`;
  const sqlValues = [
    title,
    img,
    imgalt,
    link,
    content1,
    content2,
    content3,
    content4,
    content5,
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
  const sql = 'DELETE FROM blog WHERE id=?';
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

module.exports = router;

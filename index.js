const express = require('express');
const cors = require('cors');
const passport = require('passport');
const { backPort, frontendUrl } = require('./conf');

const app = express();
 const teachersRoutes = require('./routes/teachers');
// const contactRoutes = require('./routes/contactform');
// const cursusRoutes = require('./routes/cursus')
const blogRoutes = require ('./routes/blog')

app.use(express.json());
app.use(passport.initialize());
app.use(cors());
app.use('/teachers', teachersRoutes);
app.use('/blog', blogRoutes);
// app.use('/contact', contactRoutes);
// app.use('/coursformules', cursusRoutes)

app.use('/auth', require('./routes/auth'));

app.use((req, res) => {
  const msg = `Page not found: ${req.url}`;
  console.warn(msg);
  res.status(404).send(msg);
});

app.listen(backPort, () => {
  console.log(`API root available at: http://localhost:${backPort}/`);
});

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const { backPort, frontendUrl } = require('./conf');

const app = express();
const usersRoutes = require('./routes/users');
const contactRoutes = require('./routes/contactform');

app.use(express.json());
app.use(passport.initialize());
app.use(cors({ credentials: true, origin: frontendUrl }));
app.use('/users', usersRoutes);
app.use('/contact', contactRoutes);

app.use('/auth', require('./routes/auth'));

app.use((req, res) => {
  const msg = `Page not found: ${req.url}`;
  console.warn(msg);
  res.status(404).send(msg);
});

app.listen(backPort, () => {
  console.log(`API root available at: http://localhost:${backPort}/`);
});

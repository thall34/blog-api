const express = require("express");
const path = require("node:path");
const passport = require("passport");
const cors = require('cors');
const prisma = require('./config/db');

const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3000

const app = express();

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));

require('dotenv/config');
require('./config/passport');

app.use(passport.initialize());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.get('/{*splat}', (req, res) => {
  res.status(404).render('errors', {
    title: 'Error 404 - Page Not Found',
    message: 'Error 404 - Page does not exist in the database',
  });
});
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  };

  console.log(`Blog API app - listening on port ${PORT}`);
});
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const { PORT } = require('./util/config');
const { connectToDatabase, sequelize } = require('./util/db');
const blogsRouter = require('./controllers/blogs');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

const start = async () => {
  await connectToDatabase();
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
  });
};

start();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/the_database';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URL).catch(err => console.error('Mongo connection error:', err));

app.get('/', (req, res) => {
  res.send('Todo Backend API Running');
});

app.listen(PORT, () => {
  console.log(Server running on port );
});

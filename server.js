const express = require('express');
const db = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const ItemsRouter = require('./routes/api/items');

const app = express();

app.use(bodyParser.json());

db.connect(process.env.mongoURI, {useNewUrlParser: true})
    .then(() => console.log('Connected to the DB'))
    .catch((err) => console.log(err));

app.use('/api/items', ItemsRouter);

app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`));

const express = require('express');
const db = require('mongoose');
require('dotenv').config();

const ItemRouter = require('./routes/api/items');
const UserRouter = require('./routes/api/users');
const AuthRouter = require('./routes/api/auth');

const app = express();

app.use(express.json());

db.connect(process.env.mongoURI, {useNewUrlParser: true, useCreateIndexes: true})
    .then(() => console.log('Connected to the DB'))
    .catch((err) => console.log(err));


app.use('/api/items', ItemRouter);
app.use('/api/users', UserRouter);
app.use('/api/auth', AuthRouter);

app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`));

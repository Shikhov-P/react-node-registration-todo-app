const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config();

const User = require('../../models/user');

router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
        res.status(400).json({message: "All fields are required"});
    }

    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({message: "User already exists"});
            }
            const newUser = new User({  name, email, password});
            console.log(newUser);
            // bcrypt.hash(newUser.password, 10, (err, hash) => {
            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                   if (err) throw err;
                   newUser.password = hash;
                   newUser.save()
                       .then(user => {
                           jwt.sign(
                               { id: user.id},
                               process.env.JWT_SECRET,
                               { expiresIn: 3600  },
                               (err, token) => {
                                   if (err) throw err;
                                   res.json({
                                       token,
                                       user: {
                                           id: user.id,
                                           name: user.name,
                                           email: user.email
                                       }
                                   })
                               }
                           )
                       })
               })
            });
        });
});

module.exports = router;
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("../../middleware/auth");

const router = express.Router();

require('dotenv').config();

const User = require('../../models/user');

router.post('/', (req, res) => {
    const { email, password } = req.body;
    console.log(password);
    if (!( email && password)) {
        res.status(400).json({message: "All fields are required"});
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                res.status(400).json({message: "Wrong credentials"});
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        res.status(400).json({message: "Wrong credentials"});
                    }

                    jwt.sign(
                        { id: user.id},
                        process.env.JWT_SECRET,
                        { expiresIn: 3600  },
                        (err, token) => {
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
        });
});

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
});

module.exports = router;
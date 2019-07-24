const db = require('mongoose');

const UserSchema = new db.Schema ({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    registration_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = db.model('user', UserSchema);
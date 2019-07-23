const db = require('mongoose');

const ItemSchema = new db.Schema ({
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Item = db.model('item', ItemSchema);
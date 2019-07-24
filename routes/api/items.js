const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");

const Item = require('../../models/Item');

router.get('/', auth, (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
        .then(item => res.json(item))
        .catch(err => console.log(err));

});

router.delete('/:id', auth, (req, res) => {
    Item.remove({_id: req.params.id}, (err, items) => {
        if (err)
            res.status(404).json({success: false});
        Item.find((err, items) => {
            if (err)
                console.log(err);
            res.json(items);
        })
    })

});


module.exports = router;
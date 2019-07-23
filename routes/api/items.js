const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
        .then(item => res.json(item))
        .catch(err => console.log(err));

});

router.delete('/:id', (req, res) => {
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
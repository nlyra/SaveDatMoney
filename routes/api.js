const express = require('express');
const User = require('../models/user');
const Category = require('../models/category');
const Transaction = require('../models/transaction');

const router = express.Router();

// Routes
router.get('/', (req, res) => {
    User.find({})
        .then((data) => {
            console.log('User: ', data);
            res.json(data);
        }).catch((error) => {
            console.log('error', daerrorta);
        });
});

module.exports = router;
const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('video');
});

module.exports = router;
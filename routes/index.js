const express = require('express');
const router = express.Router();
const auth = require('../lib/auth.js');

router.get('/', (req, res, next) => {
    console.log('/', req.user);
    const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
    res.render('index', {auth: rauth});
});

module.exports = router;
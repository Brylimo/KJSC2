const express = require('express');
const router = express.Router();
const auth = require('../lib/auth.js');

router.get('/', (req, res, next) => {
    const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
    res.render('video', {auth: rauth});
});

module.exports = router;
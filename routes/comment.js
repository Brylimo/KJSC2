const express = require('express');
const router = express.Router();

module.exports = function (db) {

    router.get('/', (req, res, next) => {
        db.query(`SELECT * FROM kjscComment`, (err, rows) => {
            res.render('comment', {rows: rows.reverse()});
        });
    });

    router.get('/create_comment', (req, res, next) => {
        res.render('create_comment');
    });

    router.post('/create_process', (req, res, next) => {
        let sql = `INSERT INTO kjscComment (title, name, content, created) VALUES (?, ?, ?, NOW())`;
        let title = req.body.title;
        let name = req.body.name;
        let content = req.body.content;
        let params = [title, name, content];
        db.query(sql, params, (err, rows) => {
            if (err) {
                throw err;
            }
        });
        res.redirect('/comment');
    });

    return router;
};
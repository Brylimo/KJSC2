const express = require('express');
const router = express.Router();
const auth = require('../lib/auth.js');

module.exports = function (db) {

    router.get('/', (req, res, next) => {
        const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
        db.query(`SELECT * FROM kjscComment`, (err, rows) => {
               res.render('comment', {rows: rows.reverse(), auth: rauth});
        });
    });

    router.get('/create_comment', (req, res, next) => {
        const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
        res.render('create_comment', {auth: rauth});
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
            res.redirect('/comment');
        });
    });

    router.get('/:userId', (req, res, next) => {
        const userid = req.params['userId'];
        const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
        db.query(`SELECT * FROM kjscComment WHERE id = ?`, [userid], (err, row)=>{
            res.render('description', {row : row[0], auth: rauth});
        });
    });

    router.get('/:userId/update', (req, res, next) => {
        const userid = req.params['userId'];
        const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
        db.query(`SELECT * FROM kjscComment WHERE id = ?`, [userid], (err, row)=>{
            res.render('update_comment', {row: row[0], auth: rauth});
        });
    });

    router.post('/:userId/update_process', (req, res, next)=>{
        let sql = `UPDATE kjscComment SET title=?, content=? WHERE id=?`;
        let title = req.body.title;
        let content = req.body.content;
        let id = req.body.id;
        let params = [title, content, id];
        db.query(sql, params, (err, rows) => {
            if (err) {
                throw err;
            }
            res.redirect('/comment');
        });
    });

    router.post('/:userId/delete_process', (req, res, next)=>{
        let sql = `DELETE FROM kjscComment WHERE id = ?`;
        let id = req.body.id;
        let params = [id];
        db.query(sql, params, (err, row) => {
            if(err){
                throw err;
            }
            res.redirect('/comment');
        });
    });

    return router;
};
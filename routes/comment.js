const { response } = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../lib/auth.js');

const isAccessible = (req, res, row) => {
    const currentUser = req.user.uid;
    const dbUser = row[0].uid;
    if (currentUser === dbUser) {
        return true;
    } else {
        return false;
    }
}

module.exports = function (db) {

    router.get('/', (req, res, next) => {
        if(!auth.isOwner(req,res)){
            res.redirect('/');
            return false;
        }
        const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
        db.query(`SELECT * FROM kjscComment LEFT JOIN kjscUser ON kjscComment.uid=kjscUser.uid`, (err, rows) => {
            res.render('comment', {rows: rows.sort((a, b) => b.cid - a.cid), auth: rauth});
        });
    });

    router.get('/create_comment', (req, res, next) => {
        if(!auth.isOwner(req,res)){
            res.redirect('/');
            return false;
        }
        const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
        res.render('create_comment', {auth: rauth});
    });

    router.post('/create_process', (req, res, next) => {
        let sql = `INSERT INTO kjscComment (title, content, created, uid) VALUES (?, ?, NOW(), ?)`;
        let title = req.body.title;
        let content = req.body.content;
        let userid = req.user.uid;
        let params = [title, content, userid];
        db.query(sql, params, (err, rows) => {
            if (err) {
                throw err;
            }
            res.redirect('/comment');
        });
    });

    router.get('/:userId', (req, res, next) => {
        if(!auth.isOwner(req,res)){
            res.redirect('/');
            return false;
        }
        const userid = req.params['userId'];
        const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
        db.query(`SELECT * FROM kjscComment LEFT JOIN kjscUser ON kjscComment.uid=kjscUser.uid WHERE kjscComment.cid = ?`, [userid], (err, row)=>{
            const answer = isAccessible(req, res, row);
            res.render('description', {row : row[0], auth: rauth, answer: answer});
        });
    });

    router.get('/:userId/update', (req, res, next) => {
        if(!auth.isOwner(req,res)){
            res.redirect('/');
            return false;
        }
        const userid = req.params['userId'];
        const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
        db.query(`SELECT * FROM kjscComment LEFT JOIN kjscUser ON kjscComment.uid=kjscUser.uid WHERE kjscComment.cid = ?`, [userid], (err, row)=>{
            const answer = isAccessible(req, res, row);
            if (answer){
                res.render('update_comment', {row: row[0], auth: rauth});
            } else {
                res.redirect('/comment');
            }
            
        });
    });

    router.post('/:userId/update_process', (req, res, next)=>{
        let sql = `UPDATE kjscComment SET title=?, content=? WHERE cid=?`;
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
        let sql = `DELETE FROM kjscComment WHERE cid = ?`;
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
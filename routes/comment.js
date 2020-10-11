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
            res.redirect('/comment');
        });
    });

    router.get('/:userId', (req, res, next) => {
        const userid = req.params['userId'];
        db.query(`SELECT * FROM kjscComment WHERE id = ?`, [userid], (err, row)=>{
            res.render('description', {row : row[0]});
        });
    });

    router.get('/:userId/update', (req, res, next) => {
        const userid = req.params['userId'];
        db.query(`SELECT * FROM kjscComment WHERE id = ?`, [userid], (err, row)=>{
            res.render('update_comment', {row: row[0]});
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
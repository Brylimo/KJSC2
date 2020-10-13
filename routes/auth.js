const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../lib/auth.js');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

module.exports = function(passport, db) {
    
    router.get('/login', (req, res, next) => {
        const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
        const fmsg = req.flash();
        let feedback ='';
        if(fmsg.error) {
            feedback = fmsg.error[0];
        }
        res.render('login', {auth: rauth, feedback: feedback});
    });

    router.post('/login_process', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash:true,
    }));

    router.get('/logout', (req, res, next) => {
        req.logout();
        req.session.save(function(err){
            res.redirect('/');
        });
    });
    
    router.get('/register', (req, res, next) => {
        const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
        res.render('register', {auth: rauth});
    });

    router.post('/register_process', (req, res, next) => {
        const rauth = {own: auth.isOwner(req, res), user: auth.user(req, res)};
        let name = req.body.name;
        let id = req.body.id;
        let pwd = req.body.pwd;
        let pwd2 = req.body.pwd2;

        if (pwd !== pwd2){
            req.flash('error', '❌회원가입 오류❌\n비밀번호가 반드시 같아야합니다!');
            const fmsg = req.flash();
            let feedback ='';
            if(fmsg.error) {
                feedback = fmsg.error[0];
            }
            res.render('register', {auth: rauth, feedback: feedback});
        } else if(pwd.length < 6){
            req.flash('error', '❌회원가입 오류❌\n비밀번호는 반드시 6자 이상이어야 합니다!');
            const fmsg = req.flash();
            let feedback ='';
            if(fmsg.error) {
                feedback = fmsg.error[0];
            }
            res.render('register', {auth: rauth, feedback: feedback});
        } else {
            db.query(`SELECT * FROM kjscUser WHERE userid = ?`, [id], (err, row) => {
                const user1 = row[0];
                if (user1) {
                    req.flash('error', '❌회원가입 오류❌\n이미 존재하는 아이디입니다.');
                    const fmsg = req.flash();
                    let feedback ='';
                    if(fmsg.error) {
                        feedback = fmsg.error[0];
                    }
                    return res.render('register', {auth: rauth, feedback: feedback});
                } else {
                    db.query(`SELECT * FROM kjscUser WHERE username = ?`, [name], (err, row) => {
                        const user1 = row[0];
                        if (user1) {
                            req.flash('error', '❌회원가입 오류❌\n유저이름이 이미 존재합니다.');
                            const fmsg = req.flash();
                            let feedback ='';
                            if(fmsg.error) {
                                feedback = fmsg.error[0];
                            }
                            return res.render('register', {auth: rauth, feedback: feedback});
                        } else {
                            bcrypt.hash(pwd, 10, function(err, hash){
                                let sql = `INSERT INTO kjscUser (username, userid, pwd) VALUES (?, ?, ?)`;
                                let params = [name, id, hash];
                                const user = {
                                    id: -1,
                                    username: name,
                                    userid: id,
                                    pwd: hash
                                };
                                db.query(sql, params, (err, row) => {
                                    if (err) {
                                        throw err;
                                    }
                                    req.login(user, function(err){
                                        return res.redirect('/');
                                    })
                                });
                            });
                        }
                    });
                }
            });
        }
    });

    return router;
}
const bcrypt = require('bcrypt');

module.exports = function(app, db) {

    const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        console.log('serializeUser', user);
        done(null, user.userid);
    });

    passport.deserializeUser(function(id, done) {
        console.log('deserializeUser', id);
        db.query(`SELECT * FROM kjscUser WHERE userid = ?`, [id], (err, row) => {
            done(null, row[0]);
        });
    })

    passport.use(new LocalStrategy(
    {
        usernameField: 'id',
        passwordField: 'pwd'
    },
    function(id, password, done) {
        console.log('LocalStrategy', id, password);
        db.query(`SELECT * FROM kjscUser WHERE userid = ?`, [id], (err, row) => {
            const user = row[0];
            if (user) {
                bcrypt.compare(password, user.pwd, function(err, result){
                    if (result) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: '비밀번호가 틀립니다.'
                        });
                    }
                });
            } else {
                return done(null, false, {
                    message: '아이디가 틀립니다.'
                });
            }
        });
    }));

    return passport;
}

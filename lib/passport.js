const bcrypt = require('bcrypt');

module.exports = function(app) {

    const authData = {
        id: 'egoing',
        password: '111',
        nickname: 'egoing'
    }

    const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        done(null, authData);
    })

    passport.use(new LocalStrategy(
    {
            usernameField: 'id',
            passwordField: 'pwd'
    },
    function(id, password, done) {
        console.log('LocalStrategy', id, password);
        if (id === authData.id){
            /* bcrypt.compare(password, user.password, function(err, result){
                if(result){

                }else{

                }
            });*/
            if (password === authData.password) {
                return done(null, authData);
            } else {
                return done(null, false, {
                    message: '비밀번호가 틀립니다.'
                });
            }
        } else {
            return done(null, false, {
            message: '아이디가 틀립니다.'
        });
    }
    }
));

    return passport;
}

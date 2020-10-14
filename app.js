const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql2');
const LokiStore = require('connect-loki')(session)
const flash = require('connect-flash');
const favicon = require('serve-favicon');
//const FileStore = require('session-file-store')(session);

const data = fs.readFileSync('./mysql.json');
const conf = JSON.parse(data);
const db = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database
});
db.connect();

const app = express();
const port = process.env.PORT || 3000;

app.locals.pretty = true;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public','img','dog.png')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new LokiStore()
}));
app.use(cookieParser());
app.use(flash());

const passport = require('./lib/passport')(app, db);

const indexRouter = require('./routes/index');
const commentRouter = require('./routes/comment')(db);
const videoRouter = require('./routes/video');
const authRouter = require('./routes/auth')(passport, db);

app.use('/', indexRouter);
app.use('/comment', commentRouter);
app.use('/video', videoRouter);
app.use('/auth', authRouter);
app.use(function(err, req, res, next) {
    console.log(err);
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log("server is running...");
})
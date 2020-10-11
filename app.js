const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');

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

const indexRouter = require('./routes/index');
const commentRouter = require('./routes/comment')(db);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/comment', commentRouter);

app.listen(port, ()=>{
    console.log("server is running...");
})
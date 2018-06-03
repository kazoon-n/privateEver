//各種宣言
var express = require('express');
var post = require('./routes/post');
var bodyParser = require('body-parser');
var logger = require('morgan');

var connect = require('connect');
var methodOverride = require('method-override');

var cookieParser   = require('cookie-parser');
var expressSession = require('express-session');
var csrf           = require('csurf');

var app = express();

//ディレクトリ指定
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// csrf対策
app.use(cookieParser());
app.use(expressSession({secret: 'fdsafdsaf'}));
app.use(csrf());
app.use(function(req, res, next) {
    res.locals.csrftoken = req.csrfToken();
    next();
});


//Logger pkg
app.use(logger('dev'));

// routing
app.get('/', post.index);
app.get('/posts/:id([0-9]+)', post.show);
app.get('/posts/new', post.new);
app.post('/posts/create', post.create);
app.get('/posts/:id/edit', post.edit);
//putとdeleteはオリジナルメソッド
app.put('/posts/:id', post.update);
app.delete('/posts/:id', post.destroy);


//エラー発生時処理-show message contents
app.use(function(err, req, res, next) {
    res.send(err.message);
});

app.listen(3000);
console.log("server starting...");
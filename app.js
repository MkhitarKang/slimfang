var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 20180324 Mkhitaryan
var http = require('http');
var HSCard = require('./service/HSCard');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 20180324 Mkhitaryan
//var HearthRouter = require('./routes/Hearthroutes');

var app = express();

// 20180324 Mkhitaryan
var ejs = require('ejs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 20180324 Mkhitaryan
//app.set('view engine', 'jade');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 20180324 Mkhitaryan
//获得所有的卡牌列表
app.get('/HearthStone/list', HSCard.list);
// //添加
// app.post('/HearthStone/list/card', HSCard.add);
// //删除
// app.delete('/HearthStone/list/id/:id', HSCard.del);
// //更新
// app.put('/HearthStone/list/card', HSCard.update);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
}); 

module.exports = app;

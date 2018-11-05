var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const imitations = require("./routes/imitations");
const factories = require("./routes/factories");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/imitations', imitations.findAll);
app.get('/imitations/reports', imitations.findTotalReports);
app.get('/imitations/:id', imitations.findOne);
app.get('/imitations/brand', imitations.findByBrand);
app.get('/factories', factories.findAll);
app.get('/factories/:id', factories.findOne);
app.get('/factories/reports', factories.findTotalReports);

app.post('/imitations',imitations.addImitation);
app.post('/factories',factories.addFactory);

app.put('/imitations/:id/report', imitations.incrementReports);
app.put('/factories/:id/report', factories.incrementReports);


app.delete('/factories/:id', factories.deleteFactory);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

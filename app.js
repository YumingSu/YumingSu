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
app.get('/imitations/brands/:brand', imitations.findByBrand);
app.get('/factories', factories.findAll);
app.get('/factories/:id', factories.findOne);
app.get('/factories/reports', factories.findTotalReports);
app.get('/factories/places/:place', factories.findByPlace);

app.post('/imitations',imitations.addImitation);
app.post('/factories',factories.addFactory);

app.put('/imitations/:id/report', imitations.incrementReports);
app.put('/factories/:id/report', factories.incrementReports);

app.delete('/imitations/:id', imitations.deleteImitation);
app.delete('/factories/:id', factories.deleteFactory);


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




module.exports = app;

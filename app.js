var createError = require('http-errors');
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var passport = require('passport');
var port = process.env.PORT || 8042;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session');
var flash = require('express-flash-notification');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//modelos
var models = require('./models/ind');
models.sequelize.sync().then(() => {
    console.log('Se ha conectado a geolocalizacion');
}).catch(err => {
    console.log(err, "Hubo un error");
});
//load passport strategies
require('./config/pasaporte/passport.js')(passport, models.cuenta, models.persona, models.rol);


app.use(session({
    secret: 'cuarto-sistemas-A',
    resave: true,
    saveUninitialized: true,
    pauseStream: true

}));
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(passport.initialize()); 
app.use(passport.session()); // persistent login sessions

app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);
app.use(usersRouter);

//models

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


/*******************************
File Name: app.js
Description: A customized expressJS module. It is used to mount the middlewares and handle error requests.
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotdev = require('dotenv');

// Load configuration
dotdev.config();

/* Authentication modules */
let passport = require('passport');
let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// database setup
const db = require('./server/config/db');
db.initializeDBConnection();

/* Routes */
const surveyRouter = require('./server/routes/survey');
const userRouter = require('./server/routes/user');
const adminRouter = require('./server/routes/admin');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors()); // Enable all CORS

//intialize passport
app.use(passport.initialize());

//implement a user authentication Strategy
let User = require('./server/models/user');
passport.use(User.createStrategy()); 

//serialize and deserialize user object info -encrypt and decrypt
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// JWT strategy
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_KEY;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => done(null, user))
    .catch(err => done(err, false));
});
passport.use(strategy);

// routing
app.use('/survey', surveyRouter);
app.use('/user', userRouter); // Route for authentication
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json(err);
});

module.exports = app;

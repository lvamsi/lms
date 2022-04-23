var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var membersRouter = require('./routes/member');
var searchRouter = require('./routes/search');
var cardDetailsRouter = require('./routes/carddetails');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/members', membersRouter);
app.use('/search', searchRouter);
app.use('/misc',cardDetailsRouter);

module.exports = app;

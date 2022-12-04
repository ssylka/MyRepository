'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});


//===============================================
// Routes
//===============================================

//=========================
// API v0
//=========================

app.use('/grade', require('./routes/v0/grade'));
app.use('/group', require('./routes/v0/group'));
app.use('/room', require('./routes/v0/room'));
app.use('/schedule', require('./routes/v0/schedule'));
app.use('/subject', require('./routes/v0/subject'));
app.use('/teacher', require('./routes/v0/teacher'));
app.use('/time', require('./routes/v0/time'));

app.use('/APIv0/grade', require('./routes/v0/grade'));
app.use('/APIv0/group', require('./routes/v0/group'));
app.use('/APIv0/room', require('./routes/v0/room'));
app.use('/APIv0/schedule', require('./routes/v0/schedule'));
app.use('/APIv0/subject', require('./routes/v0/subject'));
app.use('/APIv0/teacher', require('./routes/v0/teacher'));
app.use('/APIv0/time', require('./routes/v0/time'));

//=========================
// API v1
//=========================

app.use('/APIv1/auth', require('./routes/v1/auth'));
app.use('/APIv1/grade', require('./routes/v1/grade'));
app.use('/APIv1/group', require('./routes/v1/group'));
app.use('/APIv1/lesson', require('./routes/v1/lesson'));
app.use('/APIv1/room', require('./routes/v1/room'));
app.use('/APIv1/schedule', require('./routes/v1/schedule'));
app.use('/APIv1/subject', require('./routes/v1/subject'));
app.use('/APIv1/teacher', require('./routes/v1/teacher'));
app.use('/APIv1/time', require('./routes/v1/time'));
app.use('/APIv1/week', require('./routes/v1/week'));

//===============================================
// Error handling
//===============================================

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    // development error handler
    // will print stacktrace
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
        });
    });
}

// global exception handling
process.on('uncaughtException', (err) => {
    // handle the error safely
    console.error('unhandled error', err);
});


module.exports = app;

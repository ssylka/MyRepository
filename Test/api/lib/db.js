'use strict';

var db = require('pg');

var dbConfig = require('../config/db');


db.on('error', err => console.error('connection failed', err));


function connect(callback) {
    db.connect(dbConfig, callback);
}


function query(str, data, callback) {
    connect((connectionError, client, done) => {
        if (connectionError) {
            done();
            callback(connectionError, undefined);
            return;
        }
        client.query(str, data, (queryError, result) => {
            done();
            callback(queryError, result);
        });
    });
}


module.exports = { connect, query };

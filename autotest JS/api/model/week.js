'use strict';

let db = require('../lib/db');


function get(callback) {
    db.query('select * from Week_get() as week', [], callback);
}

function set({ year, month, day }, callback) {
    let date = Number(year) + '-' + Number(month) + '-' + Number(day);
    db.query('select * from Week_set($1) as res', [ date ], callback);
}


module.exports = { get, set };

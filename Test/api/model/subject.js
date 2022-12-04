'use strict';

let db = require('../lib/db');


function list(callback) {
    db.query('select * from Subject_get()', [], callback);
}

function add({ name, abbr }, callback) {
    db.query('select * from Subject_add($1, $2) as res', [ name, abbr ], callback);
}

function del(id, callback) {
    db.query('select * from Subject_delete($1)', [ id ], callback);
}

function upd(id, { name, abbr }, callback) {
    db.query('select * from Subject_update($1, $2, $3)', [ id, name, abbr ], callback);
}

module.exports = { list, add, upd, del };

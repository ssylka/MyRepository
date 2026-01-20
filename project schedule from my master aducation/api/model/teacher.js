'use strict';

var db = require('../lib/db');

/**
 * @typedef {object} teacher_t
 * @property {number} id
 * @property {string} name
 * @property {string} degree
 */


function list(callback) {
    db.query('select * from Teacher_get()', [], callback);
}

function add({ name, degree }, callback) {
    db.query('select * from Teacher_add($1, $2) as res', [ name, degree ], callback);
}

function del(id, callback) {
    db.query('select * from Teacher_delete($1)', [ id ], callback);
}

function upd(id, { name, degree }, callback) {
    db.query('select * from Teacher_update($1, $2, $3)', [ id, name, degree ], callback);
}

module.exports = { list, add, upd, del };

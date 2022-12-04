'use strict';

let db = require('../lib/db');

/**
 * @typedef {object} grade_t
 * @property {number} id
 * @property {number} num
 * @property {string} degree
 */


function list(callback) {
    db.query('select * from Grade_get()', [], callback);
}

function add({ num, degree }, callback) {
    db.query('select * from Grade_add($1, $2) as res', [ num, degree ], callback);
}

function del(id, callback) {
    db.query('select * from Grade_delete($1)', [ id ], callback);
}

function upd(id, { num, degree }, callback) {
    db.query('select * from Grade_update($1, $2, $3)', [ id, num, degree ], callback);
}

module.exports = { list, add, upd, del };
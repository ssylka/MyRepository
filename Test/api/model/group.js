'use strict';

let db = require('../lib/db');

/**
 * @typedef {object} group_t
 * @property {number} id
 * @property {number} num
 * @property {number} gradeid
 * @property {string} [name]
 */


function forGrade(gradeID, callback) {
    db.query('select * from Group_get($1::int)', [ gradeID ], callback);
}

function forTeacher(teacherID, callback) {
    db.query('select * from Teacher_getGroups($1::int) as res', [ teacherID ], callback);
}

function forRoom(roomID, callback) {
    db.query('select * from Room_getGroups($1::int) as res', [ roomID ], callback);
}

function forUber(roomID, callback) {
    db.query('select * from Uber_getGroups($1::int, \'\')', [ uberID ], callback);
}

function add({ num, name, gradeID }, callback) {
    var sql = 'select * from Group_add($1, $2::int, $3::int) as res';
    db.query(sql, [ name, num, gradeID ], callback);
}

function del(id, callback) {
    db.query('select * from Group_delete($1)', [ id ], callback);
}

function upd(id, { name, num, gradeid }, callback) {
    db.query('select * from Group_update($1, $2, $3, $4)', [ id, name, num, gradeid ], callback);
}

module.exports = { forGrade, forTeacher, forRoom, forUber, add, upd, del };
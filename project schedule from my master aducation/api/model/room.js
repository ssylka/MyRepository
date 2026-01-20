'use strict';

let db = require('../lib/db');

/**
 * @typedef {object} room_t
 * @property {number} id
 * @property {string} name
 */


function list(callback) {
    db.query('select * from Room_get()', [], callback);
}

function time(dayOfWeek, beginHour, beginMinute, endHour, endMinute, callback) {
    db.query('select * from Room_getForTime($1, $2, $3, $4, $5)', [ dayOfWeek, beginHour, beginMinute, endHour, endMinute ], callback);
}

function timerange(dayOfWeek, beginHour, beginMinute, endHour, endMinute, callback) {
    db.query('select * from Room_getForTimeRange($1, $2, $3, $4, $5)', [ dayOfWeek, beginHour, beginMinute, endHour, endMinute ], callback);
}

function add({ name }, callback) {
    db.query('select * from Room_add($1) as res', [ name ], callback);
}

function del(id, callback) {
    db.query('select * from Room_delete($1)', [ id ], callback);
}

function upd(id, { name }, callback) {
    db.query('select * from Room_update($1, $2)', [ id, name ], callback);
}

function init(callback) {
    db.query('select * from init_tablesForRoomSearch()', [], callback);
}

function usage(callback) {
    db.query('select * from room_load_by_days()', [], callback);
}

module.exports = { list, add, upd, del, time, timerange, init, usage };

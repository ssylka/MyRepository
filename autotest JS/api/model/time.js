'use strict';

let db = require('../lib/db');

/**
 * @typedef {object} time_t
 * @property {number} [hours]
 * @property {number} [minutes]
 */


function list(callback) {
    db.query('select * from Times_get()', [], callback);
}


module.exports = { list };

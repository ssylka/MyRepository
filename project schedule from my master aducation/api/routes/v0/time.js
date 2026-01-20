'use strict';

let express = require('express');
let router = express.Router();
let time = require('../../model/time');
let week = require('../../model/week');


/**
 * @api {get} /APIv0/time/list Request list of times
 * @apiName GetTimesList
 * @apiGroup Time
 * @apiVersion 0.1.0
 *
 * @apiSuccess (200) {Object[]} time
 * @apiSuccess (200) {Number} time.id
 * @apiSuccess (200) {Number} time.num
 * @apiSuccess (200) {Object} time.cbeg
 * @apiSuccess (200) {Number} time.cbeg.hours
 * @apiSuccess (200) {Number} [time.cbeg.minutes=0]
 * @apiSuccess (200) {Object} time.cend
 * @apiSuccess (200) {Number} time.cend.hours
 * @apiSuccess (200) {Number} [time.cend.minutes=0]
 *
 * @apiSuccessExample {json} Success-Response:
[
    { "id": 1, "num": 0, "cbeg": { "hours": 8 }, "cend": { "hours": 9, "minutes": 35 } },
    { "id": 2, "num": 1, "cbeg": { "hours": 9, "minutes": 50 }, "cend": { "hours": 11, "minutes": 25 } }
]
 */
router.get('/list', (req, res, next) => {
    time.list((err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send(data.rows);
    });
});

/**
 * @api {get} /APIv0/time/week Request current week
 * @apiName GetCurrentWeek
 * @apiGroup Time
 * @apiVersion 0.1.0
 *
 * @apiSuccess (200) {Number=0,1} type 0 - upper, 1 - lower
 *
 * @apiSuccessExample {json} Success-Response:
{ "type": 1 }
 */
router.get('/week', (req, res, next) => {
    week.get((err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send({
            type: data.rows[0].week,
        });
    });
});


module.exports = router;
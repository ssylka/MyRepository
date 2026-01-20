'use strict';

let express = require('express');
let router = express.Router();
let auth = require('../../lib/auth');
let week = require('../../model/week');


/**
 * @api {get} /APIv1/week Request current week
 * @apiName GetCurrentWeek
 * @apiGroup Time
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Number=0,1} week 0 - upper, 1 - lower
 *
 * @apiSuccessExample {json} Success-Response:
{ "week": 1 }
 */
router.get('/', (req, res, next) => {
    week.get((err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send(data.rows[0]);
    });
});

/**
 * @api {post} /APIv1/week Set current week
 * @apiName SetCurrentWeek
 * @apiGroup Time
 * @apiVersion 1.0.0
 *
 * @apiPermission manager (add "APIKey" to query string)
 *
 * @apiParam {Number} year
 * @apiParam {Number} month
 * @apiParam {Number} day
 */
router.post('/', (req, res, next) => {
    auth.checkRights(req, res);
    
    let info = req.body;

    week.set(info, (err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send({});
    });
});


module.exports = router;
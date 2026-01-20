'use strict';

let express = require('express');
let router = express.Router();
let auth = require('../../lib/auth');
let room = require('../../model/room');


/**
 * @api {get} /APIv1/room/list Request list of rooms
 * @apiName GetRoomList
 * @apiGroup Room
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} rooms
 * @apiSuccess (200) {Number} rooms.id
 * @apiSuccess (200) {String} rooms.name
 *
 * @apiSuccessExample {json} Success-Response:
[
    { "id": 11, "name": "201" },
    { "id": 12, "name": "202" },
    { "id": 13, "name": "203" }
]
 */
router.get('/list', (req, res, next) => {
    room.list((err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send(data.rows);
    });
});


/**
 * @api {get} /APIv1/room/v1/time Request list of empty rooms in given period of time
 * @apiName GetEmptyRoomList
 * @apiGroup Room
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} rooms
 * @apiSuccess (200) {Number} rooms.id
 * @apiSuccess (200) {String} rooms.name
 * @apiSuccess (200) {Integer} rooms.parent
 *
 * @apiSuccessExample {json} Success-Response:
 [
 { "id": 11, "name": "201", "parent": null },
 { "id": 12, "name": "202", "parent": null },
 { "id": 13, "name": "203", "parent": null }
 ]
 */
router.get('/v1/:dd/:bh/:bm/:eh/:em', (req, res, next) => {
    let dayOfWeek = req.params.dd;
    let beginHour = req.params.bh;
    let beginMinute = req.params.bm;
    let endHour = req.params.eh;
    let endMinute = req.params.em;

    room.time(dayOfWeek, beginHour, beginMinute, endHour, endMinute,  (err, data) => {
        if (err) {
            next(err);
            return;
        }
        res.send(data.rows);
    });
});

router.get('/init', (req, res, next) => {
    room.init((err, data) => {
        if (err) {
            next(err);
            return;
        }
        res.send('OK!');
    })
});

router.get('/usage', (req, res, next) => {
    room.usage((err, data) => {
        if (err) {
            next(err);
            return;
        }
        res.send(data.rows);
    })
});

/**
 * @api {get} /APIv1/room/v2/time Request list of empty rooms in given period of time
 * @apiName GetEmptyRoomList
 * @apiGroup Room
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} rooms
 * @apiSuccess (200) {Number} rooms.id
 * @apiSuccess (200) {String} rooms.name
 * @apiSuccess (200) {Integer} rooms.parent
 *
 * @apiSuccessExample {json} Success-Response:
 [
 { "id": 11, "name": "201", "parent": null },
 { "id": 12, "name": "202", "parent": null },
 { "id": 13, "name": "203", "parent": null }
 ]
 */
router.get('/v2/:dd/:bh/:bm/:eh/:em', (req, res, next) => {
    let dayOfWeek = req.params.dd;
    let beginHour = req.params.bh;
    let beginMinute = req.params.bm;
    let endHour = req.params.eh;
    let endMinute = req.params.em;

    room.timerange(dayOfWeek, beginHour, beginMinute, endHour, endMinute,  (err, data) => {
        if (err) {
            next(err);
            return;
        }
        res.send(data.rows);
    });
});

/**
 * @api {put} /APIv1/room Add new room
 * @apiName AddRoom
 * @apiGroup Room
 * @apiVersion 1.0.0
 *
 * @apiPermission manager (add "APIKey" to query string)
 *
 * @apiParam {String} name
 *
 * @apiSuccess (200) {Number} id
 */
router.put('/', (req, res, next) => {
    auth.checkRights(req, res);

    let info = req.body;

    room.add(info, (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);
    });
});

router.delete('/:roomID', (req, res, next) => {
    auth.checkRights(req, res);

    let info = req.params.roomID;

    room.del(info, (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);

    });
});

router.post('/:roomID', (req, res, next) => {
    auth.checkRights(req, res);

    let info = [ req.params.roomID, req.body ];

    room.upd(info[0], info[1], (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);

    });
});

module.exports = router;

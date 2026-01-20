'use strict';

let express = require('express');
let router = express.Router();
let room = require('../../model/room');


/**
 * @api {get} /APIv0/room/list Request list of rooms
 * @apiName GetRoomList
 * @apiGroup Room
 * @apiVersion 0.1.0
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


module.exports = router;

'use strict';

let express = require('express');
let router = express.Router();
let auth = require('../../lib/auth');
let group = require('../../model/group');


/**
 * @api {get} /APIv1/group/forGrade/:gradeID Request list of groups on particular grade
 * @apiName GetGroupsList
 * @apiGroup Group
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} gradeID
 *
 * @apiSuccess (200) {Object[]} groups
 * @apiSuccess (200) {Number} groups.id
 * @apiSuccess (200) {String} groups.name
 * @apiSuccess (200) {Number} groups.num
 * @apiSuccess (200) {Number} groups.gradeid
 *
 * @apiSuccessExample {json} Success-Response:
[
    { "id": 70, "name": "ТК", "num": 10, "gradeid": 7 },
    { "id": 59, "name": "МЕХ", "num": 11, "gradeid": 7 }
]
 */
router.get('/forGrade/:gradeID', (req, res, next) => {
    let gradeID = req.params.gradeID;

    group.forGrade(gradeID, (err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send(data.rows);
    });
});

/**
 * @api {get} /APIv1/group/forUber/:uberID Request list of groups on particular ubergroup
 * @apiName GetGroupsForUbergroup
 * @apiGroup Group
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} uberID
 *
 * @apiSuccess (200) {Object[]} groups
 * @apiSuccess (200) {Number} groups.id
 * @apiSuccess (200) {String} groups.name
 * @apiSuccess (200) {Number} groups.num
 * @apiSuccess (200) {Number} groups.gradeid
 *
 * @apiSuccessExample {json} Success-Response:
[
    { "id": 68, "name": "МИТОУ", "num": 1, "gradeid": 6 },
    { "id": 69, "name": "ВМ", "num": 3, "gradeid": 6 }
]
 */
router.get('/forUber/:uberID', (req, res, next) => {
    let uberID = req.params.uberID;

    group.forUber(uberID, (err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send(data.rows);
    });
});

/**
 * @api {put} /APIv1/group Add new group
 * @apiName AddGroup
 * @apiGroup Group
 * @apiVersion 1.0.0
 *
 * @apiPermission manager (add "APIKey" to query string)
 *
 * @apiParam {Number} num
 * @apiParam {Number} gradeID
 * @apiParam {String} name
 *  
 * @apiSuccess (200) {Number} id
*/
router.put('/', (req, res, next) => {
    auth.checkRights(req, res);

    console.log(req)
    console.log("XXX")
    console.log(req.body)
    let info = req.body;

    group.add(info, (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);
    });
});

router.delete('/:groupID', (req, res, next) => {
    auth.checkRights(req, res);

    let info = req.params.groupID;

    group.del(info, (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);

    });
});

router.post('/:groupID', (req, res, next) => {
    auth.checkRights(req, res);

    let info = [ req.params.groupID, req.body ];

    group.upd(info[0], info[1], (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);

    });
});

module.exports = router;

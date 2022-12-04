'use strict';

let express = require('express');
let router = express.Router();
let group = require('../../model/group');


/**
 * @api {get} /APIv0/group/list/:gradeID Request list of groups on particular grade
 * @apiName GetGroupsList
 * @apiGroup Group
 * @apiVersion 0.1.0
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
router.get('/list/:gradeID', (req, res, next) => {
    let grade = req.params.gradeID;

    group.forGrade(grade, (err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send(data.rows);
    });
});

/**
 * @api {get} /APIv0/group/forUber/:uberID Request list of groups on particular ubergroup
 * @apiName GetGroupsForUbergroup
 * @apiGroup Group
 * @apiVersion 0.1.0
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


module.exports = router;

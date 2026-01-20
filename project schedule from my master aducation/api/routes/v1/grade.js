'use strict';

let express = require('express');
let router = express.Router();
let auth = require('../../lib/auth');
let grade = require('../../model/grade');


/**
 * @api {get} /APIv1/grade/list Request list of grades
 * @apiName GetGradeList
 * @apiGroup Grade
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} grades
 * @apiSuccess (200) {Number} grades.id
 * @apiSuccess (200) {Number} grades.num
 * @apiSuccess (200) {String="bachelor","master","specialist","postgraduate"} grades.degree
 *
 * @apiSuccessExample {json} Success-Response:
[
    { "id": 1, "num": 1, "degree": "bachelor" },
    { "id": 2, "num": 2, "degree": "bachelor" }
]
 */
router.get('/list', (req, res, next) => {
    grade.list((err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send(data.rows);
    });
});

/**
 * @api {put} /APIv1/grade Add new grade
 * @apiName AddGrade
 * @apiGroup Grade
 * @apiVersion 1.0.0
 *
 * @apiPermission manager (add "APIKey" to query string)
 *
 * @apiParam {Number} num
 * @apiParam {String="bachelor","master","specialist","postgraduate"} degree
 *  
 * @apiSuccess (200) {Number} id
 */
router.put('/', (req, res, next) => {
    auth.checkRights(req, res);

    let info = req.body;

    grade.add(info, (err, data) => {
        if (err || !Array.isArray(data.rows)) {
            next(err);
            return;
        }

        res.send(data.rows[0]);
    });
});

router.delete('/:gradeID', (req, res, next) => {
    auth.checkRights(req, res);

    let info = req.params.gradeID;

    grade.del(info, (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);

    });
});

router.post('/:gradeID', (req, res, next) => {
    auth.checkRights(req, res);

    let info = [ req.params.gradeID, req.body ];

    grade.upd(info[0], info[1], (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);

    });
});

module.exports = router;

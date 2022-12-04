'use strict';

let express = require('express');
let router = express.Router();
let grade = require('../../model/grade');


/**
 * @api {get} /APIv0/grade/list Request list of grades
 * @apiName GetGradeList
 * @apiGroup Grade
 * @apiVersion 0.1.0
 *
 * @apiSuccess (200) {Object[]} grades
 * @apiSuccess (200) {Number} grades.id
 * @apiSuccess (200) {Number} grades.num
 * @apiSuccess (200) {String="bachelor","master","specialist"} grades.degree
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

        res.send(data.rows.filter(grade => grade.degree !== 'postgraduate'));
    });
});


module.exports = router;

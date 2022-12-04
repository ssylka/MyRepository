'use strict';

let express = require('express');
let router = express.Router();
let subject = require('../../model/subject');


/**
 * @api {get} /APIv0/subject/list Request list of subjects
 * @apiName GetSubjectList
 * @apiGroup Subject
 * @apiVersion 0.1.0
 *
 * @apiSuccess (200) {Object[]} subjects
 * @apiSuccess (200) {Number} subjects.id
 * @apiSuccess (200) {String} subjects.name
 * @apiSuccess (200) {String} subjects.abbr
 *
 * @apiSuccessExample {json} Success-Response:
[
    {"id": 359, "name": "Теория сложности вычислений", "abbr": "Теор сложности" },
    {"id": 362, "name": "Теория функций действительного и комплексного переменного", "abbr": "" }
]
 */
router.get('/list', (req, res, next) => {
    subject.list((err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send(data.rows);
    });
});


module.exports = router;

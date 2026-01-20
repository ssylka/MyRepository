'use strict';

let express = require('express');
let router = express.Router();
let teacher = require('../../model/teacher');


/**
 * @api {get} /APIv0/teacher/list Request list of teachers
 * @apiName GetTeachersList
 * @apiGroup Teacher
 * @apiVersion 0.1.0
 *
 * @apiSuccess (200) {Object[]} teacher
 * @apiSuccess (200) {Number} teacher.id
 * @apiSuccess (200) {String} teacher.name
 * @apiSuccess (200) {String} teacher.degree
 *
 * @apiSuccessExample {json} Success-Response:
[
    { "id": 40, "name": "Демяненко Яна Михайловна", degree": "Доцент" },
    { "id": 41, "name": "Деундяк Владимир Михайлович", "degree": "Доцент" }
]
 */
router.get('/list', (req, res, next) => {
    teacher.list((err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send(data.rows);
    });
});


module.exports = router;

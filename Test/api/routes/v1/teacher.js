'use strict';

let express = require('express');
let router = express.Router();
let auth = require('../../lib/auth');
let teacher = require('../../model/teacher');


/**
 * @api {get} /APIv1/teacher/list Request list of teachers
 * @apiName GetTeachersList
 * @apiGroup Teacher
 * @apiVersion 1.0.0
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

/**
 * @api {put} /APIv1/teacher Add new teacher
 * @apiName AddTeacher
 * @apiGroup Teacher
 * @apiVersion 1.0.0
 *
 * @apiPermission manager (add "APIKey" to query string)
 *
 * @apiParam {String} name
 * @apiParam {String} degree
 *  
 * @apiSuccess (200) {Number} id
 */

router.put('/', (req, res, next) => {
    auth.checkRights(req, res);

    let info = req.body;

    teacher.add(info, (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);
    });
});

router.delete('/:teacherID', (req, res, next) => {
    auth.checkRights(req, res);

    let info = req.params.teacherID;

    teacher.del(info, (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);

    });
});

router.post('/:teacherID', (req, res, next) => {
    auth.checkRights(req, res);

    let info = [ req.params.teacherID, req.body ];

    teacher.upd(info[0], info[1], (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);

    });
});

module.exports = router;

'use strict';

let express = require('express');
let router = express.Router();
let auth = require('../../lib/auth');
let lesson = require('../../model/lesson');
let curriculum = require('../../model/curriculum');


router.get('/list_conflicts', (req, res, next) => {
    lesson.conflicts((err, conflictsData) => {
        if (err) {
            next(err);
            return;
        }

        res.send(conflictsData.rows);
    });
});

/**
 * @api {get} /APIv1/lesson/:ID Request lesson data & curricula
 * @apiName GetLesson
 * @apiGroup Lesson
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} lesson
 * @apiSuccess (200) {Number} lesson.id
 * @apiSuccess (200) {Number} lesson.uberid
 * @apiSuccess (200) {Number} lesson.subcount
 * @apiSuccess (200) {String} lesson.timeslot
 * @apiSuccess (200) {Object[]} curricula
 * @apiSuccess (200) {Number} curricula.id
 * @apiSuccess (200) {Number} curricula.lessonid
 * @apiSuccess (200) {Number} curricula.subnum
 * @apiSuccess (200) {Number} curricula.subjectid
 * @apiSuccess (200) {String} curricula.subjectname
 * @apiSuccess (200) {String} curricula.subjectabbr
 * @apiSuccess (200) {Number} curricula.teacherid
 * @apiSuccess (200) {String} curricula.teachername
 * @apiSuccess (200) {String} curricula.teacherdegree
 * @apiSuccess (200) {Number} curricula.roomid
 * @apiSuccess (200) {String} curricula.roomname
 *
 * @apiSuccessExample {json} Success-Response:
{
    "lesson": { "id": 13, "uberid": 6, "subcount": 1, "timeslot": "(1,09:50:00,11:25:00,full)" },

    "curricula": [ {
        "id": 12, "lessonid": 13,"subnum": 1,
        "subjectid": 408, "subjectname": "Языки программирования", "subjectabbr": "ЯП",
        "teacherid": 109, "teachername": "Михалкович Станислав Станиславович", "teacherdegree": "Доцент",
        "roomid": 18, "roomname": "211"
    } ]
}
 */
router.get('/:id', (req, res, next) => {
    let lessonID = req.params.id;

    lesson.get(lessonID, (err, lessonData) =>{
        if (err) {
            next(err);
            return;
        }

        curriculum.get(lessonID, (err, curriculumData) => {
            if (err) {
                next(err);
                return;
            }

            res.send({
                lesson: lessonData.rows[0],
                curricula: curriculumData.rows,
            });
        });
    });
});

/**
 * @api {put} /APIv1/lesson Add new lesson
 * @apiName AddLesson
 * @apiGroup Lesson
 * @apiVersion 1.0.0
 *
 * @apiPermission manager (add "APIKey" to query string)
 *
 * @apiParam {Number} lesson[day]
 * @apiParam {String} lesson[beg]
 * @apiParam {String} lesson[end]
 * @apiParam {String="upper","full","lower"} lesson[split]
 * @apiParam {Number} lesson[subcount]
 * @apiParam {Number[]} groups[]
 * @apiParam {Object[]} curricula
 * @apiParam {Number} curricula.subnum
 * @apiParam {Number} curricula.subject
 * @apiParam {Number} curricula.room
 * @apiParam {Number} curricula.teacher
 */
router.put('/', (req, res, next) => {
    auth.checkRights(req, res);

    let info = req.body;

    lesson.add(info.lesson, info.groups, (err, data) => {
        if (err) {
            next(err);
            return;
        }

        let lessonID = data.rows[0].res;
        curriculum.add(lessonID, info.curricula, (err, data) => {
            if (err) {
                next(err);
                return;
            }

            res.send({});
        });
    });
});

/**
 * @api {delete} /APIv1/lesson/:ID Delete lesson
 * @apiName DeleteLesson
 * @apiGroup Lesson
 * @apiVersion 1.0.0
 *
 * @apiPermission manager (add "APIKey" to query string)
 *
 * @apiParam {Number} ID
 */
router.delete('/:id', (req, res, next) => {
    auth.checkRights(req, res);

    let lessonID = req.params.id;

    lesson.remove(lessonID, (err, data) => {
        if (err || !data.rows || data.rows[0].res) {
            next(err);
            return;
        }

        res.send({});
    });

});


module.exports = router;

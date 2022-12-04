'use strict';

let express = require('express');
let router = express.Router();
let lesson = require('../../model/lesson');
let curriculum = require('../../model/curriculum');
let group = require('../../model/group');


/**
 * @api {get} /APIv1/schedule/group/:ID Request schedule of group
 * @apiName GetGroupSchedule
 * @apiGroup Schedule
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} ID
 *
 * @apiSuccess (200) {Object[]} lessons
 * @apiSuccess (200) {Number} lessons.id
 * @apiSuccess (200) {Number} lessons.uberid Ubergroup
 * @apiSuccess (200) {Number} lessons.subcount Count of subgroups
 * @apiSuccess (200) {String} lessons.timeslot
 *
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
    "lessons": [
        { "id": 463, "uberid": 62, "subcount": 1, "timeslot": "(2,17:40:00,19:15:00,upper)" },
        { "id": 641, "uberid": 62, "subcount": 1, "timeslot": "(4,15:50:00,17:25:00,full)" }
    ],

    "curricula": [ {
        "id": 641, "lessonid": 463, "subnum": 1,
        "subjectid": 46, "subjectname": "Верификация программоного обеспечения", "subjectabbr": "Вериф ПО",
        "teacherid": 45, "teachername": "Дубров Денис Владимирович", "teacherdegree": "Доцент",
        "roomid": 16, "roomname": "207"
    }, { "id":835, "lessonid":641, "subnum": 1,
        "subjectid": 296, "subjectname": "Разработка оптимизирующих компиляторов", "subjectabbr": "Разработка опт-х ком",
        "teacherid": 109, "teachername": "Михалкович Станислав Станиславович", "teacherdegree": "Доцент",
        "roomid": 42, "roomname": "315"
    } ]
}
 */
router.get('/group/:id', (req, res, next) => {
    let groupID = req.params.id;

    lesson.forGroup(groupID, (err, lessons) => {
        if (err) {
            next(err);
            return;
        }

        curriculum.forGroup(groupID, (err, curricula) => {
            if (err) {
                next(err);
                return;
            }

            res.send({
                lessons: lessons.rows,
                curricula: curricula.rows,
            });
        });
    });
});

/**
 * @api {get} /APIv1/schedule/teacher/:ID Request schedule of teacher
 * @apiName GetTeacherSchedule
 * @apiGroup Schedule
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} ID
 *
 * @apiSuccess (200) {Object[]} lessons
 * @apiSuccess (200) {Number} lessons.id
 * @apiSuccess (200) {Number} lessons.uberid Ubergroup
 * @apiSuccess (200) {Number} lessons.subcount Count of subgroups
 * @apiSuccess (200) {String} lessons.timeslot
 *
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
 * @apiSuccess (200) {Object[]} groups
 * @apiSuccess (200) {Number} groups.uberid
 * @apiSuccess (200) {Number} groups.groupnum
 * @apiSuccess (200) {Number} groups.gradenum
 * @apiSuccess (200) {String="bachelor","master","specialist"} groups.degree
 * @apiSuccess (200) {String} groups.name
 *
 * @apiSuccessExample {json} Success-Response:
{
    "lessons": [
        { "id": 77, "uberid": 23, "subcount": 2, "timeslot": "(0,11:55:00,13:30:00,lower)" },
        { "id": 95, "uberid": 15, "subcount": 2, "timeslot": "(3,09:50:00,11:25:00,full)" }
    ],

    "curricula": [ {
        "id": 105, "lessonid": 77, "subnum": 1,
        "subjectid": 258, "subjectname": "Паттерны проектирования приложений", "subjectabbr": "Паттерны прогр-ния п",
        "teacherid": 16, "teachername": "Белякова Юлия Вячеславовна", "teacherdegree": "Ассистент",
        "roomid": 2, "roomname": "102 (ММ3)"
    }, {
        "id": 128, "lessonid": 95, "subnum": 2,
        "subjectid": 266, "subjectname": "Практикум на ЭВМ", "subjectabbr": "Практ ЭВМ",
        "teacherid": 16, "teachername": "Белякова Юлия Вячеславовна", "teacherdegree": "Ассистент",
        "roomid": 8, "roomname": "118 (ММ1)"
    } ],

    "groups": [
        { "uberid": 15, "groupnum": 9, "gradenum": 2, "degree": "bachelor", "name": "NULL" },
        { "uberid": 23, "groupnum": 8, "gradenum": 3, "degree": "bachelor", "name": "NULL" }
    ]
}
 */
router.get('/teacher/:id', (req, res, next) => {
    let teacherID = req.params.id;

    lesson.forTeacher(teacherID, (err, lessons) => {
        if (err) {
            next(err);
            return;
        }

        curriculum.forTeacher(teacherID, (err, curricula) => {
            if (err) {
                next(err);
                return;
            }

            group.forTeacher(teacherID, (err, groups) => {
                if (err) {
                    next(err);
                    return;
                }

                res.send({
                    lessons: lessons.rows,
                    curricula: curricula.rows,
                    groups: groups.rows,
                });
            });
        });
    });
});

/**
 * @api {get} /APIv1/schedule/room/:ID Request schedule of room
 * @apiName GetRoomSchedule
 * @apiGroup Schedule
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} ID
 *
 * @apiSuccess (200) {Object[]} lessons
 * @apiSuccess (200) {Number} lessons.id
 * @apiSuccess (200) {Number} lessons.uberid Ubergroup
 * @apiSuccess (200) {Number} lessons.subcount Count of subgroups
 * @apiSuccess (200) {String} lessons.timeslot
 *
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
 * @apiSuccess (200) {Object[]} groups
 * @apiSuccess (200) {Number} groups.uberid
 * @apiSuccess (200) {Number} groups.groupnum
 * @apiSuccess (200) {Number} groups.gradenum
 * @apiSuccess (200) {String="bachelor","master","specialist", "postgraduate"} groups.degree
 * @apiSuccess (200) {String} groups.name
 *
 * @apiSuccessExample {json} Success-Response:
{
    "lessons": [
        { "id": 77, "uberid": 23, "subcount": 2, "timeslot": "(0,11:55:00,13:30:00,lower)" },
        { "id": 95, "uberid": 15, "subcount": 2, "timeslot": "(3,09:50:00,11:25:00,full)" }
    ],

    "curricula": [ {
        "id": 105, "lessonid": 77, "subnum": 1,
        "subjectid": 258, "subjectname": "Паттерны проектирования приложений", "subjectabbr": "Паттерны прогр-ния п",
        "teacherid": 16,"teachername": "Белякова Юлия Вячеславовна", "teacherdegree": "Ассистент",
        "roomid":2, "roomname": "102 (ММ3)"
    }, {
        "id": 128, "lessonid": 95, "subnum": 2,
        "subjectid": 266, "subjectname": "Практикум на ЭВМ", "subjectabbr": "Практ ЭВМ",
        "teacherid": 16, "teachername": "Белякова Юлия Вячеславовна", "teacherdegree": "Ассистент",
        "roomid": 8, "roomname": "118 (ММ1)"
    } ],
    
    "groups": [
        { "uberid": 15,"groupnum": 9, "gradenum": 2, "degree": "bachelor", "name": "NULL" },
        { "uberid": 23,"groupnum": 8, "gradenum": 3, "degree": "bachelor", "name": "NULL" }
    ]
}
 */
router.get('/room/:id', (req, res, next) => {
    let roomID = req.params.id;

    lesson.forRoom(roomID, (err, lessons) => {
        if (err) {
            next(err);
            return;
        }
        
        curriculum.forRoom(roomID, (err, curricula) => {
            if (err) {
                next(err);
                return;
            }

            group.forRoom(roomID, (err, groups) => {
                if (err) {
                    next(err);
                    return;
                }

                res.send({
                    lessons: lessons.rows,
                    curricula: curricula.rows,
                    groups: groups.rows,
                });
            });
        });
    });
});

/**
 * @api {get} /APIv1/schedule/grade/:ID Request schedule of grade
 * @apiName GetGradeSchedule
 * @apiGroup Schedule
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} ID
 *
 * @apiSuccess (200) {Object[]} groups
 * @apiSuccess (200) {Number} groups.id
 * @apiSuccess (200) {String} groups.name
 * @apiSuccess (200) {Number} groups.num
 * @apiSuccess (200) {Number} groups.gradeid
 *
 * @apiSuccess (200) {Object[]} lessons
 * @apiSuccess (200) {Number} lessons.id
 * @apiSuccess (200) {Number} lessons.uberid Ubergroup
 * @apiSuccess (200) {Number} lessons.subcount Count of subgroups
 * @apiSuccess (200) {String} lessons.timeslot
 *
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
    "groups": [
        { "id": 68, "name": "МИТОУ", "num": 1, "gradeid": 6 },
        { "id": 69, "name": "ВМ", "num": 3, "gradeid": 6 }
    ],

    "lessons": [
        { "id": 77, "uberid": 23, "groupid": 68, "subcount": 2, "timeslot": "(0,11:55:00,13:30:00,lower)" },
        { "id": 95, "uberid": 15, "groupid": 69, subcount": 2, "timeslot": "(3,09:50:00,11:25:00,full)" }
    ],

    "curricula": [ {
        "id": 105, "lessonid": 77, "subnum": 1,
        "subjectid": 258, "subjectname": "Паттерны проектирования приложений", "subjectabbr": "Паттерны прогр-ния п",
        "teacherid": 16,"teachername": "Белякова Юлия Вячеславовна", "teacherdegree": "Ассистент",
        "roomid":2, "roomname": "102 (ММ3)"
    }, {
        "id": 128, "lessonid": 95, "subnum": 2,
        "subjectid": 266, "subjectname": "Практикум на ЭВМ", "subjectabbr": "Практ ЭВМ",
        "teacherid": 16, "teachername": "Белякова Юлия Вячеславовна", "teacherdegree": "Ассистент",
        "roomid": 8, "roomname": "118 (ММ1)"
    } ]
}
 */
router.get('/grade/:id', (req, res, next) => {
    let gradeID = req.params.id;

    group.forGrade(gradeID, (err, groups) => {
        if (err) {
            next(err);
            return;
        }

        let data = {
            groups: groups.rows,
            lessons: [],
            curricula: [],
        };

        let cbCount = data.groups.length;

        data.groups.forEach(group => {
            let groupID = group.id;

            lesson.forGroup(groupID, (err, lessons) => {
                if (err) {
                    next(err);
                    return;
                }

                curriculum.forGroup(groupID, (err, curricula) => {
                    if (err) {
                        next(err);
                        return;
                    }

                    lessons.rows.forEach(lesson => lesson.groupid = groupID);
                    data.lessons = data.lessons.concat(lessons.rows);
                    data.curricula = data.curricula.concat(curricula.rows);

                    cbCount--;
                    if (!cbCount) res.send(data);
                });
            });
        });
    });
});


module.exports = router;

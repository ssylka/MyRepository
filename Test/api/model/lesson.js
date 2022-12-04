'use strict';

let db = require('../lib/db');


function forGroup(groupID, callback) {
    db.query('select * from Group_getLessons($1::int)', [ groupID ], callback);
}

function forTeacher(teacherID, callback) {
    db.query('select * from Teacher_getLessons($1::int)', [ teacherID ], callback);
}

function forRoom(roomID, callback) {
    db.query('select * from Room_getLessons($1::int)', [ roomID ], callback);
}

function conflicts(callback) {
    db.query('select * from Lesson_conflicts()', [], callback);
}

function add(lesson, groups, callback) {
    let groupList = '{' + groups.join(',') + '}';

    db.query('select * from Schedule_addLessonFull($1, $2::int, $3, $4, $5, $6) as res', [ groupList, lesson.subcount, lesson.day, lesson.beg, lesson.end, lesson.split ], callback);
}

function get(lessonID, callback) {
    db.query('select * from Lesson_get($1::int) as res', [ lessonID ], callback);
}

function remove(lessonID, callback) {
    db.query('select * from Schedule_deleteLesson($1::int) as res', [ lessonID ], callback);
}

module.exports = { forGroup, forTeacher, forRoom, conflicts, add, get, remove };

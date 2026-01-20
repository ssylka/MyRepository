'use strict';

let db = require('../lib/db');


function forGroup(groupID, callback) {
    db.query('select * from Group_getCurricula($1::int)', [ groupID ], callback);
}

function forTeacher(teacherID, callback) {
    db.query('select * from Teacher_getCurricula($1::int)', [ teacherID ], callback);
}

function forRoom(roomID, callback) {
    db.query('select * from Room_getCurricula($1::int)', [ roomID ], callback);
}

function forLesson(lessonID, callback) {
    db.query('select * from Curricula_get($1::int) as res', [ lessonID ], callback);
}

function add(lessonID, curricula, callback) {
    let subnumList = '{' + curricula.map(curriculum => curriculum.subnum).join(',') + '}';
    let subjectList = '{' + curricula.map(curriculum => curriculum.subject).join(',') + '}';
    let roomList = '{' + curricula.map(curriculum => curriculum.room).join(',') + '}';
    let teacherList = '{' + curricula.map(curriculum => curriculum.teacher).join(',') + '}';

    db.query('select * from Schedule_addCurricula($1::int, $2, $3, $4, $5) as res', [ lessonID, subnumList, subjectList, roomList, teacherList ], callback);
}


module.exports = { forGroup, forTeacher, forRoom, forLesson, add };
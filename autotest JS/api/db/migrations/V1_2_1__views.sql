create or replace view view_curricula as
    select
        curricula.id,
        curricula.lessonID,
        curricula.subnum,

        subjects.id     as subjectID,
        subjects.name   as subjectName,
        subjects.abbr   as subjectAbbr,

        teachers.id     as teacherID,
        teachers.name   as teacherName,
        teachers.degree as teacherDegree,

        rooms.id        as roomID,
        rooms.name      as roomName

    from curricula
        inner join subjects on subjects.id = curricula.subjectid
        inner join teachers on teachers.id = curricula.teacherid
        inner join rooms on rooms.id = curricula.roomid;


create or replace view view_groups as
    select
        groups.id,
        groups.name,
        groups.num as groupNum,
        grades.num as gradeNum,
        grades.id  as gradeID,
        grades.degree
    from groups
        inner join grades on grades.id = groups.gradeid;

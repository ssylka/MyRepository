create or replace function Schedule_addLesson (
    pUberID integer,
    pSubcount integer,
    pTimeslot timeSlot_t
)
    returns integer as $$
declare
    vLessonID integer not null := 0;
begin
    insert into lessons (uberid, subcount, timeslot)
        values (pUberID, pSubcount, pTimeslot)
        returning lessons.id into vLessonID;

    return vLessonID;

exception when others then
    return -1;
end;
$$ language plpgsql;


create or replace function Schedule_addLessonFull (
    pGroups integer[],
    pSubcount integer,

    pDay integer,
    pBeg interval hour to minute,
    pEnd interval hour to minute,
    pSplit week_t
    -- pTimeslot timeSlot_t
)
    returns integer as $$
declare
    vLessonID integer not null := 0;
    vUberID integer not null := 0;
    vTimeslot timeslot_t;
begin
    vTimeslot := ROW(pDay, pBeg, pEnd, pSplit);
    vUberID := Uber_add(pGroups);
    return Schedule_addLesson(vUberID, pSubcount, vTimeslot);

exception when others then
    return -1;
end;
$$ language plpgsql;


create or replace function Schedule_addCurriculum (
    pSubnum integer,
    pLessonID integer,
    pSubjectID integer,
    pRoomID integer,
    pTeacherID integer
)
    returns integer as $$
declare
    vCurriculumID integer not null := 0;
begin
    insert into curricula (subNum, lessonID, subjectID, roomID, teacherID)
        values (pSubnum, pLessonID, pSubjectID, pRoomID, pTeacherID)
        returning curricula.id into vCurriculumID;

    return vCurriculumID;

exception when others then
    return -1;
end;
$$ language plpgsql;


create or replace function Schedule_addCurricula (
    pLessonID integer,
    pSubnum integer[],
    pSubjectID integer[],
    pRoomID integer[],
    pTeacherID integer[]
)
    returns integer as $$
declare
    vCurriculumID integer not null := 0;
    vLen integer not null := array_length(pSubnum, 1);
begin
    for i in 1..vLen loop
        insert into curricula (subNum, lessonID, subjectID, roomID, teacherID)
            values (pSubnum[i], pLessonID, pSubjectID[i], pRoomID[i], pTeacherID[i]);
    end loop;
    return 0;

exception when others then
    return -1;
end;
$$ language plpgsql;


create or replace function Schedule_deleteCurricula (
    pLessonID integer
)
    returns integer as $$
begin
    delete from curricula
        where curricula.lessonid = pLessonID;
    return 0;

exception when others then
    return -1;
end;
$$ language plpgsql;


create or replace function Schedule_deleteLesson (
    pLessonID integer
)
    returns integer as $$
declare
    vRes integer not null := -1;
begin
    perform schedule_deletecurricula(pLessonID);
    delete from lessons
        where lessons.id = pLessonID;


    get diagnostics vRes = row_count;
    return vRes - 1;

exception when others then
    return -1;
end;
$$ language plpgsql;
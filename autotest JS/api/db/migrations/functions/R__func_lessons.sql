create or replace function Lesson_conflicts()
    returns table(
        id integer,
        subjectname varchar(200),
        teachername varchar(200),
        roomname varchar(50),
        groupname varchar(50),
        groupnum integer,
        gradenum integer,
        degree degree_t,
        timeslot timeSlot_t
    ) as $$
begin
    return query (
        select
            conflict_lesson.id,
            conflict_curricula.subjectname,
            conflict_curricula.teachername,
            conflict_curricula.roomname,
            conflict_group.name as groupname,
            conflict_group.groupnum,
            conflict_group.gradenum,
            conflict_group.degree,
            conflict_lesson.timeslot
        from (
            select distinct left_lesson.id
            from lessons left_lesson
            join lessons right_lesson on
                left_lesson.uberid = right_lesson.uberid and
                left_lesson.id != right_lesson.id
            where
                (left_lesson.timeslot).cday = (right_lesson.timeslot).cday and
                (left_lesson.timeslot).cbeg = (right_lesson.timeslot).cbeg and
                (left_lesson.timeslot).cend = (right_lesson.timeslot).cend and (
                    (left_lesson.timeslot).csplit = (right_lesson.timeslot).csplit or
                    (left_lesson.timeslot).csplit = 'full' or
                    (right_lesson.timeslot).csplit = 'full'
                )
        ) as conflict_id
        join view_curricula conflict_curricula on conflict_id.id = conflict_curricula.lessonid
        join lessons conflict_lesson on conflict_id.id = conflict_lesson.id
        join ubers_groups conflict_uber on conflict_lesson.uberid = conflict_uber.uberid
        join view_groups conflict_group on conflict_uber.groupid = conflict_group.id
    );
end;
$$ language plpgsql;


create or replace function lesson_to_timerange(lesson_num integer)
    returns timerange as $$
begin
    return (select timerange((cbeg)::time, (cend)::time, '[]') from lesson_times where num = lesson_num);
end;
$$ language plpgsql;

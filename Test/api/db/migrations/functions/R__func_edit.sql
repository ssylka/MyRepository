create or replace function Lesson_get(
    pLessonID integer
)
    returns setof lessons as $$
begin
    return query
    select lessons.*
    from lessons
    where lessons.id = pLessonID
    limit 1;
end;
$$ language plpgsql;


create or replace function Curricula_get(
    pLessonID integer,
    pLimit   integer default 1000
)
    returns setof view_curricula as $$
begin
    return query
    select view_curricula.*
    from view_curricula
    where view_curricula.lessonID = pLessonID
    limit pLimit;
end;
$$ language plpgsql;

create or replace function Teacher_get(
    pLimit integer default 1000
)
    returns setof teachers as $$
begin
    return query
    select teachers.*
    from teachers
    order by teachers.name
    limit pLimit;
end;
$$ language plpgsql;


create or replace function Teacher_add(
    pName   varchar(200),
    pDegree varchar(50)
) returns integer as $$
declare
    vRes integer not null := -1;
begin
    insert into teachers (name, degree)
        values (pName, pDegree)
        returning teachers.id into vRes;

    return vRes;

exception when others then
    return -1;
end;
$$ language plpgsql;

create or replace function Teacher_update(
    pTeacherID   integer,
    pName   varchar(200),
    pDegree varchar(50)
) returns void as $$
begin
    update teachers set name = pName, degree = pDegree
    where id = pTeacherID;
end;
$$ language plpgsql;

create or replace function Teacher_delete(
    pTeacherID   integer
) returns void as $$
begin
    delete from teachers WHERE teachers.id = pTeacherID;
end;
$$ language plpgsql;

create or replace function Teacher_getLessons(
    pTeacherID integer,
    pLimit   integer default 1000
)
    returns setof lessons as $$
begin
    return query
    select lessons.*
    from (
        select curricula.lessonID as id
        from curricula
        where curricula.teacherID = pTeacherID
        group by curricula.lessonID
    ) as tLessonsIDs
        inner join lessons on tLessonsIDs.id = lessons.id
    limit pLimit;
end;
$$ language plpgsql;


create or replace function Teacher_getCurricula(
    pTeacherID integer,
    pLimit   integer default 1000
)
    returns setof view_curricula as $$
begin
    return query
    select view_curricula.*
    from view_curricula
    where view_curricula.teacherID = pTeacherID
    limit pLimit;
end;
$$ language plpgsql;


create or replace function Teacher_getGroups(
    pTeacherID integer,
    pLimit   integer default 1000
)
    returns table (
        uberid integer,
        groupnum integer,
        gradenum integer,
        degree degree_t,
        name varchar(50)
    ) as $$
begin
    return query
    select  distinct
            ubers.id as uberid,
            view_groups.groupnum,
            view_groups.gradenum,
            view_groups.degree,
            view_groups.name
    from (
             select curricula.lessonID as id
             from curricula
             where curricula.teacherID = pTeacherID
             group by curricula.lessonID
         ) as tLessonsIDs
        inner join lessons on tLessonsIDs.id = lessons.id
        inner join ubers on ubers.id = lessons.uberid
        left join ubers_groups on ubers.id = ubers_groups.uberid
        inner join view_groups on view_groups.id = ubers_groups.groupID
    limit pLimit;
end;
$$ language plpgsql;
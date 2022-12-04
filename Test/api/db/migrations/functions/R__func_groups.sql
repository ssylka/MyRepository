create or replace function Group_get(
    pGradeID integer,
    pLimit   integer default 1000
)
    returns setof groups
as $$
begin
    return query
    select groups.*
    from groups
    where groups.gradeID = pGradeID
    order by    groups.gradeID asc,
                groups.num asc
    limit pLimit;
end;
$$ language plpgsql;



create or replace function Group_add(
    pName varchar(50),
    pGroupNum integer,
    pGradeID integer
) returns integer as $$
declare
    vRes integer not null := -1;
begin
    insert into groups (name, num, gradeID)
        values (pName, pGroupNum, pGradeID)
        returning groups.id into vRes;

    return vRes;

exception when unique_violation then
    select groups.id into vRes
    from groups
    where groups.num = pGroupNum and groups.gradeID = pGradeID
    limit 1;

    return vRes;

when others then
    return -1;
end;
$$ language plpgsql;


create or replace function Group_getLessons(
    pGroupID integer,
    pLimit   integer default 1000
)
    returns setof lessons as $$
begin
    return query
    select lessons.*
    from ubers_groups
        left join lessons on lessons.uberID = ubers_groups.uberID
    where ubers_groups.groupID = pGroupID and lessons.id is not null
    limit pLimit;
end;
$$ language plpgsql;


create or replace function Group_getCurricula(
    pGroupID integer,
    pLimit   integer default 1000
)
    returns setof view_curricula as $$
begin
    return query
    select view_curricula.*
    from ubers_groups
        left join lessons on lessons.uberID = ubers_groups.uberID
        left join view_curricula on view_curricula.lessonID = lessons.ID
    where   lessons.id is not null
            and view_curricula is not null
            and ubers_groups.groupID = pGroupID
    limit pLimit;
end;
$$ language plpgsql;

create or replace function Group_delete(
    pGroupID   integer
) returns void as $$
begin
    delete from groups WHERE groups.id = pGroupID;
end;
$$ language plpgsql;

create or replace function Group_update(
    pGroupID   integer,
    pName   varchar(50),
    pNum integer,
    pGradeID integer
) returns void as $$
begin
    update groups set name = pName, num = pNum, gradeid = pGradeID
    where id = pGradeID;
end;
$$ language plpgsql;
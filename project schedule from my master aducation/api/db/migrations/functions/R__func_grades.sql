create or replace function Grade_get(
    pLimit  integer default 1000
)
    returns setof grades as $$
begin
    return query
    select
        grades.*
    from grades
    order by grades.degree, grades.num
    limit pLimit;
end;
$$ language plpgsql;

create or replace function Grade_add(
    pNum      integer,
    pDegree   degree_t
) returns integer as $$
declare
    vRes integer not null := -1;
begin
    insert into grades (num, degree)
        values (pNum, pDegree)
        returning grades.id into vRes;

    return vRes;

exception when unique_violation then
    select grades.id into vRes
    from grades
    where grades.num = pNum and grades.degree = pDegree
    limit 1;

    return vRes;

when others then
    return -1;
end;
$$ language plpgsql;

create or replace function Grade_delete(
    pGradeID   integer
) returns void as $$
begin
    delete from grades WHERE grades.id = pGradeID;
end;
$$ language plpgsql;

create or replace function Grade_update(
    pGradeID   integer,
    pNum   integer,
    pDegree degree_t
) returns void as $$
begin
    update grades set num = pNum, degree = pDegree
    where id = pGradeID;
end;
$$ language plpgsql;
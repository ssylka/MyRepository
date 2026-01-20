create or replace function Subject_get(
    pLimit integer default 1000
)
    returns setof subjects as $$
begin
    return query
    select subjects.*
    from subjects
    limit pLimit;
end;
$$ language plpgsql;



create or replace function Subject_add(
    pName   varchar(100),
    pAbbr   varchar(50)
) returns integer as $$
declare
    vRes integer := -1;
begin
    insert into subjects (name, abbr)
        values (pName, pAbbr)
        returning subjects.id into vRes;

    if vRes is null then
        return -1;
    end if;
    return vRes;

exception when unique_violation then
    select subjects.id into vRes
    from subjects
    where subjects.name = pName
    limit 1;

    if vRes is null then
        return -1;
    end if;
    return vRes;

when others then
    return -1;
end;
$$ language plpgsql;

create or replace function Subject_update(
    pSubjectID   integer,
    pName   varchar(200),
    pAbbr varchar(50)
) returns void as $$
begin
    update subjects set name = pName, abbr = pAbbr
    where id = pSubjectID;
end;
$$ language plpgsql;

create or replace function Subject_delete(
    pSubjectID   integer
) returns void as $$
begin
    delete from subjects WHERE subjects.id = pSubjectID;
end;
$$ language plpgsql;

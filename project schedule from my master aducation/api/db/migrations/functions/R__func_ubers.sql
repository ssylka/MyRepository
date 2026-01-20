create or replace function Uber_add (
    pGroups integer[] -- space separated string of group's ids
)
    returns integer
as $$
declare
    vUberID integer := 0;
    vGroups integer[];
    vGroup text;
    vHash text;
begin
    vGroups := array(select distinct unnest(pGroups) order by 1);
    vHash := vGroups; -- todo: encode(digest(vGroups, 'sha1'), 'hex');

    -- try to find exist uber
    select ubers.id into vUberID
    from ubers
    where ubers.hash in (vHash) -- todo: hash
    limit 1;

    if vUberID > 0 then
        return vUberID;
    end if;

    -- create new uber
    insert into ubers (hash) values (vHash)
        returning ubers.id into vUberID;

    foreach vGroup in array vGroups loop -- add all groups to uber
        insert into ubers_groups (uberID, groupID)
            values (vUberID, cast(vGroup as integer));
    end loop;
    return vUberID;

exception when others then
    return -1;
end;
$$ language plpgsql;




create or replace function Uber_getGroups (
    pUberID integer,
    pHash varchar(50),
    pLimit   integer default 1000
)
    returns setof groups
as $$
begin
    return query
    select groups.*
    from ubers
    left join ubers_groups on ubers.id = ubers_groups.uberID
    inner join groups on groups.id = ubers_groups.groupid
    where   (pUberID = 0 or ubers.id = pUberID) and
            (pUberID != 0 or ubers.hash = pHash)
    order by    groups.gradeID asc,
                groups.num asc
    limit pLimit;
end;
$$ language plpgsql;

create or replace function Setting_get(
    pKey varchar(10)
)
    returns setof settings as $$
begin
    return query
    select settings.*
    from settings
    where settings.key = pKey
    limit 1;
end;
$$ language plpgsql;


create or replace function Setting_set(
    pKey varchar(10),
    pValI integer,
    pValS varchar(20) default null
)
    returns integer as $$
begin
    insert into settings (key, vali, vals)
        values (pKey, pValI, pValS);

    return 0;

exception when unique_violation then
    update settings
        set valI = pValI,
            valS = pValS
    where settings.key = pKey;

    return 0;

when others then

    return -1;
end;
$$ language plpgsql;


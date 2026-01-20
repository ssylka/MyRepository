create or replace function Times_get(
    pLimit  integer default 1000
)
    returns setof lesson_times as $$
begin
    return query
    select
        lesson_times.*
    from lesson_times
    order by lesson_times.num
    limit pLimit;
end;
$$ language plpgsql;


create or replace function Week_get()
    returns integer as $$
declare
    vStartWeek integer := 0;
    vCurWeek integer := 0;
begin

    select valI into vStartWeek
    from setting_get('week')
    limit 1;
    vStartWeek := coalesce(vStartWeek, 0);
    vCurWeek := extract(week from now());

    return (vCurWeek - vStartWeek) % 2;
end;
$$ language plpgsql;

create or replace function Week_set(
    pDate date
)
    returns integer as $$
declare
    vWeek integer := 0;
begin
    vWeek := extract(week from pDate)::integer;
    return setting_set('week', vWeek);
end;
$$ language plpgsql;

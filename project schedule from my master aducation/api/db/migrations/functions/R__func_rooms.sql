create or replace function Room_get(
    pLimit   integer default 1000
)
    returns setof rooms as $$
begin
    return query
    select rooms.*
    from rooms
    order by rooms.name
    limit pLimit;
end;
$$ language plpgsql;

create or replace function room_getfortime(
    dayOfWeek integer,
    beginHour character varying,
    beginMinute character varying,
    endHour character varying,
    endMinute character varying,
    pLimit integer DEFAULT 1000)
    returns setof rooms as $$
begin
    return query
    select *
    from rooms r
    where not exists(
        select *
        from lessons l
        join curricula c on c.lessonid = l.id
        where r.id  =  c.roomid and ( ((beginHour || ':' || beginMinute)::time, (endHour || ':' || endMinute)::time) overlaps (('00:00' + (l.timeslot).cbeg)::time, ('00:00' + (l.timeslot).cend)::time ) ) and (l.timeslot).cday = dayOfWeek
    )
    limit pLimit;
end;
$$ language plpgsql;

create or replace function room_getfortimerange(
    dayOfWeek integer,
    beginHour character varying,
    beginMinute character varying,
    endHour character varying,
    endMinute character varying,
    pLimit integer DEFAULT 1000)
    returns setof rooms as $$
begin
    return query
    select distinct rs.room_id, r.name, r.parent
        from empty_rooms_time rs join rooms r on r.id = rs.room_id
        where (rs.empty_time @> timerange_to_timerangearr(timerange((beginHour || ':' || beginMinute)::time, (endHour || ':' || endMinute)::time, '[]'))) and (rs.day_of_week = dayOfWeek) and (rs.week_type = 'full')
    order by rs.room_id
    limit pLimit;
end;
$$ language plpgsql;

create or replace function room_schedule_delete(
)
  returns void as $$
begin
  execute 'delete from rooms_schedule';
end;
$$ language plpgsql;

create or replace function Room_schedule_init(
)
    returns void as $$
declare
    var_id integer;
    var_room_id integer;
    var_reservation timerange;
    var_day_of_week integer;
    var_week_type week_t;
    curs1 cursor for select * from rooms_schedule;
begin
    perform room_schedule_delete();
    alter sequence rooms_schedule_id_seq restart with 1;

    create temporary table if not exists rooms_schedule_tmp
    (
        id integer NOT NULL DEFAULT nextval('rooms_schedule_id_seq'::regclass),
        room_id integer,
        reservation timerange,
        day_of_week integer,
        week_type week_t,
        CONSTRAINT rooms_schedule_pkey PRIMARY KEY (id)
    );
    alter sequence rooms_schedule_id_seq restart with 1;
    insert into rooms_schedule_tmp
        (select nextval('rooms_schedule_id_seq'), a.roomid, timerange((b.timeslot).cbeg::time, (b.timeslot).cend::time, '[]'), (b.timeslot).cday, (b.timeslot).csplit from view_curricula a join lessons b on a.lessonid = b.id);
    alter sequence rooms_schedule_id_seq restart with 1;
    insert into rooms_schedule
	    (select distinct on (room_id, reservation, day_of_week, week_type) nextval('rooms_schedule_id_seq'), room_id, reservation, day_of_week, week_type from rooms_schedule_tmp order by room_id, day_of_week, reservation);
    drop table rooms_schedule_tmp;
    open curs1;
        loop
            fetch curs1 into var_id, var_room_id, var_reservation, var_day_of_week, var_week_type;
            if not found then
                exit;
            end if;
            if (select count(*) from rooms_schedule where (room_id = var_room_id) and (reservation = var_reservation) and (day_of_week = var_day_of_week)) > 1 then
                begin
                    delete from rooms_schedule where (room_id = var_room_id) and (reservation = var_reservation) and (day_of_week = var_day_of_week) and (id != var_id);
                    update rooms_schedule set week_type = 'full' where id = var_id;
                end;
            end if;
        end loop;
    close curs1;
end;
$$ language plpgsql;

create or replace function timerange_to_timerangearr(tm timerange)
    returns timerange[] as $$
begin
    return ARRAY[tm];
end
$$ language plpgsql;

create or replace function Room_add(
    pName varchar(50)
) returns integer as $$
declare
    vRes integer not null := -1;
begin
    insert into rooms (name)
        values (pName)
        returning rooms.id into vRes;

    return vRes;

exception when unique_violation then
    select rooms.id into vRes
    from rooms
    where rooms.name = pName
    limit 1;

    return vRes;

when others then
    return -1;
end;
$$ language plpgsql;


create or replace function Room_getLessons(
    pRoomID integer,
    pLimit   integer default 1000
)
    returns setof lessons as $$
begin
    return query
    select lessons.*
    from (
        select curricula.lessonID as id
        from curricula
        join rooms on rooms.id = curricula.roomID
        where curricula.roomID = pRoomID or rooms.parent = proomid
        group by curricula.lessonID
    ) as tLessonsIDs
        inner join lessons on tLessonsIDs.id = lessons.id
    limit pLimit;
end;
$$ language plpgsql;


create or replace function Room_getCurricula(
    pRoomID integer,
    pLimit   integer default 1000
)
    returns setof view_curricula as $$
begin
    return query
    select view_curricula.*
    from view_curricula
    join rooms on rooms.id = view_curricula.roomID
    where view_curricula.roomID = pRoomID or rooms.parent = proomid
    limit pLimit;
end;
$$ language plpgsql;

create or replace function Room_getGroups(
    pRoomID integer,
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
             join rooms on rooms.id = curricula.roomID
             where curricula.roomID = pRoomID or rooms.parent = proomid
             group by curricula.lessonID
         ) as tLessonsIDs
        inner join lessons on tLessonsIDs.id = lessons.id
        inner join ubers on ubers.id = lessons.uberid
        left join ubers_groups on ubers.id = ubers_groups.uberid
        inner join view_groups on view_groups.id = ubers_groups.groupID
    limit pLimit;
end;
$$ language plpgsql;


create or replace function empty_rooms_time_init(
)
  returns void as $$
declare
    var_id integer;
    var_room_id integer;
    var_reservation timerange;
    var_day_of_week integer;
    var_week_type week_t;
    curs1 cursor for select room_id, t2.unnest, t3.unnest::week_t, ARRAY[timerange(('08' || ':' || '00')::time, ('09' || ':' || '35')::time, '[]'), timerange(('09' || ':' || '50')::time, ('11' || ':' || '25')::time, '[]'), timerange(('11' || ':' || '55')::time, ('13' || ':' || '30')::time, '[]'),
	timerange(('13' || ':' || '45')::time, ('15' || ':' || '20')::time, '[]'), timerange(('15' || ':' || '50')::time, ('17' || ':' || '25')::time, '[]'), timerange(('17' || ':' || '40')::time, ('19' || ':' || '15')::time, '[]')]
	from (select distinct room_id from rooms_schedule) as t cross join (select unnest(ARRAY[0,1,2,3,4,5])) as t2 cross join (select unnest(ARRAY['lower','upper','full'])) as t3
	order by room_id, t2.unnest, t3.unnest;

    nums int[];
    cursLU cursor for select rs.reservation from rooms_schedule rs where rs.room_id = var_room_id and rs.day_of_week = var_day_of_week and (rs.week_type = var_week_type or rs.week_type = ('full')::week_t);
    cursF cursor for select rs.reservation from rooms_schedule rs where rs.room_id = var_room_id and rs.day_of_week = var_day_of_week;
    var_reservation_2 timerange;
    var_empty_time timerange[];
    var_e_t timerange[];
    var_e_t2 timerange[];
    var_e_t3 timerange[];
    timerange_arr timerange[];
    var_e_n int[];
    var_e_n2 int[];
    var_e_n3 int[];
begin
    alter sequence empty_rooms_time_id_seq restart with 1;

    create temporary table empty_rooms_time_tmp
    (
        id integer NOT NULL DEFAULT nextval('empty_rooms_time_id_seq'::regclass),
        room_id integer,
        day_of_week integer,
        week_type week_t,
        empty_time timerange[],
        CONSTRAINT empty_rooms_time_pkey PRIMARY KEY (id)
    );

    open curs1;
        loop
            fetch curs1 into var_room_id, var_day_of_week, var_week_type, var_empty_time;
            IF NOT FOUND THEN
                EXIT;
            END IF;

            nums = '{0,1,2,3,4,5}'::int[];

            if var_week_type <> ('full')::week_t then
                open cursLU;
                    loop
                        fetch cursLU into var_reservation_2;
                        IF NOT FOUND THEN
                            EXIT;
                        END IF;
                        nums := nums - timerange_to_lesson(var_reservation_2)::int;
                    end loop;
                close cursLU;

                if (array_length(nums, 1) > 0) then
                    timerange_arr := array[]::timerange[];
                    FOR i IN 1..array_upper(nums, 1)
                        LOOP
                            timerange_arr := array_append (timerange_arr, lesson_to_timerange(nums[i]));
                        END LOOP;
                end if;
            else
                open cursF;
                    loop
                        fetch cursF into var_reservation_2;
                        IF NOT FOUND THEN
                            EXIT;
                        END IF;
                        nums := nums - timerange_to_lesson(var_reservation_2)::int;
                    end loop;
                close cursF;
                if (array_length(nums, 1) > 0) then
                    timerange_arr := array[]::timerange[];
                FOR i IN 1..array_upper(nums, 1)
                    LOOP
                        timerange_arr := array_append (timerange_arr, lesson_to_timerange(nums[i]));
                    END LOOP;
                end if;
            end if;

            insert into empty_rooms_time_tmp values (nextval('empty_rooms_time_id_seq'), var_room_id, var_day_of_week, var_week_type, timerange_arr);
        end loop;
    close curs1;

    alter sequence empty_rooms_time_id_seq restart with 1;
    delete from empty_rooms_time;
    insert into empty_rooms_time
	(select distinct on (room_id, day_of_week, week_type, empty_time) nextval('empty_rooms_time_id_seq'), room_id, day_of_week, week_type, empty_time from empty_rooms_time_tmp order by room_id, day_of_week, empty_time);

    drop table empty_rooms_time_tmp;
end;
$$ language plpgsql;

create or replace function Room_delete(
    pRoomID   integer
) returns void as $$
begin
    delete from rooms WHERE rooms.id = pRoomID;
end;
$$ language plpgsql;

create or replace function Room_update(
    pRoomID   integer,
    pName varchar(50)
) returns void as $$
begin
    update rooms set name = pName
    where id = pRoomID;
end;
$$ language plpgsql;

create or replace function room_load_by_days()
    returns table(roomId integer, name character varying(50), dayOfWeek integer, UsageByDay bigint, totalusage numeric) as $$
begin
    return query (with load_by_days as (
                    select a.room_id, a.day_of_week, sum(case when week_type = 'full' then 2 else 0 end) as count_full, sum(case when week_type = 'lower' then 1 else 0 end) as count_lower, sum(case when week_type = 'upper' then 1 else 0 end) as count_upper from rooms_schedule a group by a.day_of_week, a.room_id order by room_id, day_of_week
                 ), load_by_days_with_sum as (
                    select load_by_days.room_id, load_by_days.day_of_week, load_by_days.count_full + load_by_days.count_lower + load_by_days.count_upper as usage_by_day from load_by_days
                 )
                 select a.room_id, c.name, a.day_of_week, a.usage_by_day, sum(b.usage_by_day) from load_by_days_with_sum a
                    join load_by_days_with_sum b
                        on a.room_id = b.room_id join rooms c on a.room_id = c.id
                            group by a.room_id, a.day_of_week, a.usage_by_day, c.name order by a.room_id);
end;
$$ language plpgsql;

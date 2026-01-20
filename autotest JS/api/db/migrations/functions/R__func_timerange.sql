CREATE OR REPLACE FUNCTION timerange_to_lesson(
    tr timerange
)
    RETURNS integer AS $$
begin
    return (select num from lesson_times where lower(tr) = (cbeg::time));
end;
$$ language plpgsql;

CREATE OR REPLACE FUNCTION union_timeranges(
    r_id integer,
    d_of_week integer,
    wk_type week_t
)
    RETURNS timerange AS $$
declare
    result timerange := timerange(('00' || ':' || '00')::time, ('00' || ':' || '00')::time, '[]');
    cur_reservation timerange;
    curs1 cursor for select rs.reservation from rooms_schedule rs where rs.room_id=r_id and rs.day_of_week = d_of_week and rs.week_type = wk_type;
begin
    open curs1;
        loop
            fetch curs1 into cur_reservation;
            IF NOT FOUND THEN
                EXIT;
            END IF;
            result := result + cur_reservation;
        end loop;
    close curs1;
    return result;
end;
$$ language plpgsql;


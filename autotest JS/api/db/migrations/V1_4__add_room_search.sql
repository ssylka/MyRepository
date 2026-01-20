create type timerange as range(subtype = time);

create extension if not exists intarray;


create sequence if not exists rooms_schedule_id_seq
    increment 1
    minvalue 1
    maxvalue 9223372036854775807
    start 1
    cache 1;

create sequence if not exists empty_rooms_time_id_seq
    increment 1
    minvalue 1
    maxvalue 9223372036854775807
    start 1
    cache 1;


create table if not exists rooms_schedule (
    id integer not null default nextval('rooms_schedule_id_seq'::regclass),
    room_id integer,
    reservation timerange,
    day_of_week integer,
    week_type week_t,
    constraint rooms_schedule_pkey primary key (id)
);

create table if not exists empty_rooms_time (
    id integer not null default nextval('empty_rooms_time_id_seq'::regclass),
    room_id integer,
    day_of_week integer,
    week_type week_t,
    empty_time timerange[],
    constraint empty_rooms_time_pkey primary key (id)
);

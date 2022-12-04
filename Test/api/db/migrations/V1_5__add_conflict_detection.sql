create sequence if not exists conflicts_lessons_id_seq
    increment 1
    minvalue 1
    maxvalue 9223372036854775807
    start 1
    cache 1;

create table if not exists conflicts_lessons_id (
    id integer not null default nextval('conflicts_lessons_id_seq'::regclass) primary key,
    lessons_id integer
);

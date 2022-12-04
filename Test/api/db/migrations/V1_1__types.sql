
--create type degree_t as enum ('bachelor', 'master', 'specialist');
CREATE TYPE degree_t as enum ('bachelor', 'master', 'specialist', 'postgraduate');
create type week_t as enum ('full', 'upper', 'lower');
create type timeSlot_t as (
    cday    integer,
    cbeg    interval hour to minute,
    cend    interval hour to minute,
    csplit  week_t
);



-- ---------------------
--    general tables
-- ---------------------

create table subjects (
    id      serial          primary key,
    name    varchar(200)    not null,
    abbr    varchar(50),

    unique(name)
);

create table rooms (
    id      serial          primary key,
    name    varchar(50)     not null,

    unique(name)
    -- capacity integer
);

create table teachers (
    id      serial          primary key,
    name    varchar(200)    not null,
    degree  varchar(50)     not null
);

create table lesson_times (
    id      serial          primary key,
    num     integer         not null,

    cbeg    interval hour to minute     not null,
    cend    interval hour to minute     not null
);




-- ---------------------
--      study groups
-- ---------------------

create table grades (
    id          serial          primary key,
    num         integer         not null,
    degree      degree_t        not null,

    unique (num, degree)
);


create table groups (
    id          serial          primary key,
    name        varchar(50)     null,
    num         integer         not null,
    gradeID     integer         not null,

    unique (num, gradeID),
    foreign key(gradeID)        references grades(id)
);


-- join several groups into one uber-group!
create table ubers (
    id              serial      primary key,
    hash            varchar(50) null,

    unique (hash)
);


create table ubers_groups (
    id              serial      primary key,
    uberID          integer     not null,
    groupID         integer     not null,

    foreign key(uberID)     references ubers(id),
    foreign key(groupID)    references groups(id)
);



-- ---------------------
--      schedule
-- ---------------------

create table lessons (
    id              serial      primary key,
    uberID          integer     not null,
    subCount        integer     not null,
    timeSlot        timeSlot_t  not null,

    foreign key(uberID) references ubers(id)
);


create table curricula (
    id              serial          primary key,
    subNum          integer         not null,
    lessonID        integer         not null,

    subjectID       integer         not null,
    roomID          integer         not null,
    teacherID       integer         not null,

    foreign key(lessonID)   references lessons(id),
    foreign key(subjectID)  references subjects(id),
    foreign key(roomID)     references rooms(id),
    foreign key(teacherID)  references teachers(id)
);


-- ---------------------
--    settings
-- ---------------------

create table settings (
    key     char(10)        primary key,
    valI    integer         not null default 0,
    valS    varchar(20)     null default null
);
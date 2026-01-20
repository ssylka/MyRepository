(() => {
    'use strict';

    class Switcher {
        /**
         * Настройка селекторов
         * @return {Switcher} this
         */
        set() {
            let swither = this;

            this.selectors = new Vue({
                el: '#switch',
                data: {
                    faculty: null,
                    type: null,
                    grade: null,
                    day: null,
                    group: null,
                    teacher: null,
                    room: null,

                    faculties: null,
                    types: null,
                    grades: null,
                    days: null,
                    groups: null,
                    teachers: null,
                    rooms: null,

                    initState: true,
                },
                watch: {
                    faculty: function () {
                        if (!this.faculty) return;

                        system.faculty = this.faculty;
                        page.setFaculty();

                        if (!this.initState) {
                            localStorage.faculty = this.faculty;
                            delete localStorage.type;
                            delete localStorage.grade;
                            delete localStorage.day;
                            delete localStorage.group;
                            delete localStorage.teacher;
                            delete localStorage.room;
                        }

                        this.type = null;
                        this.grade = null;
                        this.day = null;
                        this.group = null;
                        this.teacher = null;
                        this.room = null;

                        if (this.faculty === 'default') {
                            this.initState = false;
                            swither.closeSchedule();
                            return;
                        }

                        setTimeout(() => {
                            this.types = Select.getOptions('Тип расписания', [ {
                                id: 'grade',
                                text: 'Курс',
                            },  {
                                id: 'group',
                                text: 'Группа',
                            }, {
                                id: 'teacher',
                                text: 'Преподаватель',
                            }, {
                                id: 'room',
                                text: 'Аудитория',
                            }, {
                                id: 'chair',
                                text: 'Кафедра',
                                disabled: true,
                            }, {
                                id: 'session',
                                text: 'Сессия',
                                disabled: true,
                            } ]);

                            this.type = this.initState && localStorage.type ? localStorage.type : 'default';
                        });
                    },
                    type: function () {
                        if (!this.type) return;

                        if (!this.initState) {
                            localStorage.type = this.type;
                            delete localStorage.grade;
                            delete localStorage.day;
                            delete localStorage.group;
                            delete localStorage.teacher;
                            delete localStorage.room;
                        }

                        this.grade = null;
                        this.day = null;
                        this.group = null;
                        this.teacher = null;
                        this.room = null;

                        if (this.type === 'default') {
                            this.initState = false;
                            swither.closeSchedule();
                            return;
                        }

                        switch (this.type) {
                            case 'grade':
                            case 'group':
                                api.grade.list(result => {
                                    this.grades = Select.getOptions('Курс', result.map(grade => ({
                                        id: grade.id,
                                        text: grade.name,
                                    })));

                                    this.grade = this.initState && localStorage.grade ? localStorage.grade : 'default';
                                });
                                break;

                            case 'teacher':
                                api.teacher.list(result => {
                                    this.teachers = Select.getOptions('Преподаватель', result.map(teacher => ({
                                        id: teacher.id,
                                        text: teacher.name,
                                    })));

                                    this.teacher = this.initState && localStorage.teacher ? localStorage.teacher : 'default';
                                });
                                break;

                            case 'room':
                                api.room.list(result => {
                                    this.rooms = Select.getOptions('Аудитория', result.map(room => ({
                                        id: room.id,
                                        text: room.name,
                                    })));

                                    this.room = this.initState && localStorage.room ? localStorage.room : 'default';
                                });
                                break;
                        }
                    },
                    grade: function () {
                        if (!this.grade) return;

                        if (!this.initState) {
                            localStorage.grade = this.grade;
                            delete localStorage.day;
                            delete localStorage.group;
                        }

                        this.day = null;
                        this.group = null;

                        if (this.grade === 'default') {
                            this.initState = false;
                            swither.closeSchedule();
                            return;
                        }

                        switch (this.type) {
                            case 'grade':
                                setTimeout(() => {
                                    this.days = [ {
                                        id: 'default',
                                        text: 'Неделя',
                                    }, {
                                        id: '0',
                                        text: 'Понедельник',
                                    }, {
                                        id: '1',
                                        text: 'Вторник',
                                    }, {
                                        id: '2',
                                        text: 'Среда',
                                    }, {
                                        id: '3',
                                        text: 'Четверг',
                                    }, {
                                        id: '4',
                                        text: 'Пятница',
                                    }, {
                                        id: '5',
                                        text: 'Суббота',
                                    } ];

                                    this.day = this.initState && localStorage.day ? localStorage.day : 'default';
                                });
                                break;

                            case 'group':
                                api.group.listGrade(this.grade, result => {
                                    this.groups = Select.getOptions('Группа', result.map(group => {
                                        let name = group.num + ' группа';
                                        if (group.name && group.name !== 'NULL') {
                                            name = group.name + ', ' + name;
                                        }

                                        return {
                                            id: group.id,
                                            text: name,
                                        };
                                    }));

                                    this.group = this.initState && localStorage.group ? localStorage.group : 'default';
                                });
                                break;
                        }
                    },
                    day: function() {
                        if (!this.day) return;

                        if (!this.initState) localStorage.day = this.day;
                        this.initState = false;

                        if (this.day === 'default') {
                            api.grade.schedule(this.grade, result => swither.openSchedule('grade', result));
                        } else {
                            api.grade.scheduleForDay(this.grade, this.day, result => swither.openSchedule('day', result));
                        }
                    },
                    group: function() {
                        if (!this.group) return;

                        if (!this.initState) localStorage.group = this.group;
                        this.initState = false;

                        if (this.group === 'default') {
                            swither.closeSchedule();
                            return;
                        }

                        api.group.schedule(this.group, result => swither.openSchedule('group', result));
                    },
                    teacher: function () {
                        if (!this.teacher) return;

                        if (!this.initState) localStorage.teacher = this.teacher;
                        this.initState = false;

                        if (this.teacher === 'default') {
                            swither.closeSchedule();
                            return;
                        }

                        api.teacher.schedule(this.teacher, result => swither.openSchedule('teacher', result));
                    },
                    room: function () {
                        if (!this.room) return;

                        if (!this.initState) localStorage.room = this.room;
                        this.initState = false;

                        if (this.room === 'default') {
                            swither.closeSchedule();
                            return;
                        }

                        api.room.schedule(this.room, result => swither.openSchedule('room', result));
                    },
                },
            });

            this.selectors.faculties = Select.getOptions('Факультет', [ {
                id: 'mmcs',
                text: 'ИММиКН. И.И. Воровича',
            },  {
                id: 'management',
                text: 'Факультет управления',
            } ]);

            // this.selectors.faculty = localStorage.faculty || 'default';
            this.selectors.faculty = 'mmcs';

            return this;
        }

        /**
         * Открыть расписание
         * @param  {string}   type Тип расписания
         * @param  {object}   data Данные расписания
         * @return {Switcher}      this
         */
        openSchedule(type, data) {
            $(system.schedule).html('');

            switch (type) {
                case 'grade':
                    [ 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ' ].forEach((weekday, index) => (new Schedule('day', { 
                        lessons: data.lessons.filter(({ timeslot }) => timeslot[1] == index),
                        curricula: data.curricula,
                        groups: data.groups,
                        weekday: weekday,
                    })).draw($('<div class="schedule"></div>').appendTo($(system.schedule))));
                    break;

                case 'group':
                case 'teacher':
                case 'day':
                case 'room':
                    (new Schedule(type, data)).draw($('<div class="schedule"></div>').appendTo($(system.schedule)));
                    break;
            }

            system.showSchedule();

            return this;
        }

        /**
         * Закрыть расписание
         * @return {Switcher} this
         */
        closeSchedule() {
            system.showIntro();
            return this;
        }
    }

    class Select {
        /**
         * Сгенерировать список опций
         * @param  {select}   text Текст опции по-умолчанию
         * @param  {object[]} data Массив опций
         * @return {Select}        this
         */
        static getOptions(text, data) {
            return [ {
                id: 'default',
                text: text,
                disabled: true,
            } ].concat(data);
        }
    }

    window.Switcher = Switcher;
})();

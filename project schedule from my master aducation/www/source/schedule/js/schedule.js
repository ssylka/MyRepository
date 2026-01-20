(() => {
    'use strict';

    class Schedule {
        /**
         * @param {string} type Тип расписания
         * @param {object} data Данные о занятиях
         */
        constructor(type, data) {
            this.type = type;
            this.weekday = data.weekday || '';

            this.buildTimes(system.times);
            this.buildHeader(data.groups || []);
            this.buildLessons(data.lessons, data.curricula, data.groups || [], system.times);
            this.buildData();
        }

        /**
         * Построение времен пар
         * @param  {array}    times Массив времен
         * @return {Schedule}       this
         */
        buildTimes(times) {
            this.times = times.map((time) => helpers.time.getString(time.cbeg) + '<br>-<br>' + helpers.time.getString(time.cend));
            return this;
        }

        /**
         * Построение шапки
         * @return {Schedule} this
         */
        buildHeader(groups) {
            switch (this.type) {
                case 'group':
                case 'teacher':
                case 'room':
                    this.header = [ 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];
                    break;

                case 'day':
                    this.header = groups.map(group => helpers.getGroupName(group));
                    break;
            }

            return this;
        }

        /**
         * Построение занятий
         * @param  {array}    lessons   Занятия
         * @param  {array}    curricula Дисциплины
         * @param  {array}    groups    Группы
         * @param  {array}    times     Массив времен
         * @return {Schedule}           this
         */
        buildLessons(lessons, curricula, groups, times) {
            if (!lessons) throw new Error('Empty lessons');

            curricula = helpers.array.groupBy(curricula, 'lessonid');

            times = times.map(({ cbeg, cend }) => ({
                begin: helpers.time.getStamp(cbeg),
                end: helpers.time.getStamp(cend),
            }));

            let titles = [];
            switch (this.type) {
                case 'group':
                case 'teacher':
                case 'room':
                    titles = [ 0, 1, 2, 3, 4, 5 ];
                    break;

                case 'day':
                    titles = groups.map(({ id }) => id);
                    break;
            }

            let groupsGrouped = helpers.array.groupBy(groups, 'uberid');
            let groupNames = {};
            Object.keys(groupsGrouped).forEach(key => {
                groupNames[key] = groupsGrouped[key].map(group => helpers.getGroupName(group)).join(', ');
            });

            this.lessons = [];
            lessons.forEach(lesson => {
                try {
                    this.lessons.push(new ScheduleLesson(this.type, lesson, curricula[lesson.id], groupNames[lesson.uberid], times, titles));
                } catch (error) {
                    console.log(error, lesson);
                }
            });

            return this;
        }

        /**
         * Построение данных о занятиях
         * @return {Schedule} this
         */
        buildData() {
            this.data = new Array(this.times.length);
            for (let row = 0, dataLength = this.data.length; row < dataLength; row++) {
                this.data[row] = new Array(this.header.length).fill(null);
            }

            this.lessons.forEach(lesson => {
                let { row, col } = lesson.pos;
                if (!this.data[row][col]) this.data[row][col] = [];
                this.data[row][col].push(lesson);
            });

            this.data = this.data.map(row => row.map(cell => new ScheduleCell(this.type, cell).toArray()));

            return this;
        }

        /**
         * Отрисовка расписания
         * @param  {jQuery}   $block Блок для таблиц
         * @return {Schedule}        this
         */
        draw($block) {
            let $table = $('<table></table>').appendTo($block);

            new Table(this.data, this.times, this.header, this.weekday).draw($table);

            let tweaker = new TableTweaker($table);
            if (this.type === 'teacher' || this.type === 'room') tweaker.deleteEmptySubgroups();
            tweaker.mergeCellsVertical();
            tweaker.mergeCellsHorisontal();
            tweaker.mergeTitles();
            if (system.week) tweaker.blurWeeks(system.weekID, system.weeks.length);
            if (this.type === 'day') tweaker.setGroupsHeader();
            if (this.type === 'day') tweaker.mergeBothsHorisontal();
            if (this.type === 'day') tweaker.mergeWeeksHorisontal();
            //tweaker.mergeBothsVertical();
            //tweaker.fixWidth();
            tweaker.createFulls();
            tweaker.draw();

            return this;
        };
    }

    class ScheduleLesson {
        /**
         * @param {string}   type         Тип расписания
         * @param {object}   lessonRaw    Заняфтие
         * @param {object[]} curriculaRaw Предметы
         * @param {string}   groupName    Название группы
         * @param {object[]} times        Времена пар
         * @param {string[]} columns      Столбцы
         */
        constructor(type, lessonRaw, curriculaRaw, groupName, times, columns) {
            if (!curriculaRaw) throw new Error('Lesson has empty curricula');

            this.type = type;
            this.id = lessonRaw.id;
            this.subcount = lessonRaw.subcount;

            this.setTimeAndPos(lessonRaw.timeslot, lessonRaw.groupid, times, columns);

            this.buildCurricula(curriculaRaw, groupName);

            this.mergeRooms();
            this.mergeGroups();
        }

        /**
         * Устновка времени и позиции занятия
         * @param  {string}         timeslot Timeslot
         * @param  {string}         groupID  ID группы
         * @param  {object[]}       times    Времена пар
         * @param  {string[]}       columns  Столбцы
         * @return {ScheduleLesson}          this
         */
        setTimeAndPos(timeslot, groupID, times, columns) {
            let [ day, begin, end, week ] = timeslot.replace(/[\(\)]/g, '').split(',');

            this.time = {
                begin: helpers.time.getStamp(helpers.time.parse(begin)),
                end: helpers.time.getStamp(helpers.time.parse(end))
            };

            let row, col;

            times.some((time, index) => {
                if (helpers.compare(time, this.time)) {
                    row = index;
                    return true;
                }
            });

            switch (this.type) {
                case 'group':
                case 'teacher':
                case 'room':
                    columns.some((title, index) => {
                        if (title == day) {
                            col = index;
                            return true;
                        }
                    });
                    break;

                case 'day':
                    columns.some((title, index) => {
                        if (title == groupID) {
                            col = index;
                            return true;
                        }
                    });
                    break;
            }

            if (row == null || col == null) throw new Error('Сan not find lesson position');

            this.pos = { row, col };
            this.week = week;

            return this;
        }

        /**
         * Построение занятия
         * @param  {object[]}       curriculaRaw Предметы
         * @param  {string}         groupName    Имя группы
         * @return {ScheduleLesson}              this
         */
        buildCurricula(curriculaRaw, groupName) {
            this.curricula = new Array(this.subcount).fill(null);
            curriculaRaw.forEach(curriculumRaw => {
                this.curricula[curriculumRaw.subnum - 1] = {
                    subject: {
                        name: curriculumRaw.subjectname,
                        abbr: curriculumRaw.subjectabbr || curriculumRaw.subjectname,
                    },
                    teacher: {
                        name: curriculumRaw.teachername,
                        abbr: helpers.getNameAbbr(curriculumRaw.teachername),
                        degree: curriculumRaw.teacherdegree,
                    },
                    room: {
                        name: curriculumRaw.roomname,
                    },
                    group: {
                        name: groupName,
                    },
                };
            });
        }

        /**
         * Объединение предметов по аудиториям
         * @return {ScheduleLesson} this
         */
        mergeRooms() {
            switch (this.type) {
                case 'group':
                case 'day':
                case 'teacher':
                    this.curricula.forEach((curriculum, index) => {
                        let lastCurriculum = this.curricula[index - 1];
                        if (!curriculum || !lastCurriculum) return;

                        if (
                            helpers.compare(curriculum.subject, lastCurriculum.subject) &&
                            helpers.compare(curriculum.teacher, lastCurriculum.teacher) &&
                            helpers.compare(curriculum.group, lastCurriculum.group)
                        ) {
                            lastCurriculum.room.name += `, ${curriculum.room.name}`;
                            this.curricula.splice(index, 1, lastCurriculum);
                        }                  
                    });
                    break;
            }

            return this;
        }

        /**
         * Объединение предметов по группам
         * @return {ScheduleLesson} this
         */
        mergeGroups() {
            switch (this.type) {
                case 'room':
                    this.curricula.forEach((curriculum, index) => {
                        let lastCurriculum = this.curricula[index - 1];
                        if (!curriculum || !lastCurriculum) return;

                        if (
                            helpers.compare(curriculum.subject, lastCurriculum.subject) &&
                            helpers.compare(curriculum.teacher, lastCurriculum.teacher) &&
                            helpers.compare(curriculum.room, lastCurriculum.room)
                        ) {
                            lastCurriculum.group.name += `, ${curriculum.group.name}`;
                            this.curricula.splice(index, 1, lastCurriculum);
                        }                       
                    });
                    break;
            }

            return this;
        }
    }

    class ScheduleCell {
        /**
         * @param {string} type    Тип расписания
         * @param {array}  lessons Занятия
         */
        constructor(type, lessons) {
            this.type = type;

            if (!lessons) {
                this.data = null;
                return;
            }

            let upper = [];
            let lower = [];

            lessons.forEach(lesson => {
                lesson.curricula.forEach(curriculum => curriculum && (curriculum.lessonID = lesson.id));

                switch (lesson.week) {
                    case 'full':
                        helpers.array.setLength(upper, lesson.subcount);
                        helpers.array.setLength(lower, lesson.subcount);
                        lesson.curricula.forEach((curriculum, index) => {
                            if (curriculum) upper[index] = lower[index] = curriculum;
                        });
                        break;

                    case 'upper':
                        helpers.array.setLength(upper, lesson.subcount);
                        lesson.curricula.forEach((curriculum, index) => {
                            if (curriculum) upper[index] = curriculum;
                        });
                        break;

                    case 'lower':
                        helpers.array.setLength(lower, lesson.subcount);
                        lesson.curricula.forEach((curriculum, index) => {
                            if (curriculum) lower[index] = curriculum;
                        });
                        break;
                }
            });

            upper = upper.length ? this.buildLesson(upper) : null;
            lower = lower.length ? this.buildLesson(lower) : null;

            this.data = helpers.compare(upper, lower) ? [ upper ] : [ upper, lower ];
        }

        /**
         * Построение ячейки дисциплины
         * @param  {array}        week Дисциплины
         * @return {ScheduleCell}      this
         */
        buildLesson(week) {
            switch (this.type) {
                case 'group':
                case 'day':
                    return week.map(curriculum => {
                        if (!curriculum) return null;

                        return {
                            title: '<span class="lesson-titie">' +
                                `<span class="subject full">${curriculum.subject.name}</span>` +
                                `<span class="subject short"><abbr title="${curriculum.subject.name}">${curriculum.subject.abbr}</abbr></span>` +
                            '</span>',
                            content: '<span class="lesson-content">' +
                                `<span class="teacher"><abbr title="${curriculum.teacher.name}">${curriculum.teacher.abbr}</abbr></span>` +
                                `<span class="room"><abbr title="${curriculum.room.name}">${curriculum.room.name}</abbr></span>` +
                            '</span>',
                            lessonID: curriculum.lessonID,
                        };
                    });

                case 'teacher':
                    return week.map(curriculum => {
                        if (!curriculum) return null;

                        return {
                            title: '<span class="lesson-titie">' +
                                `<span class="subject full">${curriculum.subject.name}</span>` +
                                `<span class="subject short"><abbr title="${curriculum.subject.name}">${curriculum.subject.abbr}</abbr></span>` +
                            '</span>',
                            content: '<span class="lesson-content">' +
                                `<span class="group"><abbr title="${curriculum.group.name}">${curriculum.group.name}</abbr></span>` +
                                `<span class="room"><abbr title="${curriculum.room.name}">${curriculum.room.name}</abbr></span>` +
                            '</span>',
                            lessonID: curriculum.lessonID,
                        };
                    });

                case 'room':
                    return week.map(curriculum => {
                        if (!curriculum) return null;

                        return {
                            title: '<span class="lesson-titie">' +
                                `<span class="subject full">${curriculum.subject.name}</span>` +
                                `<span class="subject short"><abbr title="${curriculum.subject.name}">${curriculum.subject.abbr}</abbr></span>` +
                            '</span>',
                            content: '<span class="lesson-content">' +
                                `<span class="teacher"><abbr title="${curriculum.teacher.name}">${curriculum.teacher.abbr}</abbr></span>` +
                                `<span class="group"><abbr title="${curriculum.group.name}">${curriculum.group.name}</abbr></span>` +
                            '</span>',
                            lessonID: curriculum.lessonID,
                        };
                    });
            }
        }

        /**
         * Преобразование в массив
         * @return {array} Данные ячейки
         */
        toArray() {
            return this.data;
        }
    }

    window.Schedule = Schedule;
})();

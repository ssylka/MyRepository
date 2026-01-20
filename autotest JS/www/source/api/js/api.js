(() => {
    'use strict';

    window.api = {
        config: {
            host: APIHOST,
            version: 'APIv1',
            get faculty() {
                // return system.faculty;
                return null;
            },
            get urlPrefix() {
                let urlPrefix = `${api.config.host}/${api.config.version}/`;
                if (api.config.faculty && api.config.faculty !== 'default') {
                    urlPrefix = `${api.config.host}/${api.config.faculty}/${api.config.version}/`
                }
                return urlPrefix;
            },
        },

        week: {
            get(callback) {
                query('week', 'get', result => callback(Number(result.week)));
            },
        },

        time: {
            list(callback) {
                query('time/list', 'get', callback);
            },
        },

        teacher: {
	        list(callback) {
                query('teacher/list', 'get', result => callback(result.filter(teacher => teacher.name)));
            },
            schedule(teacher, callback) {
                query(`schedule/teacher/${teacher}`, 'get', callback);
            },
        },

        room: {
            list(callback) {
                query('room/list', 'get', callback);
            },
            schedule(room, callback) {
                query(`schedule/room/${room}`, 'get', callback);
            },
        },

        grade: {
            list(callback) {
                query('grade/list', 'get', grades => {
                    let degrees = {
                        'bachelor': 'Бакалавриат',
                        'master': 'Магистратура',
                        'postgraduate': 'Аспирантура',
                    };

                    callback(grades.map(grade => ({
                        id: grade.id,
                        num: String(grade.num),
                        degree: grade.degree,
                        name: `${degrees[grade.degree]}, ${grade.num} курс`
                    })));
                });
            },
            schedule(grade, callback) {
                query(`schedule/grade/${grade}`, 'get', callback);
            },
            scheduleForDay(grade, day, callback) {
                api.grade.schedule(grade, data => callback({
                    lessons: data.lessons.filter(({ timeslot }) => timeslot[1] === day),
                    curricula: data.curricula,
                    groups: data.groups,
                }));
            },
        },

        group: {
            list(callback) {
                api.grade.list(grades => {
                    let groups = [];
                    let queryCount = 0;
                    grades.forEach(({ id }) => {
                        api.group.listGrade(id, gradeGroups => {
                            groups.push.apply(groups, gradeGroups);
                            queryCount++;
                            if (queryCount === grades.length) callback(groups);
                        });
                    });
                });
            },
            listGrade(grade, callback) {
                query(`group/forGrade/${grade}`, 'get', callback);
            },
            schedule(group, callback) {
                query(`schedule/group/${group}`, 'get', callback);
            },
        },

        subject: {
            list(callback) {
                query('subject/list', 'get', callback);
            },
        },
    };

    /**
     * Отправка запроса
     * @param {string}   url      Фдрес
     * @param {string}   type     Тип запроса (post, get, pop)
     * @param {function} callback
     */
    function query(url, type, callback) {
        url = `${api.config.urlPrefix}${url}`;
        type = (type || 'POST').toUpperCase();
        callback = callback || (() => {});

        const success = result => callback(result);

        $.ajax({ url, type, success });
    };
})();

(() => {
    'use strict';

    class Page {
        /**
         * Установить факультет в шапке
         */
        setFaculty() {
            let $faculty = $('#faculty');

            switch (system.faculty) {
                case 'mmcs':
                    $faculty.html('Интерактивное расписание мехмата ЮФУ');
                    break;

                case 'management':
                    $faculty.html('Интерактивное расписание факультета управления ЮФУ');
                    break;

                default:
                    $faculty.html('Интерактивное расписание');
            }
        }

        /**
         * Установить неделю в шапке
         */
        setWeek() {
            let $week = $('#week');

            switch (system.week) {
                case 'upper':
                    $week.html('Сейчас верхняя неделя');
                    break;

                case 'lower':
                    $week.html('Сейчас нижняя неделя');
                    break;

                default:
                    $week.html('Неделя не известна');
            }
        }
    }

    window.Page = Page;
})();

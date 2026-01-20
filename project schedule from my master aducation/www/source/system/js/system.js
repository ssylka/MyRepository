(() => {
    'use strict';

    class System {
        constructor() {
            this.intro = '#intro';
            this.schedule = '#schedule';

            this.weeks = [ 'upper', 'lower' ];

            this.showIntro();
        }

        /**
         * Отобразить расписание
         * @return {System} this
         */
        showSchedule() {
            $(this.intro).hide();
            $(this.schedule).show();
            $(window).trigger('onScheduleShow', [ true ]);

            return this;
        }

        /**
         * Отобразить интро
         * @return {System} this
         */
        showIntro() {
            $(this.intro).show();
            $(this.schedule).hide();
            $(window).trigger('onScheduleShow', [ false ]);

            return this;
        }

        /**
         * Получить неделю
         * @return {string} Неделя
         */
        get week() {
            return this.weeks[this.weekID] || null;
        }
    }

    window.System = System;
})();

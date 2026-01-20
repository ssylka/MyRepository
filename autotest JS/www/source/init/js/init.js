(() => {
    'use strict';

    $(() => {
        let system = window.system = new System();
        let page = window.page = new Page();
        let switcher = new Switcher();

        // Курсор во время API запросов
        $(document).ajaxStart(() => $(document.body).css('cursor', 'progress'));
        $(document).ajaxStop(() => $(document.body).css('cursor', 'auto'));

        // Получение недели и вывод ее в шапке
        api.week.get(weekID => {
            system.weekID = weekID;
            page.setWeek();
        });

        // Получение времен для расписания
        api.time.list(times => system.times = times);

        // Настройка селекторов
        switcher.set();

        // Обработка кнопки печати
        $('#print').on('click', () => window.print());
    });
})();

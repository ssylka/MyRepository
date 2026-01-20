(() => {
    'use strict';

    class helpers {
        /**
         * Получить "Фамилия И.О." по "Фамилия Имя Отчество"
         * @param  {string} name "Фамилия Имя Отчество"
         * @return {string}      "Фамилия И.О."
         */
        static getNameAbbr(name) {
            let [ lastName, firstName, secondName ] = name.split(' ');
            lastName = lastName ? `${lastName} ` : '';
            firstName = firstName ? `${firstName[0]}.` : '';
            secondName = secondName ? `${secondName[0]}.` : '';
            return `${lastName}${firstName}${secondName}`;
        }

        /**
         * Получить название группы
         * @param  {object} group    Группа
         * @param  {string} gradeNum Номер курса
         * @return {string}          Название группы
         */
        static getGroupName({ gradenum, groupnum, num, name }, gradeNum) {
            gradenum = gradenum || gradeNum;
            groupnum = groupnum || num;

            gradenum = gradenum ? `${gradenum}.` : '';
            name = name && name !== 'NULL' ? ` (${name})` : '';
            
            return `${gradenum}${groupnum}${name}`;
        }

        /**
         * Сравнение объектов
         * @param  {object} x Объект 1
         * @param  {object} y Объект 2
         * @return {bool}     Совпадают ли объекты
         */
        static compare(x, y) {
            return JSON.stringify(x) === JSON.stringify(y);
        }

        /**
         * Сумма
         * @param  {number} ... Значения
         * @return {number}     Сумма
         */
        static sum(/* ... */) {
            let arr = arguments;
            let a = arr[0];
            for (let i = 1; i < arr.length; i++) a += arr[i];
            return a;
        }

        /**
         * Получить диапазон [first, last)
         * @param  {number}   first
         * @param  {number}   last
         * @return {number[]}
         */
        static range(first, last) {
            let size = last - first;
            let arr = new Array(size);
            for (let i = 0; i < size; i++) arr[i] = i + first;
            return arr;
        }

        /**
         * Сделать первую букву заглавной
         * @param  {string} str
         * @return {string}
         */
        static firstUpper(str) {
            return str.charAt(0).toUpperCase() + str.substr(1);
        }
    }

    class array {
        /**
         * Сгруппировать массив объектов по ключу
         * @param  {objects[]} array Массив
         * @param              key   Ключ
         * @return {object}          Сгруппированный массив
         */
        static groupBy(array, key) {
            let res = {};
            array.forEach(function (elem) {
                if (!elem) return;

                let keyVal = JSON.stringify(elem[key]);
                if (res[keyVal]) {
                    res[keyVal].push(elem);
                } else {
                    res[keyVal] = [ elem ];
                }
            });
            return res;
        }

        /**
         * Задать длину массиву (новые элементы null)
         * @param  {array}  array  Массив
         * @param  {number} length Новая длина массива
         * @return {array}         Массив
         */
        static setLength(array, length) {
            let oldLength = array.length;
            array.length = length;
            array.fill(null, oldLength);
            return array;
        }

        /**
         * Получить последний элемент массива
         * @param  {array} array Массив
         * @return               Значение
         */
        static last(array) {
            if (array.length) return array[array.length - 1];
        }
    }

    class time {
        /**
         * Разбор времени
         * @param  {string} time Время
         * @return {object}      Часы и минуты
         */
        static parse(time) {
            let [ full, hours, minutes ] = /([0-9]+):([0-9]+)/.exec(time);
            hours = Number(hours);
            minutes = Number(minutes);
            return { hours, minutes };
        }

        /**
         * Получить время в минутах
         * @param  {object} time Часы и минуты
         * @return {number}      Минуты
         */
        static getStamp({ hours, minutes }) {
            return hours * 60 + (minutes || 0);
        }

        /**
         * Получить строку со временем
         * @param  {object} time Часы и минуты
         * @return {string}      Время
         */
        static getString({ hours, minutes }) {
            if (!minutes) return `${hours}:00`;
            if (minutes < 10) return `${hours}:0${minutes}`;
            return `${hours}:${minutes}`;
        }
    }

    window.helpers = helpers;
    helpers.array = array;
    helpers.time = time;
})();

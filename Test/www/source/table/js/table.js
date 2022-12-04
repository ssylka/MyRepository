(() => {
    'use strict';

    let lengths = [ 1, 2, 6, 12, 60, 60, 420, 840 ];

    class Table {
        /**
         * @param {array}  data    Матрица с занятиями
         * @param {array}  times   Левая колоннка таблицы
         * @param {array}  header  Шапка таблицы
         * @param {string} weekday День недели
         */
        constructor(data, times, header, weekday) {
            this.times = times;
            this.header = header;
            this.weekday = weekday;
            this.data = data;

            this.setRows();
            this.setCols();
        }

        /**
         * Заполнение массива строк
         * @return {Table} this
         */
        setRows() {
            this.rows = new Array(this.data.length);
            for (let rowsKey = 0, rowsLength = this.rows.length; rowsKey < rowsLength; rowsKey++) {
                this.rows[rowsKey] = new TableRow(this.data[rowsKey], this, rowsKey);
            }

            return this;
        }

        /**
         * Заполнение массива строк
         * @return {Table} this
         */
        setCols() {
            this.cols = new Array(this.rows[0].cells.length);
            for (let colsKey = 0, colsLength = this.cols.length; colsKey < colsLength; colsKey++) {
                this.cols[colsKey] = new TableCol(this.rows.map(row => row.cells[colsKey]), this, colsKey);
            }

            return this;
        }

        /**
         * Отрисовка таблицы
         * @param  {jQuery} $table Объект таблицы
         * @return {Table}         this
         */
        draw($table) {
            let $header = $('<thead></thead>').appendTo($table);
            let $wRow = $('<tr class="service"><td id="bodySize"></td></tr>').appendTo($header);
            let $tRow = $(`<tr><td>${this.weekday}</td></tr>`).appendTo($header);
            let colWidth = `${95 / this.header.length}%`;
            this.header.forEach((columnTitle, index) => {
                $(`<td colspan=${this.cols[index].length}></td>`).css('width', colWidth).appendTo($wRow);
                $(`<td colspan=${this.cols[index].length} class="title"><span>${columnTitle}</span></td>`).appendTo($tRow);
            });
            $wRow.children().first().css('width', '50px');
            $wRow.children().last().css('width', 'auto');

            let width = helpers.sum.apply(helpers, this.cols.map(({ length }) => length)) + 1;
            let height = helpers.sum.apply(helpers, this.rows.map(({ length }) => length));
            $wRow.find("#bodySize").data({ width, height });

            this.$body = $('<tbody></tbody>').appendTo($table);
            this.rows.forEach(row => row.draw());

            return this;
        }
    }

    class TableRow {
        /**
         * @param {array|object} cellsRaw Массив ячеек
         * @param {object}       table    Таблица
         * @param {integer}      pos      Номер строки
         */
        constructor(cellsRaw, table, pos) {
            this.table = table;
            this.pos = pos;

            this.cells = cellsRaw.map(cellRaw => new TableCell(cellRaw, this, null));
            this.size = Math.max.apply(Math, this.cells.map(cell => cell.vLength));
            this.length = lengths[this.size - 1];
        }

        /**
         * Отрисовка строки таблицы
         * @return {TableRow} this
         */
        draw() {
            this.rows = new Array(this.length);
            for (let rowsKey = 0, rowsLength = this.rows.length; rowsKey < rowsLength; rowsKey++) {
                this.rows[rowsKey] = $('<tr></tr>').appendTo(this.table.$body);
            }

            $(`<td rowspan=${this.length} class="time">${this.table.times[this.pos]}</td>`).appendTo(this.rows[0]);

            this.cells.forEach(cell => cell.draw());

            return this;
        }
    }

    class TableCol {
        /**
         * @param {array|object} cellsRaw Массив ячеек
         * @param {object}       table    Таблица
         * @param {integer}      pos      Номер колонки
         */
        constructor(cellsRaw, table, pos) {
            this.table = table;
            this.pos = pos;

            this.cells = cellsRaw.map(cellRaw => new TableCell(cellRaw, null, this));
            this.size = Math.max.apply(Math, this.cells.map(cell => cell.hLength));
            this.length = lengths[this.size - 1];
        }
    }

    class TableCell {
        /**
         * @param {array}  cellRaw Ячейка
         * @param {object} row     Строка
         * @param {object} col     Колонка
         */
        constructor(cellRaw, row, col) {
            // Проверка на созданность объекта
            if (cellRaw instanceof TableCell) {
                if (row) cellRaw.row = row;
                if (col) cellRaw.col = col;
                return cellRaw;
            }

            this.row = row;
            this.col = col;

            this.weeks = cellRaw ? cellRaw.map((weekRaw, pos) => new TableWeek(weekRaw, this, pos)) : [ new TableWeek(null, this, 0) ];
            this.vLength = this.weeks.length * 2;
            this.hLength = Math.max.apply(Math, this.weeks.map(week => week.length));

            if (this.vLength >= lengths.length || this.hLength >= lengths.length) {
                this.weeks = [ new TableWeek(null, this, 0) ];
                this.vLength = 2;
                this.hLength = 1;
                console.log(new Error('Very big cell'), cellRaw);
            };
        }

        /**
         * Отрисовка ячейки
         * @return {TableCell} this
         */
        draw() {
            let row = this.row.rows[0];
            let colPos = row.children().length;
            this.weeks.forEach(week => week.draw());
            row.children().eq(colPos).data('height', this.row.length).data('weeksNumber', this.weeks.length);

            return this;
        }
    }

    class TableWeek {
        /**
         * @param {array}   weekRaw Неделя
         * @param {object}  cell    Ячейка
         * @param {integer} pos     Номер недели
         */
        constructor(weekRaw, cell, pos) {
            this.cell = cell;
            this.pos = pos;

            this.curricula = weekRaw ? weekRaw.map(curriculumRaw => new TableCurriculum(curriculumRaw, this)) : [ new TableCurriculum(null, this) ];
            this.length = this.curricula.length;
        }

        /**
         * Отрисовка недели
         * @return {TableWeek} this
         */
        draw() {
            this.rowSize = this.cell.row.length / this.cell.vLength * 2;
            this.colSize = this.cell.col.length / this.length;
            let rowPos = this.pos * this.rowSize;
            this.rows = [ this.cell.row.rows[rowPos], this.cell.row.rows[rowPos + 1] ];

            let colPos = this.rows[0].children().length;
            this.curricula.forEach(group => group.draw());
            this.rows[0].children().eq(colPos).data('width', this.cell.col.length);

            return this;
        }
    }

    class TableCurriculum {
        /**
         * @param {object} curriculumRaw Предмет
         * @param {object} week         Неделя
         */
        constructor(curriculumRaw, week) {
            this.week = week;

            if (!curriculumRaw) {
                this.title = '';
                this.content = '';
                this.lessonID = null;
                return;
            }

            this.title = curriculumRaw.title;
            this.content = curriculumRaw.content;
            this.lessonID = curriculumRaw.lessonID;
        }

        /**
         * Отрисвка группы занятий
         * @return {TableWeek} this
         */
        draw() {
            $(`<td colspan=${this.week.colSize} class="cell-title lesson_${this.lessonID}">${this.title}</td>`).appendTo(this.week.rows[0]);
            $(`<td rowspan=${this.week.rowSize - 1} colspan=${this.week.colSize} class="cell-content lesson_${this.lessonID}">${this.content}</td>`).appendTo(this.week.rows[1]);

            return this;
        }
    }

    window.Table = Table;
})();

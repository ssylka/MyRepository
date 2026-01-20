(() => {
    'use strict';

    class TableTweaker {
        /**
         * @param {jQuery} $table Блок таблицы
         */
        constructor($table) {
            this.$table = $table;
            this.$header = this.$table.children('thead');
            this.$body = this.$table.children('tbody');

            let bodySize = this.$header.find("#bodySize").data();
            this.sizeX = bodySize.width;
            this.sizeY = bodySize.height;

            function getType($cell) {
                if ($cell.hasClass('cell-title')) return 'title';
                if ($cell.hasClass('cell-content')) return 'content';
                if ($cell.hasClass('time')) return 'time';
            }

            this.cellsMap = new CellsMap([], 0, 0, this.sizeX, this.sizeY);

            let [ posX, posY ] = [ 0, 0 ];

            let $cells = this.$body.find('td');
            $cells.toArray().forEach(cellDOM => {
                while (this.cellsMap.getCell(posX, posY)) {
                    posX++;
                    if (posX >= this.sizeX) {
                        posX = 0;
                        posY++;
                    }
                }

                let $cell = $(cellDOM);

                let cell = {
                    posX: posX,
                    posY: posY,
                    sizeX: cellDOM.colSpan,
                    sizeY: cellDOM.rowSpan,
                    sizeXBoth: $cell.data('width'),
                    sizeYBoth: $cell.data('height'),
                    weeksNumber: $cell.data('weeksNumber'),
                    type: getType($cell),
                    domClass: cellDOM.className,
                    html: $cell.html(),
                };

                this.cellsMap.import(new CellsMap([ cell ], cell.posX, cell.posY, cell.sizeX, cell.sizeY));
            });
        }

        /**
         * Вывод таблицы
         * @return {TableTweaker} this
         */
        draw() {
            this.$body.find('td').remove();
            let $rows = this.$body.children();
            for (let y = 0; y < this.sizeY; y++) for (let x = 0; x < this.sizeX; x++) {
                let cell = this.cellsMap.getCell(x, y, true);
                if (!cell) continue;

                $('<td></td>').attr({
                    class: cell.domClass,
                    colspan: cell.sizeX,
                    rowspan: cell.sizeY,
                }).html(cell.html).data('width', cell.sizeXBoth).data('height', cell.sizeYBoth)
                    .data('weeksNumber', cell.weeksNumber).appendTo($rows.eq(cell.posY));
            }

            return this;
        }

        /**
         * Объединение главных ячеек по вертикали
         * @return {TableTweaker} this
         */
        mergeBothsVertical() {
            for (let x = 1; x < this.sizeX; x++) for (let y = 0; y < this.sizeY; y++) {
                let current = new Cell(this.cellsMap, this.cellsMap.getCell(x, y, true), 'both');
                if (!current.ok || current.empty) continue;

                let next = new Cell(this.cellsMap, this.cellsMap.getCell(x, y + current.sizeY, true), 'both');
                if (!next.ok || current.sizeX !== next.sizeX || current.html() !== next.html()) continue;

                current.mergeVertical(next);
                this.cellsMap.import(current.cellsMap);

                y--;
            }
            
            return this;
        }

        /**
         * Объединение главных ячеек по горизонтали
         * @return {TableTweaker} this
         */
        mergeBothsHorisontal() {
            for (let x = 1; x < this.sizeX; x++) for (let y = 0; y < this.sizeY; y++) {
                let current = new Cell(this.cellsMap, this.cellsMap.getCell(x, y, true), 'both');
                if (!current.ok || current.empty) continue;

                let next = new Cell(this.cellsMap, this.cellsMap.getCell(x + current.sizeX, y, true), 'both');
                if (!next.ok || current.sizeY !== next.sizeY || current.html() !== next.html()) continue;

                current.mergeHorisontal(next);
                this.cellsMap.import(current.cellsMap);

                y--;
            }
            
            return this;
        }

        /**
         * Объединение недель по горизонтали
         * @return {TableTweaker} this
         */
        mergeWeeksHorisontal() {
            for (let x = 1; x < this.sizeX; x++) for (let y = 0; y < this.sizeY; y++) {
                let current = new Cell(this.cellsMap, this.cellsMap.getCell(x, y, true), 'week');
                if (!current.ok || current.empty) continue;

                let next = new Cell(this.cellsMap, this.cellsMap.getCell(x + current.sizeX, y, true), 'week');
                if (!next.ok || current.sizeY !== next.sizeY || current.html() !== next.html()) continue;

                current.mergeHorisontal(next);
                this.cellsMap.import(current.cellsMap);

                y--;
            }
            
            return this;
        }

        /**
         * Объединение ячеек по вертикали
         * @return {TableTweaker} this
         */
        mergeCellsVertical() {
            for (let x = 1; x < this.sizeX; x++) for (let y = 0; y < this.sizeY; y++) {
                let current = new Cell(this.cellsMap, this.cellsMap.getCell(x, y, true));
                if (!current.ok) continue;

                let both = Cell.getBoth(this.cellsMap, current.posX, current.posY);
                let next = new Cell(both.cellsMap, both.cellsMap.getCell(x, y + current.sizeY, true));
                if (!next.ok || current.sizeX !== next.sizeX || current.html() !== next.html()) continue;

                current.mergeVertical(next);
                this.cellsMap.import(current.cellsMap);

                y--;
            }
            
            return this;
        }

        /**
         * Объединение ячеек по горизонтали
         * @return {TableTweaker} this
         */
        mergeCellsHorisontal() {
            for (let x = 1; x < this.sizeX; x++) for (let y = 0; y < this.sizeY; y++) {
                let current = new Cell(this.cellsMap, this.cellsMap.getCell(x, y, true));
                if (!current.ok) continue;

                let both = Cell.getBoth(this.cellsMap, current.posX, current.posY);
                let next = new Cell(both.cellsMap, both.cellsMap.getCell(x + current.sizeX, y, true));
                if (!next.ok || current.sizeY !== next.sizeY || current.html() !== next.html()) continue;

                current.mergeHorisontal(next);
                this.cellsMap.import(current.cellsMap);

                y--;
            }
            
            return this;
        }

        /**
         * Объединение заголовков ячеек
         * @return {TableTweaker} this
         */
        mergeTitles() {
            for (let x = 1; x < this.sizeX; x++) for (let y = 0; y < this.sizeY; y++) {
                let week = new Cell(this.cellsMap, this.cellsMap.getCell(x, y, true), 'week');
                if (!week.ok) continue;

                let previous = week.cells[0];
                let cells = week.cells.filter(cell => cell.posX !== week.posX && cell.posY === week.posY);
                cells.forEach(current => {
                    if (current.html && current.domClass === previous.domClass && current.html === previous.html) {
                        previous.sizeX += current.sizeX;
                        current.sizeX = 0;
                    } else {
                        previous = current;
                    }
                });

                week.cellsMap = new CellsMap(week.cells, week.posX, week.posY, week.sizeX, week.sizeY);
                this.cellsMap.import(week.cellsMap);
            }

            return this;
        }

        /**
         * Сгенерировать ячейки типа full
         * @return {TableTweaker} this
         */
        createFulls() {
            for (let x = 1; x < this.sizeX; x++) for (let y = 0; y < this.sizeY; y++) {
                let cell = new Cell(this.cellsMap, this.cellsMap.getCell(x, y, true));
                if (!cell.ok || cell.cells.length !== 2) continue;

                let cellRaw = cell.createFull();
                this.cellsMap.import(new CellsMap([ cellRaw ], cellRaw.posX, cellRaw.posY, cellRaw.sizeX, cellRaw.sizeY));
            }

            return this;
        }

        /**
         * Удаление пустых подгрупп
         * @return {TableTweaker} this
         */
        deleteEmptySubgroups() {
            for (let x = 1; x < this.sizeX; x++) for (let y = 0; y < this.sizeY; y++) {
                let week = new Cell(this.cellsMap, this.cellsMap.getCell(x, y, true), 'week');
                if (!week.ok || week.empty) continue;

                let oldLength = 0;
                let newLength = 0;
                week.cells.forEach(cellRaw => {
                    if (cellRaw.posY !== week.posY) return true;
                    
                    let cell = new Cell(week.cellsMap, cellRaw);
                    if (!cell.ok) return;

                    oldLength++;

                    if (cell.empty) {
                        cell.cells.forEach(cellRaw => cellRaw.sizeX = 0);
                    } else {
                        newLength++;
                    }
                });

                week.cells.some(cellRaw => {
                    let cell = new Cell(week.cellsMap, cellRaw);
                    if (!cell.ok || !cellRaw.sizeX) return;

                    cellRaw.sizeXBoth = week.cells[0].sizeXBoth;
                    cellRaw.sizeYBoth = week.cells[0].sizeYBoth;
                    return true;
                });


                let widthMul = oldLength / newLength;    
                let offsetsX = new Array(week.sizeY).fill(week.posX);
                week.cells.forEach(cell => {
                    if (!cell.sizeX) return;

                    cell.posX = offsetsX[cell.posY - week.posY];
                    cell.sizeX *= widthMul;

                    let yBegin = cell.posY - week.posY;
                    let yEnd = cell.posY - week.posY + cell.sizeY;
                    let offsetX = cell.posX + cell.sizeX;
                    for (let y = yBegin; y < yEnd; y++) offsetsX[y] = offsetX;
                });

                week.cellsMap = new CellsMap(week.cells, week.posX, week.posY, week.sizeX, week.sizeY);
                this.cellsMap.import(week.cellsMap);
            }
            
            return this;
        }

        /**
         * Добавление строки с названиями направлений
         * @return {TableTweaker} this
         */
        setGroupsHeader() {
            let $fRow = this.$header.children().eq(0);
            let $tRow = this.$header.children().eq(1);
            let $aRow = $('<tr></tr>').insertAfter($fRow);

            let $tCells = $tRow.children();
            $tCells.first().detach().attr('rowspan', 2).appendTo($aRow);
            $tCells = $tCells.slice(1);

            $tCells.toArray().forEach(title => {
                let $title = $(title);
                let text = $title.text();
                let [ fullText, titleText, areaText ] = /(.*?) \((.*?)\)/.exec(text) || [ text, text, '' ];

                let $lastArea = $aRow.children().last();
                if ($aRow.children().length > 1 && $lastArea.text() === areaText) {
                    let colspan = Number($lastArea.attr('colspan')) + Number($title.attr('colspan'));
                    $lastArea.attr('colspan', colspan);
                } else {
                    let colspan = Number($title.attr('colspan'));
                    $(`<td colspan="${colspan}"><span>${areaText}</span></td>`).appendTo($aRow);
                }

                $title.html(`<span>${titleText} гр.</span>`);
            });
            
            return this;
        }

        /**
         * Пересчет ширины
         * @return {TableTweaker} this
         */
        fixWidth() {
            let $fRow = this.$header.children().first();
            let $fCells = $fRow.children().slice(1);

            let boths = [];
            for (let x = 1; x < this.sizeX; x++) for (let y = 0; y < this.sizeY; y++) {
                let both = new Cell(this.cellsMap, this.cellsMap.getCell(x, y, true), 'both');
                if (both.ok) boths.push(both);
            }

            let offsetX = 1;
            let fCells = $fCells.toArray().map(title => {
                let sizeX = Number(title.colSpan);
                let weeks = new Array(this.sizeY).fill(0);
                boths.forEach(both => {
                    if (offsetX >= both.posX && offsetX < both.posX + both.sizeX) both.cells.forEach(cell => {
                        if (cell.type === 'title') weeks[cell.posY] += sizeX / both.sizeX;
                    });
                });
                let weight = Math.max.apply(Math, weeks);

                offsetX += sizeX;
                return weight;
            });

            let colWidth = 95 / helpers.sum.apply(helpers, fCells);
            fCells.forEach((weight, index) => $fCells.eq(index).css('width', `${colWidth * weight}%`));
            $fRow.children().last().css('width', 'auto');
            
            return this;
        }

        /**
         * Заблюривание недель
         * @param  {number}       weeksPos    Номер игнорируемой недели
         * @param  {number}       weeksNumber Количество недель, когда будет применяться блюр
         * @return {TableTweaker}             this
         */
        blurWeeks(weeksPos, weeksNumber) {
            for (let x = 1; x < this.sizeX; x++) for (let y = 0; y < this.sizeY; y++) {
                let both = new Cell(this.cellsMap, this.cellsMap.getCell(x, y, true), 'both');
                if (!both.ok || both.cells[0].weeksNumber !== weeksNumber) continue;

                let sizeY = both.sizeY / weeksNumber;
                let posY = both.posY + weeksPos * sizeY;

                both.cells.forEach(cellRaw => {
                    let cell = new Cell(both.cellsMap, cellRaw);
                    if (cell.ok && cell.posY !== posY && cell.sizeY === sizeY) {
                        cell.cells.forEach(cell => cell.domClass += ' cell-blured');
                    }
                });
            }
            
            return this;
        }
    }

    class CellsMap {
        /**
         * @param {object[]} cells   Массив ячеек
         * @param {number}   offsetX Отступ области по X
         * @param {number}   offsetY Отступ области по Y
         * @param {number}   sizeX   Размер области по X
         * @param {number}   sizeY   Размер области по Y
         */
        constructor(cells, offsetX, offsetY, sizeX, sizeY) {
            this.offsetX = offsetX;
            this.offsetY = offsetY;
            this.sizeX = sizeX;
            this.sizeY = sizeY;

            this.map = new Array(this.sizeY);
            for (let y = 0; y < this.sizeY; y++) this.map[y] = new Array(this.sizeX).fill(null);

            cells.forEach(cell => {
                let xBegin = Math.max(this.offsetX, cell.posX);
                let xEnd = Math.min(this.offsetX + this.sizeX, cell.posX + cell.sizeX);
                let yBegin = Math.max(this.offsetY, cell.posY);
                let yEnd = Math.min(this.offsetY + this.sizeY, cell.posY + cell.sizeY);
                for (let x = xBegin; x < xEnd; x++) for (let y = yBegin; y < yEnd; y++) {
                    this.setCell(cell, x, y);
                }
            });
        }

        /**
         * Импорт области в текущую
         * @param  {CellsMap} cellsMap Импортируемая область
         * @return {CellsMap}          this
         */
        import(cellsMap) {
            let xBegin = Math.max(this.offsetX, cellsMap.offsetX);
            let xEnd = Math.min(this.offsetX + this.sizeX, cellsMap.offsetX + cellsMap.sizeX);
            let yBegin = Math.max(this.offsetY, cellsMap.offsetY);
            let yEnd = Math.min(this.offsetY + this.sizeY, cellsMap.offsetY + cellsMap.sizeY);
            for (let x = xBegin; x < xEnd; x++) for (let y = yBegin; y < yEnd; y++) {
                this.setCell(cellsMap.getCell(x, y), x, y);
            }

            return this;
        }

        /**
         * Экспорт области
         * @param  {number}   offsetX Отступ области по X
         * @param  {number}   offsetY Отступ области по Y
         * @param  {number}   sizeX   Размер области по X
         * @param  {number}   sizeY   Размер области по Y
         * @return {CellsMap}         Область
         */
        export(offsetX, offsetY, sizeX, sizeY) {
            return new CellsMap([], offsetX, offsetY, sizeX, sizeY).import(this);
        }

        /**
         * Задать ячейку
         * @param  {object} cell Ячейка
         * @param  {number} x    Позиция по X
         * @param  {number} y    Позиция по Y
         * @return {object}      Ячейка
         */
        setCell(cell, x, y) {
            return this.map[y - this.offsetY][x - this.offsetX] = cell;
        }

        /**
         * Получить ячейку
         * @param  {number} x      Позиция по X
         * @param  {number} y      Позиция по Y
         * @param  {bool}   strict Получить ячейку только при совпадении координат
         * @return {object}        Ячейка
         */
        getCell(x, y, strict) {
            if (
                x < this.offestX || x - this.offsetX >= this.sizeX ||
                y < this.offsetY || y - this.offsetY >= this.sizeY
            ) return null;

            let cell = this.map[y - this.offsetY][x - this.offsetX];
            if (strict && (!cell || cell.posX !== x || cell.posY !== y)) return null;
            return cell;
        }

        /**
         * Получить массив всех ячеек
         * @return {object[]} Ячейки
         */
        getCells() {
            let cells = [];
            let xBegin = this.offsetX;
            let xEnd = this.offsetX + this.sizeX;
            let yBegin = this.offsetY;
            let yEnd = this.offsetY + this.sizeY;
            for (let x = xBegin; x < xEnd; x++) for (let y = yBegin; y < yEnd; y++) {
                let cell = this.getCell(x, y, true);
                if (cell) cells.push(cell);
            }
            return cells;
        }
    }

    class Cell {
        /**
         * @param {CellsMap} cellsMap Область ячейки (для составления главной ячейки и поиска компонентов текущей)
         * @param {object}   cell     Ячейка
         * @param {string}   type     Тип ячейки [ 'cell', 'weel', 'both' ]
         */
        constructor(cellsMap, cell, type) {
            // Флаг корректности
            this.ok = false;

            // Проверка на существование
            if (!cell) return;

            // Перенос свойств из ячейки
            this.posX = cell.posX;
            this.posY = cell.posY;
            this.sizeX = cell.sizeX;
            this.sizeY = cell.sizeY;

            this.type = type || 'cell';

            switch (this.type) {
                case 'both':
                    if (!cell.sizeXBoth || !cell.sizeYBoth) return;
                    this.isBoth = true;
                    this.sizeX = cell.sizeXBoth;
                    this.sizeY = cell.sizeYBoth;
                    break;

                case 'week':
                    if (!cell.sizeXBoth || cell.type !== 'title') return;
                    this.isWeek = true;
                    this.sizeX = cell.sizeXBoth;
                    this.sizeY = 1 + cellsMap.getCell(this.posX, this.posY + 1, true).sizeY;
                    break;

                case 'cell':
                    if (cell.type !== 'title') return;
                    this.sizeY = 1 + cellsMap.getCell(this.posX, this.posY + 1, true).sizeY;
                    break;

                default:
                    return;
            }

            this.cellsMap = cellsMap.export(this.posX, this.posY, this.sizeX, this.sizeY);
            this.cells = this.cellsMap.getCells();
            this.empty = this.cells.every(cell => cell.html === '');

            // Флаг корректности
            this.ok = true;
        }

        /**
         * Получение HTML ячейки
         * @return {string} HTML
         */
        html() {
            return this.ok ? this.cells.map(cell => `${cell.html}_${cell.domClass}`).join('\n') : '';
        }

        /**
         * Вертикальное объединение ячеек
         * @param  {Cell} next Поглощаемая ячейка
         * @return {Cell}      this
         */
        mergeVertical(next) {
            let offsetsY = new Array(this.sizeX).fill(this.posY);
            for (let i = 0; i < this.cells.length; i++) {
                let tData = this.cells[i];
                let nData = next.cells[i];

                tData.posY = offsetsY[tData.posX - this.posX];
                if (tData.type === 'content') tData.sizeY += nData.sizeY + 1;

                let xBegin = tData.posX - this.posX;
                let xEnd = tData.posX - this.posX + tData.sizeX;
                let offsetY = tData.posY + tData.sizeY;
                for (let x = xBegin; x < xEnd; x++) offsetsY[x] = offsetY;
            }

            this.sizeY += next.sizeY;
            if (this.isBoth && next.isBoth) this.cells[0].sizeYBoth = this.sizeY;

            this.cellsMap = new CellsMap(this.cells, this.posX, this.posY, this.sizeX, this.sizeY);

            return this;
        }

        /**
         * Горизонтальное объединение ячеек
         * @param  {Cell} next Поглощаемая ячейка
         * @return {Cell}      this
         */
        mergeHorisontal(next) {
            let offsetsX = new Array(this.sizeY).fill(this.posX);
            for (let i = 0; i < this.cells.length; i++) {
                let tData = this.cells[i];
                let nData = next.cells[i];

                tData.posX = offsetsX[tData.posY - this.posY];
                tData.sizeX += nData.sizeX;

                let yBegin = tData.posY - this.posY;
                let yEnd = tData.posY - this.posY + tData.sizeY;
                let offsetX = tData.posX + tData.sizeX;
                for (let y = yBegin; y < yEnd; y++) offsetsX[y] = offsetX;
            }

            this.sizeX += next.sizeX;
            if (this.isBoth && next.isBoth || this.isWeek && next.isWeek) this.cells[0].sizeXBoth = this.sizeX;

            this.cellsMap = new CellsMap(this.cells, this.posX, this.posY, this.sizeX, this.sizeY);

            return this;
        }

        /**
         * Получить ячейку типа full
         * @return {object} Ячейка
         */
        createFull() {
            let cell = Object.assign(this.cells[0]);
            cell.sizeY += this.cells[1].sizeY;
            cell.domClass = cell.domClass.replace('cell-title', 'cell-full');
            cell.html += this.cells[1].html;
            return cell;
        }

        /**
         * Получение главной ячейки
         * @param  {CellsMap} cellsMap Ячейки, среди которых происходит поиск
         * @param  {number}   x        Положение ячейки по X
         * @param  {number}   y        Положение ячейки по Y
         * @return {Cell}              Найденная ячейка или Cell(null)
         */
        static getBoth(cellsMap, x, y) {
            let fCell = null;
            cellsMap.getCells().some(cell => {
                if (!cell || cell.deleted) return false;

                if (
                    cell.sizeXBoth && x >= cell.posX && x < cell.posX + cell.sizeXBoth &&
                    cell.sizeYBoth && y >= cell.posY && y < cell.posY + cell.sizeYBoth
                ) {
                    fCell = cell;
                    return true;
                }
            });
            return new Cell(cellsMap, fCell, 'both');
        }
    }

    window.TableTweaker = TableTweaker;
})();

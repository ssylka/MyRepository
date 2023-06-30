using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using DevExpress.Spreadsheet;
using DevExpress.Docs;
using Npgsql;
using Npgsql.Internal;
using System.Xml.Serialization;
using DevExpress.Data;
using DevExpress.XtraGrid;
using DevExpress.DirectX.NativeInterop.Direct2D.CCW;

using DevExpress.Office;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.SqlServer.Server;
using DevExpress.Xpo.DB.Helpers;

namespace Nadya_ne_pomogaet_delat_exel_table
{
    public partial class Form1 : Form
    {

        private NpgsqlConnection sqlConnection = null;

        private NpgsqlDataAdapter sqlDataAdapter = null;

        private DataTable dataTable = null;

        private DataTable finalDataTable = null;


        string linkDate = "((current_date   - '2 month'::INTERVAL)::date)";

        string filepath = $@"C:\\Users\\Stanislav.Peresypkin\\Desktop\\exels\\test {new Random().Next(100)}.xlsx";
        //Thread asyncThread = new Thread(new ThreadStart(test));

        public Form1()
        {
            InitializeComponent();


            sqlConnection = new NpgsqlConnection(@"Server=formulabi.ru;Port=10051;DataBase=netcompany;User ID=csm_peresypkinsi;Password=8GfiqyWTnNyg");
            sqlConnection.Open();
            sqlDataAdapter = new NpgsqlDataAdapter("select * from managingcp.registry_funding_application_countrpatry_get" + linkDate, sqlConnection);
            dataTable = new DataTable();
            finalDataTable = new DataTable();
            finalDataTable = new DataTable();

        }

        public void CreateExcel()
        {
            filepath = $@"C:\\Users\\Stanislav.Peresypkin\\Desktop\\exels\\test {new Random().Next(10000)}.xlsx";
            Workbook workbook = new Workbook();


            //WorksheetCollection worksheets = workbook.Worksheets;


            workbook.Unit = DocumentUnit.Point;
            workbook.BeginUpdate();

            Worksheet worksheet = workbook.Worksheets[0];
            worksheet.Name = "т1";
            worksheet = WorkSheetPivot(worksheet);


            workbook.Worksheets.Add().Name = "т6";


            Worksheet worksheet2 = workbook.Worksheets[1];
            //worksheet2.Name = "т6";
            worksheet2 = WorkSheetPivot(worksheet2);



            workbook.Calculate();
            workbook.EndUpdate();
            workbook.SaveDocument(filepath, DocumentFormat.OpenXml);
            
        }



        //    ws.Cells["A20"].Value = "Итого";
        //    ws.Range["B20:S20"].Formula = "=SUM(B9:B18)";
        //    ws.Cells["L20"].Formula = "=AVERAGE(L9:L18)";
        //    ws.Cells["N20"].Formula = "=AVERAGE(N9:N18)";
        //    ws.Range["N9:N18"].Formula = "=IF(B9=0;0;M9/B9)";

        //    //Formatting rangeFormatting = tableRange.BeginUpdateFormatting();

        //    //ws.Range["C9:C20"].NumberFormat = "#0.00";
        //    //ws.Range["E9:E20"].NumberFormat = "#0.00";
        //    //ws.Range["G9:G20"].NumberFormat = "#0.00";
        //    //ws.Range["I9:I20"].NumberFormat = "#0.00";
        //    //ws.Range["K9:K20"].NumberFormat = "#0.00";
        //    //ws.Range["L9:L20"].NumberFormat = "#0.00";
        //    //ws.Range["N9:N20"].NumberFormat = "#0.00";

        //    //tableRange.ColumnWidth = 70;
        //    //ws.Range["A6:S6"].RowHeight = 150;

        //    ws.Range["A9:S20"].Borders.SetAllBorders(Color.Black, BorderLineStyle.Thin);
        //    ws.Range["A6:S8"].Borders.SetAllBorders(Color.Black, BorderLineStyle.Medium);
        //    ws.Range["A6:S8"].Font.Bold = true;
        //    ws.Cells["A20"].Font.Bold = true;
        //    ws.Range["B20:S20"].FillColor = Color.Aqua;
        private Worksheet WorkSheetPivot(Worksheet ws)
        {

            Наименование инвестиционного проекта: Реконструкция опоры № 38 ВЛ - 6 кВ Л2515 с совместным подвесом ВЛ-0,4кВ от ТП - 70 г.Азов
Идентификатор инвестиционного проекта: L_01000007400
Утвержденные плановые значения показателей приведены в соответствии с
реквизиты решения органа исполнительной власти, утвердившего инвестиционную программу
Субъекты Российской Федерации, на территории которых реализуется инвестиционный проект:  Ростовская обл.															
Таблица 1.Строительство ПС 35 - 750 кВ



            List<string> temp = new List<string>()
            {
                "Форма 20. Результаты расчетов объемов финансовых потребностей, необходимых для строительства объектов электроэнергетики, выполненных в соответствии с укрупненными нормативами цены типовых технологических решений капитального строительства объектов электроэнергетики",
                "",
                "Инвестиционная программа Акционерного общества",
                "полное наименование субъекта электроэнергетики",
                "Год раскрытия информации: 2023 год",
                "Утвержденные плановые значения показателей приведены в соответствии с Постановлением РСТ РО от 18.11.2022 № 63 / 1",
                "реквизиты решения органа исполнительной власти, утвердившего инвестиционную программу",
              };


            for (int q = 0; q < 8; q++)
            {

                ws.Rows[q+3][4].Value = temp[q];
            }

            for (int q = 4; q < 12; q++)
            {
                ws.MergeCells(ws.Range[$"A{q}:P{q}"]);
            }




            temp = new List<string>()
                { 
                "Приложение  № __",
                "к приказу Минэнерго России",
                "от «__» _____ 2016 г. №___"
                };


            for (int q = 1; q < temp.Count+1; q++)
            {
                ws.MergeCells(ws.Range[$"O{q}:P{q}"]);

                ws.Rows[q-1]["O"].Value = temp[q-1];
            }




            CellRange tableRange = ws.GetDataRange();

            ws["A4"].Font.Bold = true;
            ws["A4"].RowHeight = 30;
            tableRange.Alignment.WrapText = true;
            tableRange.Alignment.WrapText = true;
            tableRange.Alignment.Horizontal = SpreadsheetHorizontalAlignment.Center;
            tableRange.Alignment.Vertical = SpreadsheetVerticalAlignment.Center;

            ws["O1"].Alignment.Horizontal = SpreadsheetHorizontalAlignment.Left;
            ws["O2"].Alignment.Horizontal = SpreadsheetHorizontalAlignment.Left;
            ws["O3"].Alignment.Horizontal = SpreadsheetHorizontalAlignment.Left;

            return ws;
        }




        //async Task LoadAsyncExcel()
        //{
        //    await Task.Run(() => this.CreateExcel());
        //}
        //private async Task Form_Shownssss()
        //{
        //    //CreateExcel();
        //    await LoadAsyncExcel();
        //    //loadProgress();
        //}
        //void test()
        //{
        //    Form_Shownssss();
        //}

        private void button1_ClickAsync(object sender, EventArgs e)
        {
            CreateExcel();
        }
    }
}
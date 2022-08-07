using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Shapes; 
// не получилось через Shapes(((



namespace Simple_Paint
{
    public partial class Form1 : Form
    {

        private Boolean DesinEnCours;

        Graphics g;
        Pen pen = new Pen(Color.Black, 5); // обозначает цвет и ширину
        string flagFigure = "Кисть"; // обозначает фигуру, по дефолту - Эллипсис
        ColorDialog colorDialog = new ColorDialog();
        Point one, two;
        Bitmap bmp;

        public Form1()
        {
            InitializeComponent();
            this.DesinEnCours = false;
            pictureBoxMain.Image = new Bitmap(pictureBoxMain.Width, pictureBoxMain.Height);

            bmp = (Bitmap)pictureBoxMain.Image;

            g = Graphics.FromImage(bmp);
            pictureBoxMain.Image = bmp;

        }
        private void pictureBoxMain_MouseDown(object sender, MouseEventArgs e)
        {
            this.DesinEnCours = true;

            one = e.Location;
        }

        private void pictureBoxMain_MouseUp(object sender, MouseEventArgs e)
        {
            if (this.DesinEnCours)
            {
                switch (flagFigure)
                {
                    case "Линия":
                        g.DrawLine(pen, one, two);
                        break;
                    case "Прямоугольник":
                        this.DrawRectangle(one.X, one.Y, two.X, two.Y);
                        break;


                    case "Заливка":
                        //floodFill4(e.X, e.Y, pen.Color, (new Bitmap(pictureBoxMain.Image.Clone() as Bitmap)).GetPixel(e.X, e.Y));
                        FillByLine(new Point(e.X, e.Y), bmp.GetPixel(e.X, e.Y));
                        break;

                    case "Квадрат":
                        this.DrawSquare(one.X, one.Y, two.X, two.Y);
                        break;
                    case "Треугольник":
                        DrawTriangle(one.X, one.Y, two.X, two.Y);
                        break;
                    case "Эллипсис":
                        g.DrawEllipse(pen, two.X, two.Y, (float)Math.Sqrt( (two.X - one.X)* (two.X - one.X) + (two.Y - one.Y) * (two.Y - one.Y)), (float)Math.Sqrt((two.X - one.X) * (two.X - one.X) + (two.Y - one.Y) * (two.Y - one.Y)));
                        break;
                }

            }
            this.DesinEnCours = false;
            two = e.Location;
            pictureBoxMain.Image = bmp;

        }

        private void pictureBoxMain_DragLeave(object sender, EventArgs e)
        {
            this.DesinEnCours = false;
        }

        private void pictureBoxMain_MouseMove(object sender, MouseEventArgs e)
        {
            
            if (flagFigure == "Кисть" && this.DesinEnCours)
            {
                //g.DrawEllipse(pen, e.Location.X, e.Location.Y, 5, 5);
                g.FillEllipse(new SolidBrush(pen.Color), e.Location.X - pen.Width / 2, e.Location.Y - pen.Width / 2, pen.Width, pen.Width);
                pictureBoxMain.Image = bmp;

            }
            two = e.Location;
            labelX.Text = two.X.ToString();
            labelY.Text = two.Y.ToString();
        }

        private void trackBrush_ValueChanged(object sender, EventArgs e)
        {
            pen.Width = trackBrush.Value;
        }


        private void buttonColor_Click(object sender, EventArgs e)
        {
            if (colorDialog1.ShowDialog() == DialogResult.Cancel)
                return;
            pen.Color = colorDialog1.Color;
            buttonColor.BackColor = pen.Color;
        }

        private void BoxFigur_SelectionChangeCommitted(object sender, EventArgs e)
        {
            this.flagFigure = BoxFigur.SelectedItem.ToString();
        }



        public void DrawRectangle(int startX, int startY, int endX, int endY)
        {

            int width = endX - startX;
            //прямоугольник

            if (startX > endX && startY < endY)
            {
                g.DrawLine(pen, startX, startY, startX, endY);
                g.DrawLine(pen, startX, startY, startX + width, startY);
                g.DrawLine(pen, startX, endY, startX + width, endY);
                g.DrawLine(pen, startX + width, startY, startX + width, endY);
            }

            else if (startX < endX && startY > endY)
            {
                g.DrawLine(pen, startX, startY, endX, startY);
                g.DrawLine(pen, startX, startY, startX, endY);
                g.DrawLine(pen, endX, startY, endX, endY);
                g.DrawLine(pen, startX, endY, endX, endY);
            }
            else
            {
                g.DrawLine(pen, startX, startY, endX, startY);
                g.DrawLine(pen, startX, startY, startX, endY);
                g.DrawLine(pen, endX, startY, endX, endY);
                g.DrawLine(pen, startX, endY, endX, endY);
            }
        }

        //квадрат

        public void DrawSquare(int startX, int startY, int endX, int endY)
        {
            int width = (endX - startX);
            g.DrawLine(pen, startX, startY, startX + width + pen.Width, startY);
            g.DrawLine(pen, startX, startY, startX, startY + width + pen.Width);
            g.DrawLine(pen, startX + width + pen.Width, startY, startX + width + pen.Width, startY + width + pen.Width);
            g.DrawLine(pen, startX, startY + width + pen.Width, startX + width + pen.Width, startY + width + pen.Width);
            pictureBoxMain.Image = bmp;

        }

        private void buttonFill_Click(object sender, EventArgs e)
        {
            this.flagFigure = "Заливка";
        }



        public void DrawTriangle(int startX, int startY, int endX, int endY)
        {
            g.DrawLine(pen, startX, startY, endX, endY);
            g.DrawLine(pen, startX, startY, startX, endY);
            g.DrawLine(pen, startX, endY, endX, endY);
            pictureBoxMain.Image = bmp;
        }

        private void pictureBoxMain_MouseMove(object sender, EventArgs e)
        {
            if (flagFigure == "Кисть" && this.DesinEnCours)
            {
                g.FillEllipse(new SolidBrush(pen.Color), one.X - pen.Width / 2, one.Y - pen.Width / 2, pen.Width, pen.Width);
                pictureBoxMain.Image = bmp;

            }

        }

        //рекурсивный алгоритм заливки на основе серий пикселов (линий)
        private void FillByLine(Point p, Color oldColor)
        {
            if (0 <= p.X && p.X < bmp.Width && 0 <= p.Y && p.Y < bmp.Height - 1 && oldColor == bmp.GetPixel(p.X, p.Y) && oldColor != pen.Color)
            {
                Point leftBound = new Point(p.X, p.Y);
                Point rightBound = new Point(p.X, p.Y);
                Color currentColor = oldColor;
                while (0 < leftBound.X && currentColor == bmp.GetPixel(--leftBound.X, p.Y)) // X--
                {
                    currentColor = bmp.GetPixel(leftBound.X, p.Y);
                }
                currentColor = oldColor;
                while (rightBound.X < pictureBoxMain.Width - 1 && currentColor == bmp.GetPixel(++rightBound.X, p.Y)) // X++
                {
                    currentColor = bmp.GetPixel(rightBound.X, p.Y);
                }
                g.DrawLine(new Pen(pen.Color,1), leftBound, rightBound);
                for (int i = leftBound.X; i < rightBound.X + 1; ++i)
                    FillByLine(new Point(i, p.Y + 1), oldColor);
                for (int i = leftBound.X; i < rightBound.X + 1; ++i)
                    if (p.Y > 0)
                        FillByLine(new Point(i, p.Y - 1), oldColor);
            }
        }

        private void ToolStripMenuItemOpen_Click(object sender, EventArgs e)
        {
            OpenFileDialog open_dialog = new OpenFileDialog(); //создание диалогового окна для выбора файла
            open_dialog.Filter = "Image Files(*.BMP;*.JPG;**.PNG)|*.BMP;*.JPG;**.PNG|All files (*.*)|*.*"; //формат загружаемого файла
            DialogResult dr = open_dialog.ShowDialog();
            if (dr == DialogResult.OK)
            {
                bmp = new Bitmap(open_dialog.FileName);
                pictureBoxMain.Image = bmp;
                g = Graphics.FromImage(bmp);

            }

        }

        private void ToolStripMenuItemSave_Click(object sender, EventArgs e)
        {
            SaveFileDialog saveFileDialog1 = new SaveFileDialog();
            saveFileDialog1.RestoreDirectory = true;
            saveFileDialog1.Filter = "Image Files(*.JPG)|*.JPG|All files (*.*)|*.*";
            pictureBoxMain.Image = pictureBoxMain.Image;
            if (saveFileDialog1.ShowDialog() == DialogResult.OK)
            {
                pictureBoxMain.Image.Save(saveFileDialog1.FileName);
            }

        }


        // Первоначальный алгоритм. Имеет слишком большой стек, поэтому использую другой.
        void floodFill4(int x, int y, Color newColor, Color oldColor)
        {
            Color c = (new Bitmap(pictureBoxMain.Image)).GetPixel(x, y);
            if (x >= 0 && x < pictureBoxMain.Width && y >= 0 && y < pictureBoxMain.Height && c == oldColor && c != newColor)
            {
                g.DrawLine(pen, x, y, x, y);
                floodFill4(x + 1, y, newColor, oldColor);
                floodFill4(x - 1, y, newColor, oldColor);
                floodFill4(x, y + 1, newColor, oldColor);
                floodFill4(x, y - 1, newColor, oldColor);
            }

        }
    }
}

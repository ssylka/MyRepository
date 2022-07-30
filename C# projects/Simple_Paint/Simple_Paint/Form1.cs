using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
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


        public Form1()
        {
            InitializeComponent();
            this.DesinEnCours = false;
            g = pictureBoxMain.CreateGraphics();
        }



        private void pictureBoxMain_Paint(object sender, PaintEventArgs e)
        {

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
                        Fill(e.X, e.Y, pen.Color);
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
                //Des.DesEllipse(g);
                //System.Windows.Shapes.Ellipse ellipse = new Ellipse();

            }
            this.DesinEnCours = false;
            two = e.Location;

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
            }
            two = e.Location;
            labelX.Text = two.X.ToString();
            labelY.Text = two.Y.ToString();
        }

        private void trackBrush_ValueChanged(object sender, EventArgs e)
        {
            pen.Width = trackBrush.Value;
        }

        private void pictureBoxMain_Click(object sender, EventArgs e)
        {
        }

        private void buttonColor_Click(object sender, EventArgs e)
        {
            if (colorDialog.ShowDialog() == DialogResult.OK)
            {
                pen.Color = colorDialog.Color;
                buttonColor.BackColor = colorDialog.Color;
            }
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
                //g.DrawLine(pen, startX, startY, startX + width, startY);
                //g.DrawLine(pen, startX, startY, startX, startY + width);
                //g.DrawLine(pen, startX + width, startY, startX + width, startY + width);
                //g.DrawLine(pen, startX, startY + width, startX + width, startY + width);


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


        public void DrawSquare(int startX, int startY, int endX, int endY)
        {
            int width = (endX - startX);
            //квадрат

            g.DrawLine(pen, startX, startY, startX + width + pen.Width, startY);
            g.DrawLine(pen, startX, startY, startX, startY + width + pen.Width);
            g.DrawLine(pen, startX + width + pen.Width, startY, startX + width + pen.Width, startY + width + pen.Width);
            g.DrawLine(pen, startX, startY + width + pen.Width, startX + width + pen.Width, startY + width + pen.Width);

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
        }

        private void pictureBoxMain_MouseMove(object sender, EventArgs e)
        {
            if (flagFigure == "Кисть" && this.DesinEnCours)
            {
                //    //g.DrawEllipse(pen, e.Location.X, e.Location.Y, 5, 5);
                //    g.FillEllipse(new SolidBrush(pen.Color),  one.X - pen.Width / 2, one.Y - pen.Width / 2, 5, 5);
                g.FillEllipse(new SolidBrush(pen.Color), one.X - pen.Width / 2, one.Y - pen.Width / 2, pen.Width, pen.Width);

            }

        }

        public void Fill(int x, int y, Color fillColor)
        {
            Bitmap MyBitmap = new Bitmap(x,y); //// битмап - ширина и высота этой битовой карты, а не координата 
                                                 // к сожалению не работает
            Color temp = MyBitmap.GetPixel(x-1,y-1);

            int countLeft = x;
            int countRight = x;

            while (countLeft - 1 > 0 && MyBitmap.GetPixel(countLeft - 1, y) == temp)
            {
                countLeft--;
            }

            while (countRight + 1 < MyBitmap.Width && MyBitmap.GetPixel(countRight + 1, y) == temp)
            {
                countRight++;
            }

            for (int i = countLeft; i <= countRight; i++)
            {
                MyBitmap.SetPixel(i, y, fillColor);
            }

            for (int i = countLeft; i <= countRight; i++)
            {
                if (MyBitmap.GetPixel(i, y - 1) == temp && y - 1 > 0)
                {
                    Fill(i, y - 1, fillColor);
                }

                if (MyBitmap.GetPixel(i, y + 1) == temp && y + 1 < MyBitmap.Height - 1)
                {
                    Fill(i, y + 1, fillColor);
                }
            }
        }





    }
}

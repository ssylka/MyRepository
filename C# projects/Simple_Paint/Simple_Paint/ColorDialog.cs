using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Simple_Paint
{
    public partial class ColorDialog : Form
    {
        public ColorDialog()
        {
            InitializeComponent();
        }
        public Color Color = Color.Black;
        public Color fillColor = Color.Black;

        private void btnRed_MouseDown(object sender, MouseEventArgs e)
        {
            { Color = Color.Red; }
        }

        private void btnDarkCyan_MouseDown(object sender, MouseEventArgs e)
        {
            { Color = Color.DarkCyan; }
        }

        private void btnPurple_MouseDown(object sender, MouseEventArgs e)
        {
            { Color = Color.Purple; }
        }

        private void btnRoyalBlue_MouseDown(object sender, MouseEventArgs e)
        {
            { Color = Color.RoyalBlue; }
        }

        private void btnBlack_MouseDown(object sender, MouseEventArgs e)
        {
            { Color = Color.Black; }
        }

        private void btnGold_MouseClick(object sender, MouseEventArgs e)
        {
            Color = Color.Gold;
        }

        private void btnGreen_MouseClick(object sender, MouseEventArgs e)
        {
            Color = Color.Green;
        }

        private void btnPink_MouseClick(object sender, MouseEventArgs e)
        {
            Color = Color.Pink;
        }
    }
}


namespace Simple_Paint
{
    partial class Form1
    {
        /// <summary>
        /// Обязательная переменная конструктора.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Освободить все используемые ресурсы.
        /// </summary>
        /// <param name="disposing">истинно, если управляемый ресурс должен быть удален; иначе ложно.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Код, автоматически созданный конструктором форм Windows

        /// <summary>
        /// Требуемый метод для поддержки конструктора — не изменяйте 
        /// содержимое этого метода с помощью редактора кода.
        /// </summary>
        private void InitializeComponent()
        {
            this.panel1 = new System.Windows.Forms.Panel();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.labelY = new System.Windows.Forms.Label();
            this.labelX = new System.Windows.Forms.Label();
            this.buttonFill = new System.Windows.Forms.Button();
            this.label3 = new System.Windows.Forms.Label();
            this.Фигура = new System.Windows.Forms.Label();
            this.BoxFigur = new System.Windows.Forms.ComboBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.buttonColor = new System.Windows.Forms.Button();
            this.trackBrush = new System.Windows.Forms.TrackBar();
            this.pictureBoxMain = new System.Windows.Forms.PictureBox();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.ToolStripMenuItemSaveAndOpen = new System.Windows.Forms.ToolStripMenuItem();
            this.ToolStripMenuItemOpen = new System.Windows.Forms.ToolStripMenuItem();
            this.ToolStripMenuItemSave = new System.Windows.Forms.ToolStripMenuItem();
            this.colorDialog1 = new System.Windows.Forms.ColorDialog();
            this.panel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.trackBrush)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxMain)).BeginInit();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.AllowDrop = true;
            this.panel1.AutoScroll = true;
            this.panel1.AutoSize = true;
            this.panel1.BackgroundImage = global::Simple_Paint.Properties.Resources._49327702_9610_402e_a243_ded9f28d573f;
            this.panel1.Controls.Add(this.label4);
            this.panel1.Controls.Add(this.label5);
            this.panel1.Controls.Add(this.labelY);
            this.panel1.Controls.Add(this.labelX);
            this.panel1.Controls.Add(this.buttonFill);
            this.panel1.Controls.Add(this.label3);
            this.panel1.Controls.Add(this.Фигура);
            this.panel1.Controls.Add(this.BoxFigur);
            this.panel1.Controls.Add(this.label2);
            this.panel1.Controls.Add(this.label1);
            this.panel1.Controls.Add(this.buttonColor);
            this.panel1.Controls.Add(this.trackBrush);
            this.panel1.Controls.Add(this.pictureBoxMain);
            this.panel1.Controls.Add(this.menuStrip1);
            this.panel1.Location = new System.Drawing.Point(-2, 2);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(653, 550);
            this.panel1.TabIndex = 0;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(608, 48);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(14, 13);
            this.label4.TabIndex = 15;
            this.label4.Text = "Y";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(608, 30);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(14, 13);
            this.label5.TabIndex = 14;
            this.label5.Text = "X";
            // 
            // labelY
            // 
            this.labelY.AutoSize = true;
            this.labelY.Location = new System.Drawing.Point(628, 48);
            this.labelY.Name = "labelY";
            this.labelY.Size = new System.Drawing.Size(14, 13);
            this.labelY.TabIndex = 11;
            this.labelY.Text = "Y";
            // 
            // labelX
            // 
            this.labelX.AutoSize = true;
            this.labelX.Location = new System.Drawing.Point(628, 30);
            this.labelX.Name = "labelX";
            this.labelX.Size = new System.Drawing.Size(14, 13);
            this.labelX.TabIndex = 10;
            this.labelX.Text = "X";
            // 
            // buttonFill
            // 
            this.buttonFill.BackgroundImage = global::Simple_Paint.Properties.Resources.kisspng_computer_icons_color_grayscale_paint_mixed_color_5af1e47d035205_1956720815258021090136;
            this.buttonFill.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Zoom;
            this.buttonFill.Location = new System.Drawing.Point(469, 24);
            this.buttonFill.Name = "buttonFill";
            this.buttonFill.Size = new System.Drawing.Size(44, 37);
            this.buttonFill.TabIndex = 9;
            this.buttonFill.UseVisualStyleBackColor = true;
            this.buttonFill.Click += new System.EventHandler(this.buttonFill_Click);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(519, 36);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(50, 13);
            this.label3.TabIndex = 8;
            this.label3.Text = "Заливка";
            // 
            // Фигура
            // 
            this.Фигура.AutoSize = true;
            this.Фигура.Location = new System.Drawing.Point(141, 30);
            this.Фигура.Name = "Фигура";
            this.Фигура.Size = new System.Drawing.Size(46, 13);
            this.Фигура.TabIndex = 7;
            this.Фигура.Text = "Фигура";
            // 
            // BoxFigur
            // 
            this.BoxFigur.FormattingEnabled = true;
            this.BoxFigur.Items.AddRange(new object[] {
            "Кисть",
            "Линия",
            "Эллипсис",
            "Прямоугольник",
            "Квадрат",
            "Треугольник"});
            this.BoxFigur.Location = new System.Drawing.Point(14, 27);
            this.BoxFigur.Name = "BoxFigur";
            this.BoxFigur.Size = new System.Drawing.Size(121, 21);
            this.BoxFigur.TabIndex = 6;
            this.BoxFigur.SelectionChangeCommitted += new System.EventHandler(this.BoxFigur_SelectionChangeCommitted);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(233, 31);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(32, 13);
            this.label2.TabIndex = 5;
            this.label2.Text = "Цвет";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(417, 35);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(46, 13);
            this.label1.TabIndex = 4;
            this.label1.Text = "Ширина";
            // 
            // buttonColor
            // 
            this.buttonColor.BackColor = System.Drawing.Color.Black;
            this.buttonColor.Location = new System.Drawing.Point(207, 27);
            this.buttonColor.Name = "buttonColor";
            this.buttonColor.Size = new System.Drawing.Size(20, 20);
            this.buttonColor.TabIndex = 3;
            this.buttonColor.Text = "Ц";
            this.buttonColor.UseVisualStyleBackColor = false;
            this.buttonColor.Click += new System.EventHandler(this.buttonColor_Click);
            // 
            // trackBrush
            // 
            this.trackBrush.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.trackBrush.Location = new System.Drawing.Point(287, 21);
            this.trackBrush.Maximum = 100;
            this.trackBrush.Minimum = 5;
            this.trackBrush.Name = "trackBrush";
            this.trackBrush.Size = new System.Drawing.Size(124, 45);
            this.trackBrush.TabIndex = 2;
            this.trackBrush.Value = 5;
            this.trackBrush.ValueChanged += new System.EventHandler(this.trackBrush_ValueChanged);
            // 
            // pictureBoxMain
            // 
            this.pictureBoxMain.Anchor = System.Windows.Forms.AnchorStyles.Bottom;
            this.pictureBoxMain.Cursor = System.Windows.Forms.Cursors.Hand;
            this.pictureBoxMain.Location = new System.Drawing.Point(1, 67);
            this.pictureBoxMain.MinimumSize = new System.Drawing.Size(653, 405);
            this.pictureBoxMain.Name = "pictureBoxMain";
            this.pictureBoxMain.Size = new System.Drawing.Size(653, 437);
            this.pictureBoxMain.SizeMode = System.Windows.Forms.PictureBoxSizeMode.CenterImage;
            this.pictureBoxMain.TabIndex = 0;
            this.pictureBoxMain.TabStop = false;
            this.pictureBoxMain.DragLeave += new System.EventHandler(this.pictureBoxMain_DragLeave);
            this.pictureBoxMain.MouseDown += new System.Windows.Forms.MouseEventHandler(this.pictureBoxMain_MouseDown);
            this.pictureBoxMain.MouseMove += new System.Windows.Forms.MouseEventHandler(this.pictureBoxMain_MouseMove);
            this.pictureBoxMain.MouseUp += new System.Windows.Forms.MouseEventHandler(this.pictureBoxMain_MouseUp);
            this.pictureBoxMain.Move += new System.EventHandler(this.pictureBoxMain_MouseMove);
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.ToolStripMenuItemSaveAndOpen});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(653, 24);
            this.menuStrip1.TabIndex = 13;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // ToolStripMenuItemSaveAndOpen
            // 
            this.ToolStripMenuItemSaveAndOpen.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.ToolStripMenuItemOpen,
            this.ToolStripMenuItemSave});
            this.ToolStripMenuItemSaveAndOpen.Name = "ToolStripMenuItemSaveAndOpen";
            this.ToolStripMenuItemSaveAndOpen.Size = new System.Drawing.Size(48, 20);
            this.ToolStripMenuItemSaveAndOpen.Text = "Файл";
            // 
            // ToolStripMenuItemOpen
            // 
            this.ToolStripMenuItemOpen.Name = "ToolStripMenuItemOpen";
            this.ToolStripMenuItemOpen.Size = new System.Drawing.Size(180, 22);
            this.ToolStripMenuItemOpen.Text = "Открыть";
            this.ToolStripMenuItemOpen.Click += new System.EventHandler(this.ToolStripMenuItemOpen_Click);
            // 
            // ToolStripMenuItemSave
            // 
            this.ToolStripMenuItemSave.Name = "ToolStripMenuItemSave";
            this.ToolStripMenuItemSave.Size = new System.Drawing.Size(180, 22);
            this.ToolStripMenuItemSave.Text = "Сохранить";
            this.ToolStripMenuItemSave.Click += new System.EventHandler(this.ToolStripMenuItemSave_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(652, 490);
            this.Controls.Add(this.panel1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "Form1";
            this.Text = "FrmMain";
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.trackBrush)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxMain)).EndInit();
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.PictureBox pictureBoxMain;
        private System.Windows.Forms.TrackBar trackBrush;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button buttonColor;
        private System.Windows.Forms.Label Фигура;
        private System.Windows.Forms.ComboBox BoxFigur;


        private System.Windows.Forms.ColorDialog myColorDialog;
        private System.Windows.Forms.Button buttonFill;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label labelY;
        private System.Windows.Forms.Label labelX;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem ToolStripMenuItemSaveAndOpen;
        private System.Windows.Forms.ToolStripMenuItem ToolStripMenuItemOpen;
        private System.Windows.Forms.ToolStripMenuItem ToolStripMenuItemSave;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.ColorDialog colorDialog1;
    }
}


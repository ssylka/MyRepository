
namespace download_application
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
            this.progressBar1 = new System.Windows.Forms.ProgressBar();
            this.textBoxForDownlaod = new System.Windows.Forms.TextBox();
            this.textBoxForSave = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.buttoDownload = new System.Windows.Forms.Button();
            this.buttonP = new System.Windows.Forms.Button();
            this.buttonReplay = new System.Windows.Forms.Button();
            this.buttonStop = new System.Windows.Forms.Button();
            this.richTextBox1 = new System.Windows.Forms.RichTextBox();
            this.textBoxOutput = new System.Windows.Forms.TextBox();
            this.textBoxFile = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.button1 = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.button3 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // progressBar1
            // 
            this.progressBar1.Location = new System.Drawing.Point(9, 72);
            this.progressBar1.Name = "progressBar1";
            this.progressBar1.Size = new System.Drawing.Size(194, 23);
            this.progressBar1.TabIndex = 0;
            this.progressBar1.ChangeUICues += new System.Windows.Forms.UICuesEventHandler(this.progressBar1_ChangeUICues);
            // 
            // textBoxForDownlaod
            // 
            this.textBoxForDownlaod.Location = new System.Drawing.Point(103, 12);
            this.textBoxForDownlaod.Name = "textBoxForDownlaod";
            this.textBoxForDownlaod.Size = new System.Drawing.Size(506, 20);
            this.textBoxForDownlaod.TabIndex = 1;
            this.textBoxForDownlaod.Text = "https://download.virtualbox.org/virtualbox/6.1.28/VirtualBox-6.1.28-147628-Win.ex" +
    "e";
            // 
            // textBoxForSave
            // 
            this.textBoxForSave.Location = new System.Drawing.Point(103, 43);
            this.textBoxForSave.Name = "textBoxForSave";
            this.textBoxForSave.Size = new System.Drawing.Size(506, 20);
            this.textBoxForSave.TabIndex = 2;
            this.textBoxForSave.Text = "C:\\Users\\user\\Desktop\\temp.exe";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 16);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(68, 13);
            this.label1.TabIndex = 3;
            this.label1.Text = "for download";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 46);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(45, 13);
            this.label2.TabIndex = 4;
            this.label2.Text = "for save";
            // 
            // buttoDownload
            // 
            this.buttoDownload.Location = new System.Drawing.Point(230, 72);
            this.buttoDownload.Name = "buttoDownload";
            this.buttoDownload.Size = new System.Drawing.Size(75, 23);
            this.buttoDownload.TabIndex = 5;
            this.buttoDownload.Text = "download";
            this.buttoDownload.UseVisualStyleBackColor = true;
            this.buttoDownload.Click += new System.EventHandler(this.button1_Click);
            // 
            // buttonP
            // 
            this.buttonP.Location = new System.Drawing.Point(327, 72);
            this.buttonP.Name = "buttonP";
            this.buttonP.Size = new System.Drawing.Size(75, 23);
            this.buttonP.TabIndex = 6;
            this.buttonP.Text = "Пауза";
            this.buttonP.UseVisualStyleBackColor = true;
            this.buttonP.Click += new System.EventHandler(this.button1_Click_1);
            // 
            // buttonReplay
            // 
            this.buttonReplay.Location = new System.Drawing.Point(421, 72);
            this.buttonReplay.Name = "buttonReplay";
            this.buttonReplay.Size = new System.Drawing.Size(87, 23);
            this.buttonReplay.TabIndex = 7;
            this.buttonReplay.Text = "Восстановить";
            this.buttonReplay.UseVisualStyleBackColor = true;
            this.buttonReplay.Click += new System.EventHandler(this.buttonReplay_Click);
            // 
            // buttonStop
            // 
            this.buttonStop.Location = new System.Drawing.Point(523, 72);
            this.buttonStop.Name = "buttonStop";
            this.buttonStop.Size = new System.Drawing.Size(75, 23);
            this.buttonStop.TabIndex = 8;
            this.buttonStop.Text = "Стоп";
            this.buttonStop.UseVisualStyleBackColor = true;
            this.buttonStop.Click += new System.EventHandler(this.buttonStop_Click);
            // 
            // richTextBox1
            // 
            this.richTextBox1.Cursor = System.Windows.Forms.Cursors.IBeam;
            this.richTextBox1.Dock = System.Windows.Forms.DockStyle.Right;
            this.richTextBox1.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.richTextBox1.Location = new System.Drawing.Point(614, 0);
            this.richTextBox1.Name = "richTextBox1";
            this.richTextBox1.Size = new System.Drawing.Size(175, 183);
            this.richTextBox1.TabIndex = 9;
            this.richTextBox1.Text = "";
            // 
            // textBoxOutput
            // 
            this.textBoxOutput.Location = new System.Drawing.Point(333, 146);
            this.textBoxOutput.Name = "textBoxOutput";
            this.textBoxOutput.Size = new System.Drawing.Size(257, 20);
            this.textBoxOutput.TabIndex = 11;
            this.textBoxOutput.Text = "C:\\Users\\user\\Desktop\\temp.exe";
            // 
            // textBoxFile
            // 
            this.textBoxFile.Location = new System.Drawing.Point(48, 111);
            this.textBoxFile.Name = "textBoxFile";
            this.textBoxFile.Size = new System.Drawing.Size(506, 20);
            this.textBoxFile.TabIndex = 10;
            this.textBoxFile.Text = "C:\\Users\\user\\Desktop\\temp.exe";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(291, 148);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(33, 13);
            this.label3.TabIndex = 13;
            this.label3.Text = "куда:";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(12, 114);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(23, 13);
            this.label4.TabIndex = 12;
            this.label4.Text = "File";
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(195, 143);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(87, 23);
            this.button1.TabIndex = 16;
            this.button1.Text = "переместить";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click_2);
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(90, 143);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(99, 23);
            this.button2.TabIndex = 15;
            this.button2.Text = "переименовать";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // button3
            // 
            this.button3.Location = new System.Drawing.Point(9, 143);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(75, 23);
            this.button3.TabIndex = 14;
            this.button3.Text = "удолить";
            this.button3.UseVisualStyleBackColor = true;
            this.button3.Click += new System.EventHandler(this.button3_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(789, 183);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.button3);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.textBoxOutput);
            this.Controls.Add(this.textBoxFile);
            this.Controls.Add(this.richTextBox1);
            this.Controls.Add(this.buttonStop);
            this.Controls.Add(this.buttonReplay);
            this.Controls.Add(this.buttonP);
            this.Controls.Add(this.buttoDownload);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.textBoxForSave);
            this.Controls.Add(this.textBoxForDownlaod);
            this.Controls.Add(this.progressBar1);
            this.Name = "Form1";
            this.Text = "Пауза";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ProgressBar progressBar1;
        private System.Windows.Forms.TextBox textBoxForDownlaod;
        private System.Windows.Forms.TextBox textBoxForSave;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button buttoDownload;
        private System.Windows.Forms.Button buttonP;
        private System.Windows.Forms.Button buttonReplay;
        private System.Windows.Forms.Button buttonStop;
        private System.Windows.Forms.RichTextBox richTextBox1;
        private System.Windows.Forms.TextBox textBoxOutput;
        private System.Windows.Forms.TextBox textBoxFile;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Button button3;
    }
}


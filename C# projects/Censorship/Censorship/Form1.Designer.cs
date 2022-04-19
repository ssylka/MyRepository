
namespace Censorship
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
            this.buttonPauth = new System.Windows.Forms.Button();
            this.buttonReturn = new System.Windows.Forms.Button();
            this.buttonStop = new System.Windows.Forms.Button();
            this.textBoxIstochnic = new System.Windows.Forms.TextBox();
            this.textBoxDictionary = new System.Windows.Forms.TextBox();
            this.textBoxPathOutput = new System.Windows.Forms.TextBox();
            this.textBoxStatic = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.buttonStart = new System.Windows.Forms.Button();
            this.progressBar1 = new System.Windows.Forms.ProgressBar();
            this.SuspendLayout();
            // 
            // buttonPauth
            // 
            this.buttonPauth.Location = new System.Drawing.Point(58, 128);
            this.buttonPauth.Name = "buttonPauth";
            this.buttonPauth.Size = new System.Drawing.Size(75, 23);
            this.buttonPauth.TabIndex = 0;
            this.buttonPauth.Text = "пауза";
            this.buttonPauth.UseVisualStyleBackColor = true;
            this.buttonPauth.Click += new System.EventHandler(this.buttonPauth_Click);
            // 
            // buttonReturn
            // 
            this.buttonReturn.Location = new System.Drawing.Point(162, 128);
            this.buttonReturn.Name = "buttonReturn";
            this.buttonReturn.Size = new System.Drawing.Size(75, 23);
            this.buttonReturn.TabIndex = 1;
            this.buttonReturn.Text = "продолжить";
            this.buttonReturn.UseVisualStyleBackColor = true;
            this.buttonReturn.Click += new System.EventHandler(this.buttonReturn_Click);
            // 
            // buttonStop
            // 
            this.buttonStop.Location = new System.Drawing.Point(264, 128);
            this.buttonStop.Name = "buttonStop";
            this.buttonStop.Size = new System.Drawing.Size(75, 23);
            this.buttonStop.TabIndex = 2;
            this.buttonStop.Text = "стоп";
            this.buttonStop.UseVisualStyleBackColor = true;
            this.buttonStop.Click += new System.EventHandler(this.buttonStop_Click);
            // 
            // textBoxIstochnic
            // 
            this.textBoxIstochnic.Location = new System.Drawing.Point(138, 12);
            this.textBoxIstochnic.Name = "textBoxIstochnic";
            this.textBoxIstochnic.Size = new System.Drawing.Size(258, 20);
            this.textBoxIstochnic.TabIndex = 3;
            this.textBoxIstochnic.Text = "C:\\Users\\user\\Desktop\\papka";
            // 
            // textBoxDictionary
            // 
            this.textBoxDictionary.Location = new System.Drawing.Point(138, 38);
            this.textBoxDictionary.Name = "textBoxDictionary";
            this.textBoxDictionary.Size = new System.Drawing.Size(258, 20);
            this.textBoxDictionary.TabIndex = 4;
            this.textBoxDictionary.Text = "C:\\Users\\user\\Desktop\\sensor\\mat\\mats.txt";
            // 
            // textBoxPathOutput
            // 
            this.textBoxPathOutput.Location = new System.Drawing.Point(138, 64);
            this.textBoxPathOutput.Name = "textBoxPathOutput";
            this.textBoxPathOutput.Size = new System.Drawing.Size(258, 20);
            this.textBoxPathOutput.TabIndex = 5;
            this.textBoxPathOutput.Text = "C:\\Users\\user\\Desktop\\sensor\\new";
            // 
            // textBoxStatic
            // 
            this.textBoxStatic.Location = new System.Drawing.Point(138, 90);
            this.textBoxStatic.Name = "textBoxStatic";
            this.textBoxStatic.Size = new System.Drawing.Size(258, 20);
            this.textBoxStatic.TabIndex = 6;
            this.textBoxStatic.Text = "C:\\Users\\user\\Desktop\\sensor\\new\\static";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(13, 18);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(80, 13);
            this.label1.TabIndex = 7;
            this.label1.Text = "Где цензурить";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(13, 44);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(55, 13);
            this.label2.TabIndex = 8;
            this.label2.Text = "Где маты";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(13, 89);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(90, 13);
            this.label3.TabIndex = 10;
            this.label3.Text = "Куда статистику";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(13, 67);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(119, 13);
            this.label4.TabIndex = 9;
            this.label4.Text = "Куда перезаписывать";
            // 
            // buttonStart
            // 
            this.buttonStart.Location = new System.Drawing.Point(57, 172);
            this.buttonStart.Name = "buttonStart";
            this.buttonStart.Size = new System.Drawing.Size(75, 23);
            this.buttonStart.TabIndex = 11;
            this.buttonStart.Text = "Старт";
            this.buttonStart.UseVisualStyleBackColor = true;
            this.buttonStart.Click += new System.EventHandler(this.button1_Click);
            // 
            // progressBar1
            // 
            this.progressBar1.Location = new System.Drawing.Point(147, 172);
            this.progressBar1.Name = "progressBar1";
            this.progressBar1.Size = new System.Drawing.Size(222, 23);
            this.progressBar1.TabIndex = 12;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(451, 217);
            this.Controls.Add(this.progressBar1);
            this.Controls.Add(this.buttonStart);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.textBoxStatic);
            this.Controls.Add(this.textBoxPathOutput);
            this.Controls.Add(this.textBoxDictionary);
            this.Controls.Add(this.textBoxIstochnic);
            this.Controls.Add(this.buttonStop);
            this.Controls.Add(this.buttonReturn);
            this.Controls.Add(this.buttonPauth);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button buttonPauth;
        private System.Windows.Forms.Button buttonReturn;
        private System.Windows.Forms.Button buttonStop;
        private System.Windows.Forms.TextBox textBoxIstochnic;
        private System.Windows.Forms.TextBox textBoxDictionary;
        private System.Windows.Forms.TextBox textBoxPathOutput;
        private System.Windows.Forms.TextBox textBoxStatic;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Button buttonStart;
        private System.Windows.Forms.ProgressBar progressBar1;
    }
}


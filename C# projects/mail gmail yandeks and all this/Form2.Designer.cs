
namespace mail_gmail_yandeks_and_all_this
{
    partial class Form2
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.comboBoxForTimeMessage = new System.Windows.Forms.ComboBox();
            this.ButtonDeliveryMessage = new System.Windows.Forms.Button();
            this.richTextBox = new System.Windows.Forms.RichTextBox();
            this.ButtonShowMessage = new System.Windows.Forms.Button();
            this.domainUpDownForLimit = new System.Windows.Forms.DomainUpDown();
            this.label1 = new System.Windows.Forms.Label();
            this.buttonExit = new System.Windows.Forms.Button();
            this.timer = new System.Windows.Forms.Timer(this.components);
            this.SuspendLayout();
            // 
            // comboBoxForTimeMessage
            // 
            this.comboBoxForTimeMessage.FormattingEnabled = true;
            this.comboBoxForTimeMessage.Items.AddRange(new object[] {
            "Email за сегодня",
            "эту неделю",
            "этот месяц",
            "весь лимит"});
            this.comboBoxForTimeMessage.Location = new System.Drawing.Point(12, 67);
            this.comboBoxForTimeMessage.Name = "comboBoxForTimeMessage";
            this.comboBoxForTimeMessage.Size = new System.Drawing.Size(153, 21);
            this.comboBoxForTimeMessage.TabIndex = 0;
            this.comboBoxForTimeMessage.ChangeUICues += new System.Windows.Forms.UICuesEventHandler(this.comboBox1_ChangeUICues);
            // 
            // ButtonDeliveryMessage
            // 
            this.ButtonDeliveryMessage.Location = new System.Drawing.Point(12, 141);
            this.ButtonDeliveryMessage.Name = "ButtonDeliveryMessage";
            this.ButtonDeliveryMessage.Size = new System.Drawing.Size(153, 69);
            this.ButtonDeliveryMessage.TabIndex = 1;
            this.ButtonDeliveryMessage.Text = "Отправить сообщение";
            this.ButtonDeliveryMessage.UseVisualStyleBackColor = true;
            this.ButtonDeliveryMessage.Click += new System.EventHandler(this.ButtonDeliveryMessage_Click);
            // 
            // richTextBox
            // 
            this.richTextBox.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.richTextBox.Location = new System.Drawing.Point(171, 12);
            this.richTextBox.Name = "richTextBox";
            this.richTextBox.Size = new System.Drawing.Size(520, 307);
            this.richTextBox.TabIndex = 2;
            this.richTextBox.Text = "";
            // 
            // ButtonShowMessage
            // 
            this.ButtonShowMessage.Location = new System.Drawing.Point(12, 12);
            this.ButtonShowMessage.Name = "ButtonShowMessage";
            this.ButtonShowMessage.Size = new System.Drawing.Size(153, 23);
            this.ButtonShowMessage.TabIndex = 3;
            this.ButtonShowMessage.Text = "Показать";
            this.ButtonShowMessage.UseVisualStyleBackColor = true;
            this.ButtonShowMessage.Click += new System.EventHandler(this.ButtonShowMessage_Click);
            // 
            // domainUpDownForLimit
            // 
            this.domainUpDownForLimit.Location = new System.Drawing.Point(125, 41);
            this.domainUpDownForLimit.Name = "domainUpDownForLimit";
            this.domainUpDownForLimit.Size = new System.Drawing.Size(40, 20);
            this.domainUpDownForLimit.TabIndex = 4;
            this.domainUpDownForLimit.Text = "100";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(2, 43);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(117, 13);
            this.label1.TabIndex = 5;
            this.label1.Text = "до какого сообщения";
            // 
            // buttonExit
            // 
            this.buttonExit.Location = new System.Drawing.Point(12, 296);
            this.buttonExit.Name = "buttonExit";
            this.buttonExit.Size = new System.Drawing.Size(153, 23);
            this.buttonExit.TabIndex = 6;
            this.buttonExit.Text = "Выйти";
            this.buttonExit.UseVisualStyleBackColor = true;
            this.buttonExit.Click += new System.EventHandler(this.button1_Click);
            // 
            // timer
            // 
            this.timer.Interval = 60000;
            this.timer.Tick += new System.EventHandler(this.timer_Tick);
            // 
            // Form2
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(703, 331);
            this.Controls.Add(this.buttonExit);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.domainUpDownForLimit);
            this.Controls.Add(this.ButtonShowMessage);
            this.Controls.Add(this.richTextBox);
            this.Controls.Add(this.ButtonDeliveryMessage);
            this.Controls.Add(this.comboBoxForTimeMessage);
            this.Name = "Form2";
            this.Text = "Form2";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ComboBox comboBoxForTimeMessage;
        private System.Windows.Forms.Button ButtonDeliveryMessage;
        private System.Windows.Forms.RichTextBox richTextBox;
        private System.Windows.Forms.Button ButtonShowMessage;
        private System.Windows.Forms.DomainUpDown domainUpDownForLimit;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button buttonExit;
        private System.Windows.Forms.Timer timer;
    }
}
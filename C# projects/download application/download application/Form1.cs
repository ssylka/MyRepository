using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.VisualBasic;



namespace download_application
{
    public partial class Form1 : Form
    { 
        List<Thread> threads = new List<Thread>();
        ManualResetEvent me = new ManualResetEvent(true);
        public Form1()
        {
            InitializeComponent();

        }
        void client_DownloadFileCompleted(object sender, AsyncCompletedEventArgs e)
        {
            //то что будет после скачивания файла
        }
        void client_DownloadProgressChanged(object sender, DownloadProgressChangedEventArgs e)
        {
            progressBar1.Maximum = (int)e.TotalBytesToReceive / 100;
            progressBar1.Value = (int)e.BytesReceived / 100;
        }

        private void progressBar1_ChangeUICues(object sender, UICuesEventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            threads.Add(new Thread(Downlaod));
            threads.LastOrDefault().Start(me);
            richTextBox1.Text += "\n" + textBoxForSave.Text;
            
        }   

        void Downlaod(object me)
        {
            if (File.Exists(textBoxForSave.Text) != true) // если файла нет то просто скачиваем
            {
                WebClient client = new WebClient();
                //в потоке не получается отображать прогресс бар
                //client.DownloadProgressChanged += new DownloadProgressChangedEventHandler(client_DownloadProgressChanged);
                //client.DownloadFileCompleted += new AsyncCompletedEventHandler(client_DownloadFileCompleted);
                client.DownloadFileAsync(new Uri(textBoxForDownlaod.Text), textBoxForSave.Text);
            }
            else// если файл есть, удаляем и скачиваем новый
            {
                File.Delete(textBoxForSave.Text);
                WebClient client = new WebClient();
                //client.DownloadProgressChanged += new DownloadProgressChangedEventHandler(client_DownloadProgressChanged);
                //client.DownloadFileCompleted += new AsyncCompletedEventHandler(client_DownloadFileCompleted);
                client.DownloadFileAsync(new Uri(textBoxForDownlaod.Text), textBoxForSave.Text);

            }

        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            foreach (var i in threads)
            {
                me.WaitOne();
                if (i.IsAlive)
                    i.Suspend();
            }
        }

        private void buttonReplay_Click(object sender, EventArgs e)
        {
            
            foreach (var i in threads)
            {
                if(i.IsAlive)
                   i.Resume();
                me.Reset();
                
            }
        }

        private void buttonStop_Click(object sender, EventArgs e)
        {
            foreach (var i in threads)
            {
                me.Close();
                i.Abort("остановленно по желанию пользователя");
                i.Interrupt();
                //
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            File.Delete(textBoxFile.Text);
        }

        private void button2_Click(object sender, EventArgs e)
        {
            FileSystem.Rename(textBoxFile.Text, textBoxOutput.Text);
        }

        private void button1_Click_2(object sender, EventArgs e)
        {
            File.Move(textBoxFile.Text, textBoxOutput.Text);
        }
    }

}


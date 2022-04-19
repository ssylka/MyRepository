using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net;
using System.IO;
using System.Net.Mail;
using MailKit.Net.Imap;
using MailKit.Search;
using MailKit;
using MimeKit;
using System.Threading;
using MailKit.Security;
using MailKit.Net.Pop3;
using MailKit.Net.Smtp;
using MailKit.Search;

namespace mail_gmail_yandeks_and_all_this
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            textBoxPassword.UseSystemPasswordChar = true;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (!textBoxLogin.Text.Contains("@") || textBoxLogin.Text.Length < 5 || textBoxPassword.Text.Length < 5)
            {
                MessageBox.Show("Введите корректные данные");
                return;
            }
            Form2 form2 = new Form2(textBoxLogin.Text.ToLower(), textBoxPassword.Text);
            form2.Show();
        }

        private static async Task SendEmailAsync()
        {

            // отправитель - устанавливаем адрес и отображаемое в письме имя
            MailAddress from = new MailAddress("stas.peresypkin@mail.ru", "Tom");
            // кому отправляем
            MailAddress to = new MailAddress("2000CTAC@gmail.com");
            // создаем объект сообщения
            MailMessage m = new MailMessage(from, to);
            // тема письма
            m.Subject = "Тест";
            // текст письма
            m.Body = "<h2>Письмо-тест работы smtp-клиента</h2>";
            // письмо представляет код html
            m.IsBodyHtml = true;
            m.BodyTransferEncoding = System.Net.Mime.TransferEncoding.QuotedPrintable;
            // адрес smtp-сервера и порт, с которого будем отправлять письмо
            System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient("smtp.mail.ru", 587); // smtp.gmail.com
            // логин и пароль
            smtp.DeliveryFormat = SmtpDeliveryFormat.International;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network; // net ...
            smtp.Credentials = new NetworkCredential("stas.peresypkin@mail.ru", "a6W8fveQaqxywXzSz90z");
            smtp.EnableSsl = true;

            await smtp.SendMailAsync(m);
            Console.WriteLine("Письмо отправлено");
        }
        private void checkBox_CheckedChanged(object sender, EventArgs e)
        {
            if (checkBox.Checked)
            {
                textBoxPassword.UseSystemPasswordChar = false;
            }
            else
            {
                textBoxPassword.UseSystemPasswordChar = true;
            }
        }





        #region oldCode
        //static void Retrieving()
        //{
        //    using (var client = new ImapClient())
        //    {
        //        client.Connect("imap.friends.com", 993, true);

        //        client.Authenticate("2000CTAC@gmail.com", "password");

        //        // The Inbox folder is always available on all IMAP servers...
        //        var inbox = client.Inbox;
        //        inbox.Open(FolderAccess.ReadOnly);

        //        Console.WriteLine("Total messages: {0}", inbox.Count);
        //        Console.WriteLine("Recent messages: {0}", inbox.Recent);

        //        for (int i = 0; i < inbox.Count; i++)
        //        {
        //            var message = inbox.GetMessage(i);
        //            MessageBox.Show("Subject: {0}", message.Subject);
        //        }

        //        client.Disconnect(true);
        //    }
        //}


        //private void buttonRead_Click(object sender, EventArgs e)
        //{
        //    using (var client = new ImapClient())
        //    {

        //        client.Connect("imap.yamdex.ru", 993, SecureSocketOptions.StartTls);

        //        client.Authenticate("ctac.peresypkin@yandex.ru", "SOAD_369");

        //        var inbox = client.Inbox;
        //        inbox.Open(FolderAccess.ReadOnly);

        //        // Поиск нужного письма
        //        var query = SearchQuery.SubjectContains("Привет из вашей киновселенной");

        //        var uids = inbox.Search(query);

        //        var items = inbox.Fetch(uids, MessageSummaryItems.UniqueId | MessageSummaryItems.BodyStructure);

        //        foreach (var item in items)
        //        {
        //            MessageBox.Show(item.TextBody.ContentDescription);
        //        }

        //        client.Disconnect(true);
        //    }
        //}

        //private void button2_Click(object sender, EventArgs e)
        //{
        //    Retrieving();
        //}

        //private object getMail()
        //{
        //    var list = new List<MailListItem>();
        //    try
        //    {
        //        using (var client = new ImapClient())
        //        {
        //            client.Connect("imap.yamdex.ru", 993, true);
        //            client.Authenticate(Properties.Settings.Default.YandexUser, Properties.Settings.Default.YandexPass);

        //            client.Inbox.Open(MailKit.FolderAccess.ReadOnly);

        //            var uids = client.Inbox.Search(SearchQuery.SentSince(System.DateTime.Now.AddDays(-7)));

        //            var message = client.Inbox.Fetch(uids, MessageSummaryItems.Envelope | MessageSummaryItems.BodyStructure);

        //            if (message != null && message.Count > 0)
        //            {
        //                foreach (var msg in message)
        //                {
        //                    list.Add(new MailListItem
        //                    {

        //                    });
        //                }
        //            }
        //        }

        //    }

        //    catch (Exception ex)
        //    { }
        //    return new object();
        //}
        #endregion

    }
}

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
// яндекса порт 25 для mstp

namespace mail_gmail_yandeks_and_all_this
{
    public partial class DeliveryMail : Form
    {
        static string strSubjext = "";
        static string strBody = "";
        static string strMail = "";
        static string strLogin = "";
        static string strPassword = "";

        static string smtpMailRu = "smtp.mail.ru";
        static int portMailRu = 465;
        //	IMAP — 993 (протокол шифрования SSL/TLS)
        //POP3 — 995 (протокол шифрования SSL/TLS)
        //SMTP — 465 (протокол шифрования SSL/TLS)

        //Сервер входящей почты(IMAP- и POP3-сервера)    IMAP-сервер — imap.mail.ru
        //POP3-сервер — pop.mail.ru
        //Сервер исходящей почты(SMTP-сервер)    smtp.mail.ru


        static string smtpGmail = "smtp.gmail.com";
        static int portGmail = 465;
        //поставьте галочки напротив пунктов «Подключаться через безопасное соединение(SSL)»;
        //в поле «Исходящая почта(SMTP)» укажите 465 порт;
        //в поле «Входящая почта(IMAP)» - 993 порт.

        static string smtpYandex = "smtp.yandex.ru";
        static int portYandex = 465; // 993 с защитой SSL, 143 - без
                                     // smtp.yandex.ru, и подключаться по безопасному соединению SSL через порт 465.
                                     //В случае, если вы не можете воспользоваться безопасным соединением, вы можете подключиться к SMTP-серверу по портам 25 или 587

        //в разделе Входящие сообщения/Incoming mail (POP3) нужно указать адрес почтового сервера pop.yandex.ru, установить SSL-защиту и порт 995. Если ваша программа по каким-то причинам не поддерживает SSL-защиту соединения, вы можете указать порт 110 и подключаться без SSL
        //в разделе Исходящие сообщения/Outgoing mail(SMTP) необходимо указать адрес сервера smtp.yandex.ru, и подключаться по безопасному соединению SSL через порт 465. В случае, если вы не можете воспользоваться безопасным соединением, вы можете подключиться к SMTP-серверу по портам 25 или 587



        static string smtpList = "smtp.list.ru";
        static int portList = 25;


        public DeliveryMail(string strLog, string strPass)
        {
            strLogin  = strLog;
            strPassword = strPass;
            InitializeComponent();
        }

        private void buttonSend_Click(object sender, EventArgs e)
        {
            strSubjext = textBoxSubject.Text;

            strMail = textBoxMailDelivery.Text;

            strBody = textBoxBody.Text;

            SendEmailAsync().GetAwaiter();
            this.Close();
        }
        private static async Task SendEmailAsync()
        {

            if (strLogin.Contains("@gmail.com"))
            {
                // отправитель - устанавливаем адрес и отображаемое в письме имя
                MailAddress from = new MailAddress(strLogin, strPassword);
                // кому отправляем
                MailAddress to = new MailAddress(strMail);
                // создаем объект сообщения
                MailMessage m = new MailMessage(from, to);
                // тема письма
                m.Subject = strSubjext;
                // текст письма
                m.Body = "<h2>" + strBody + "</h2>";
                // письмо представляет код html
                m.IsBodyHtml = true;
                m.BodyTransferEncoding = System.Net.Mime.TransferEncoding.QuotedPrintable;
                // адрес smtp-сервера и порт, с которого будем отправлять письмо
                System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient(smtpGmail, portGmail); // smtp.gmail.com
                                                                                                       // SmtpClient smtp = new SmtpClient("smtp.list.ru", 25);
                                                                                                       //Порт SMTP - 25, 587 или 2525

                // логин и пароль
                smtp.DeliveryFormat = SmtpDeliveryFormat.International;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network; 
                smtp.Credentials = new NetworkCredential(strLogin, strPassword);
                smtp.EnableSsl = true;

                await smtp.SendMailAsync(m);

            }
            else if (strLogin.Contains("@mail.ru"))
            {
                // отправитель - устанавливаем адрес и отображаемое в письме имя
                MailAddress from = new MailAddress(strLogin, strPassword);
                // кому отправляем
                MailAddress to = new MailAddress(strMail);
                // создаем объект сообщения
                MailMessage m = new MailMessage(from, to);
                // тема письма
                m.Subject = strSubjext;
                // текст письма
                m.Body = "<h2>" + strBody + "</h2>";
                // письмо представляет код html
                m.IsBodyHtml = true;
                m.BodyTransferEncoding = System.Net.Mime.TransferEncoding.QuotedPrintable;
                // адрес smtp-сервера и порт, с которого будем отправлять письмо
                System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient(smtpMailRu, portMailRu); // smtp.gmail.com
                                                                                                        // SmtpClient smtp = new SmtpClient("smtp.list.ru", 25);
                                                                                                        //Порт SMTP - 25, 587 или 2525

                // логин и пароль
                smtp.DeliveryFormat = SmtpDeliveryFormat.International;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network; // net ...
                smtp.Credentials = new NetworkCredential(strLogin, strPassword);
                smtp.EnableSsl = true;

                await smtp.SendMailAsync(m);

            }
            else if (strLogin.Contains("@yandex.ru"))
            {
                // отправитель - устанавливаем адрес и отображаемое в письме имя
                MailAddress from = new MailAddress(strLogin, strPassword);
                // кому отправляем
                MailAddress to = new MailAddress(strMail);
                // создаем объект сообщения
                MailMessage m = new MailMessage(from, to);
                // тема письма
                m.Subject = strSubjext;
                // текст письма
                m.Body = "<h2>" + strBody + "</h2>";
                // письмо представляет код html
                m.IsBodyHtml = true;
                m.BodyTransferEncoding = System.Net.Mime.TransferEncoding.QuotedPrintable;
                // адрес smtp-сервера и порт, с которого будем отправлять письмо
                System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient(smtpYandex, portYandex); // smtp.gmail.com
                                                                                                        // SmtpClient smtp = new SmtpClient("smtp.list.ru", 25);
                                                                                                        //Порт SMTP - 25, 587 или 2525

                // логин и пароль
                smtp.DeliveryFormat = SmtpDeliveryFormat.International;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network; // net ...
                smtp.Credentials = new NetworkCredential(strLogin, strPassword);
                smtp.EnableSsl = true;

                await smtp.SendMailAsync(m);

            }
            else if (strLogin.Contains("@list.ru"))
            {
                // отправитель - устанавливаем адрес и отображаемое в письме имя
                MailAddress from = new MailAddress(strLogin, strPassword);
                // кому отправляем
                MailAddress to = new MailAddress(strMail);
                // создаем объект сообщения
                MailMessage m = new MailMessage(from, to);
                // тема письма
                m.Subject = strSubjext;
                // текст письма
                m.Body = "<h2>" + strBody + "</h2>";
                // письмо представляет код html
                m.IsBodyHtml = true;
                m.BodyTransferEncoding = System.Net.Mime.TransferEncoding.QuotedPrintable;
                // адрес smtp-сервера и порт, с которого будем отправлять письмо
                System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient(smtpList, portList); // smtp.gmail.com
                                                                                                        // SmtpClient smtp = new SmtpClient("smtp.list.ru", 25);
                                                                                                        //Порт SMTP - 25, 587 или 2525

                // логин и пароль
                smtp.DeliveryFormat = SmtpDeliveryFormat.International;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network; // net ...
                smtp.Credentials = new NetworkCredential(strLogin, strPassword);
                smtp.EnableSsl = true;

                await smtp.SendMailAsync(m);

            }

            else { MessageBox.Show("Мы ещё не знаем такого почтового ящика"); }



        }

        private void textBoxBody_TextChanged(object sender, EventArgs e)
        {
            strBody = textBoxBody.Text;
        }

        private void textBoxSubject_TextChanged(object sender, EventArgs e)
        {
            strSubjext = textBoxSubject.Text;
        }

        private void textBoxMailDelivery_TextChanged(object sender, EventArgs e)
        {
            strMail = textBoxMailDelivery.Text.ToLower();
        }
    }
}

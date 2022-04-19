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
	public partial class Form2 : Form
	{
		static string login;
		static string password;
		static string imapMailRu = "imap.mail.ru";
		static int portMailRu = 993;
		//	IMAP — 993 (протокол шифрования SSL/TLS)
		//POP3 — 995 (протокол шифрования SSL/TLS)
		//SMTP — 465 (протокол шифрования SSL/TLS)

		//Сервер входящей почты(IMAP- и POP3-сервера)    IMAP-сервер — imap.mail.ru
//POP3-сервер — pop.mail.ru
//Сервер исходящей почты(SMTP-сервер)    smtp.mail.ru


		static string imapGmail = "imap.gmail.com";
		static int portGmail = 993;
		//поставьте галочки напротив пунктов «Подключаться через безопасное соединение(SSL)»;
		//в поле «Исходящая почта(SMTP)» укажите 465 порт;
		//в поле «Входящая почта(IMAP)» - 993 порт.

		static string imapYandex = "imap.yandex.ru";
		static int portYandex = 993; // 993 с защитой SSL, 143 - без
									 // smtp.yandex.ru, и подключаться по безопасному соединению SSL через порт 465.
									 //В случае, если вы не можете воспользоваться безопасным соединением, вы можете подключиться к SMTP-серверу по портам 25 или 587

		//в разделе Входящие сообщения/Incoming mail (POP3) нужно указать адрес почтового сервера pop.yandex.ru, установить SSL-защиту и порт 995. Если ваша программа по каким-то причинам не поддерживает SSL-защиту соединения, вы можете указать порт 110 и подключаться без SSL
		//в разделе Исходящие сообщения/Outgoing mail(SMTP) необходимо указать адрес сервера smtp.yandex.ru, и подключаться по безопасному соединению SSL через порт 465. В случае, если вы не можете воспользоваться безопасным соединением, вы можете подключиться к SMTP-серверу по портам 25 или 587



		static string imapList = "imap.list.ru";
		static int portList = 25;
		public Form2(string strLogin, string strPassword)
		{
			login = strLogin;
			password = strPassword;
			InitializeComponent();
		}
		// 2000ctac@gmail.com
		// 27012000SP

		// яндекса порт 25 для mstp


		// smtp.gmail.com
		// SmtpClient smtp = new SmtpClient("smtp.list.ru", 25);
		//Порт SMTP - 25, 587 или 2525

		static void GetMail()
		{
			if (login.Contains("@gmail.com"))
				using (var client = new ImapClient())
				{
					client.Connect("imap.gmail.com", 993, true);

					client.Authenticate("2000ctac@gmail.com", "27012000SP");

					var inbox = client.Inbox;
					inbox.Open(FolderAccess.ReadOnly);

					Console.WriteLine("Total messages: {0}", inbox.Count);
					Console.WriteLine("Recent messages: {0}", inbox.Recent);

					for (int i = inbox.Count - 1; i > 0; i--)
					{
						var message = inbox.GetMessage(i);
						Console.WriteLine("Data: {0} \n Subject: {1} \nFrom: {2} \nTo: {3} \nText: {4}", message.Date, message.Subject, message.From, message.To, message.HtmlBody);
					}

					client.Disconnect(true);
				}
			else if (login.Contains("@mail.ru"))
				using (var client = new ImapClient())
				{
					client.Connect("smtp.mail.ru", 587, true);

					client.Authenticate(login, password);

					var inbox = client.Inbox;
					inbox.Open(FolderAccess.ReadOnly);

					Console.WriteLine("Total messages: {0}", inbox.Count);
					Console.WriteLine("Recent messages: {0}", inbox.Recent);

					for (int i = inbox.Count - 1; i > 0; i--)
					{
						var message = inbox.GetMessage(i);
						Console.WriteLine("Data: {0} \n Subject: {1} \nFrom: {2} \nTo: {3} \nText: {4}", message.Date, message.Subject, message.From, message.To, message.HtmlBody);
					}

					client.Disconnect(true);
				}
			else if (login.Contains("@yandex.ru")) //SOAD_369
				using (var client = new ImapClient())
				{
					client.Connect("imap.gmail.com", 993, true);

					client.Authenticate("2000ctac@gmail.com", "27012000SP");

					var inbox = client.Inbox;
					inbox.Open(FolderAccess.ReadOnly);

					Console.WriteLine("Total messages: {0}", inbox.Count);
					Console.WriteLine("Recent messages: {0}", inbox.Recent);

					for (int i = inbox.Count - 1; i > 0; i--)
					{
						var message = inbox.GetMessage(i);
						Console.WriteLine("Data: {0} \n Subject: {1} \nFrom: {2} \nTo: {3} \nText: {4}", message.Date, message.Subject, message.From, message.To, message.HtmlBody);
					}

					client.Disconnect(true);
				}
			else if (login.Contains("@list.ru"))
				using (var client = new ImapClient())
				{
					client.Connect("smtp.list.ru", 25, true);

					client.Authenticate(login, password);

					var inbox = client.Inbox;
					inbox.Open(FolderAccess.ReadOnly);

					Console.WriteLine("Total messages: {0}", inbox.Count);
					Console.WriteLine("Recent messages: {0}", inbox.Recent);

					for (int i = inbox.Count - 1; i > 0; i--)
					{
						var message = inbox.GetMessage(i);
						Console.WriteLine("Data: {0} \n Subject: {1} \nFrom: {2} \nTo: {3} \nText: {4}", message.Date, message.Subject, message.From, message.To, message.HtmlBody);
					}

					client.Disconnect(true);
				}
			else
				MessageBox.Show("Данный почтовый сервис пока не реализуется в программе.\n" +
					"Пожалуйста, авторизируйтесь по-другому");
		}

		private void ButtonDeliveryMessage_Click(object sender, EventArgs e)
		{
			DeliveryMail deliveryMail = new DeliveryMail(login, password);
			deliveryMail.ShowDialog();
		}

		private void comboBox1_ChangeUICues(object sender, UICuesEventArgs e)
		{
		}
		//tyurina-dashuta@list.ru

        private void ButtonShowMessage_Click(object sender, EventArgs e)
        {
			if (login.Contains("@gmail.com"))
				using (var client = new ImapClient())
				{
					client.Connect(imapGmail, portGmail, true);

					client.Authenticate(login, password);
					var inbox = client.Inbox;
					inbox.Open(FolderAccess.ReadOnly);



					if (comboBoxForTimeMessage.SelectedIndex == 0)
					{
						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); --i)
						{
							if (client.Inbox.GetMessage(i).Date.DateTime.DayOfYear == DateTime.Now.DayOfYear && DateTime.Now.Year == client.Inbox.GetMessage(i).Date.DateTime.Year)
								richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}
					else if (comboBoxForTimeMessage.SelectedIndex == 1)
					{
						richTextBox.Text += "1\n";
						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); i--)
						{
							//var message = inbox.GetMessage(i);
							// ПРАВИЛЬНОЕ УСЛОВИЯ НЕДЕЛИ, КОТОРОЕ НУЖНО ПРОТЕСТИТЬ!!!!!!!!!!!
							if (client.Inbox.GetMessage(i).Date.DateTime.DayOfYear >= DateTime.Now.DayOfYear - 7 && DateTime.Now.Year == client.Inbox.GetMessage(i).Date.DateTime.Date.Year || DateTime.Now.DayOfYear <= 7 && 365 - (8 - DateTime.Now.DayOfYear) <= client.Inbox.GetMessage(i).Date.DateTime.DayOfYear && DateTime.Now.Year - 1 == client.Inbox.GetMessage(i).Date.DateTime.Year)
								richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}
					else if (comboBoxForTimeMessage.SelectedIndex == 1)
					{
						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); --i)
						{
							if (client.Inbox.GetMessage(i).Date.DateTime.Month == DateTime.Now.Month && DateTime.Now.Year == client.Inbox.GetMessage(i).Date.DateTime.Year)
								richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}

					else
					{
						richTextBox.Text += "2\n";

						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); --i)
						{
							richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}
					client.Disconnect(true);

				}
			else if (login.Contains("@mail.ru"))
				using (var client = new ImapClient())
				{
					client.Connect(imapMailRu, portMailRu, true);

					client.Authenticate(login, password);

					var inbox = client.Inbox;
					inbox.Open(FolderAccess.ReadOnly);

					if (comboBoxForTimeMessage.SelectedIndex == 0)
					{
						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); --i)
						{
							// ЦИКЛ!!!СООБЩЕНИЯ С МЕССЕДЖБОКСА ВЫВОДЯТСЯ СЛИШКОМ МНОГО ЁПЕРСТ
							MessageBox.Show(inbox.Count.ToString());
							if (client.Inbox.GetMessage(i).Date.DateTime.DayOfYear == DateTime.Now.DayOfYear && DateTime.Now.Year == client.Inbox.GetMessage(i).Date.DateTime.Year)
								richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";

						}
					}
					else if (comboBoxForTimeMessage.SelectedIndex == 1)
					{
						richTextBox.Text += "1\n";
						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); i--)
						{
							//var message = inbox.GetMessage(i);

							if (client.Inbox.GetMessage(i).Date.DateTime.DayOfYear >= DateTime.Now.DayOfYear - 7 && DateTime.Now.Year == client.Inbox.GetMessage(i).Date.DateTime.Date.Year)
								richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}
					else if (comboBoxForTimeMessage.SelectedIndex == 1)
					{
						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); --i)
						{
							if (client.Inbox.GetMessage(i).Date.DateTime.Month == DateTime.Now.Month && DateTime.Now.Year == client.Inbox.GetMessage(i).Date.DateTime.Year)
								richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}

					else
					{
						richTextBox.Text += "2\n";

						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); --i)
						{
							richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}
					client.Disconnect(true);

				}
			else if (login.Contains("@yandex.ru"))
				using (var client = new ImapClient())
				{
					client.Connect(imapYandex, portYandex, true);

					client.Authenticate(login, password);

					var inbox = client.Inbox;
					inbox.Open(FolderAccess.ReadOnly);

					if (comboBoxForTimeMessage.SelectedIndex == 0)
					{
						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); --i)
						{
							// ЦИКЛ!!!СООБЩЕНИЯ С МЕССЕДЖБОКСА ВЫВОДЯТСЯ СЛИШКОМ МНОГО ЁПЕРСТ
							MessageBox.Show(inbox.Count.ToString());
							if (client.Inbox.GetMessage(i).Date.DateTime.DayOfYear == DateTime.Now.DayOfYear && DateTime.Now.Year == client.Inbox.GetMessage(i).Date.DateTime.Year)
								richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";

						}
					}
					else if (comboBoxForTimeMessage.SelectedIndex == 1)
					{
						richTextBox.Text += "1\n";
						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); i--)
						{
							//var message = inbox.GetMessage(i);

							if (client.Inbox.GetMessage(i).Date.DateTime.DayOfYear >= DateTime.Now.DayOfYear - 7 && DateTime.Now.Year == client.Inbox.GetMessage(i).Date.DateTime.Date.Year)
								richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}
					else if (comboBoxForTimeMessage.SelectedIndex == 1)
					{
						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); --i)
						{
							if (client.Inbox.GetMessage(i).Date.DateTime.Month == DateTime.Now.Month && DateTime.Now.Year == client.Inbox.GetMessage(i).Date.DateTime.Year)
								richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}

					else
					{
						richTextBox.Text += "2\n";

						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); --i)
						{
							richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}
					client.Disconnect(true);

				}
			else if (login.Contains("@list.ru"))
				using (var client = new ImapClient())
				{
					client.Connect(imapList, portList, true);

					client.Authenticate(login, password);

					var inbox = client.Inbox;
					inbox.Open(FolderAccess.ReadOnly);

					if (comboBoxForTimeMessage.SelectedIndex == 0)
					{
						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); --i)
						{
							// ЦИКЛ!!!СООБЩЕНИЯ С МЕССЕДЖБОКСА ВЫВОДЯТСЯ СЛИШКОМ МНОГО ЁПЕРСТ
							MessageBox.Show(inbox.Count.ToString());
							if (client.Inbox.GetMessage(i).Date.DateTime.DayOfYear == DateTime.Now.DayOfYear && DateTime.Now.Year == client.Inbox.GetMessage(i).Date.DateTime.Year)
								richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";

						}
					}
					else if (comboBoxForTimeMessage.SelectedIndex == 1)
					{
						richTextBox.Text += "1\n";
						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); i--)
						{
							//var message = inbox.GetMessage(i);

							if (client.Inbox.GetMessage(i).Date.DateTime.DayOfYear >= DateTime.Now.DayOfYear - 7 && DateTime.Now.Year == client.Inbox.GetMessage(i).Date.DateTime.Date.Year)
								richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}
					else if (comboBoxForTimeMessage.SelectedIndex == 1)
					{
						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); --i)
						{
							if (client.Inbox.GetMessage(i).Date.DateTime.Month == DateTime.Now.Month && DateTime.Now.Year == client.Inbox.GetMessage(i).Date.DateTime.Year)
								richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}

					else
					{
						richTextBox.Text += "2\n";

						for (int i = inbox.Count - 1; i > inbox.Count - 1 - Int32.Parse(domainUpDownForLimit.Text); --i)
						{
							richTextBox.Text += "Data: " + client.Inbox.GetMessage(i).Date + "\n" + "Form: " + client.Inbox.GetMessage(i).From + "\n" + client.Inbox.GetMessage(i).Subject + "\n" + client.Inbox.GetMessage(i).TextBody + "\n\n\n";
						}
					}
					client.Disconnect(true);

				}
			else { MessageBox.Show("Мы ещё не знаем такого почтового ящика"); }

		}

		private void button1_Click(object sender, EventArgs e)
        {
			this.Close();
        }

        private void timer_Tick(object sender, EventArgs e)
        {
			ButtonShowMessage_Click(sender, e);
		}
	}
}

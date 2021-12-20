using System;
using System.Xml;
using static System.Console;
using System.Xml.Linq;
using System.Linq;
using System.Collections.Generic;

namespace Victoryna
{
    class Vec
    {
        private string login = "";
        private string password = "";
        private string dataBirth = "";
        private string subject = "";

        private int result = 0;

        public void Entrance()
        {
            XDocument xdoc = XDocument.Load("akk.xml");

            WriteLine("Введите логин, затем пороль");
             login = ReadLine();
             password = ReadLine();

            IEnumerable<XElement> elements = from el in xdoc.Root.Elements()
                                             where el.Name == login
                                             where el.Elements().First().Name == password
                                             select el;

            IEnumerable<XElement> elementsWithOneLigin = from el in xdoc.Root.Elements()
                                                         where el.Name == login
                                                         select el;

            if (elementsWithOneLigin.Count() == 1 && elements.Count() == 0)
            {
                Console.WriteLine(login + ", Вы неправильно ввели пороль, или этот логин уже зарегестрированн");
                Entrance();
                return;
            }
            if (elements.Count() == 0)
            {
                bool flag = true;
                Console.WriteLine("Ваш аккаунт отсутствует. Регестрируйтесь");

                while (flag)
                { 
                    Console.WriteLine("Введите логин, а затем пороль, а затем дату рождения");
                    login = ReadLine();
                    password = ReadLine();
                    dataBirth = ReadLine();

                     elementsWithOneLigin = from el in xdoc.Root.Elements()
                                            where el.Name == login
                                            select el;
                    if (elementsWithOneLigin.Count() > 0)
                    {
                        Console.WriteLine("Логин занят");
                        continue;
                    }
                    flag = false;
                    xdoc.Root.LastNode.AddAfterSelf(new XElement(login, new XElement("password", password), new XElement("dataBirth", dataBirth)));
                    xdoc.Save("akk.xml");
                }

            }
        }
        public void play()
        {
            List<int> list = new List<int>();
            subject = ReadLine();
            XDocument doc;
            if (subject == (2).ToString())
            { 
                doc = XDocument.Load(@"C:\Users\user\source\repos\Victoryna\Victoryna\bin\Debug\netcoreapp3.1\география.xml");
                subject = "география";
            }
            else
            { 
                doc = XDocument.Load(@"C:\Users\user\source\repos\Victoryna\Victoryna\bin\Debug\netcoreapp3.1\random.xml");
                subject = "random";
            }
            for (int i = 0; i < 15; i++)
            {
                foreach (XElement el in doc.Root.Elements())
                {
                    if (el.Name == "Вопрос" + i.ToString())
                    {
                        Console.WriteLine(el.Name + "   " + el.Value);
                    }
                    if (el.Name == "Ответ" + i.ToString())
                    {
                        Console.WriteLine(el.Name + "   " + el.Value);
                    }
                }
                Console.Write("Введите вариант ответа (1-4): ");
                list.Add(Convert.ToInt32(Console.ReadLine()));
            }
            int[] correctAnswers = { 4, 4, 3, 1, 1, 4, 3, 4, 2, 1, 2, 1, 1, 4, 3 };
            int result = 0;
            for (int j = 0; j < 15; j++)
            {
                if (correctAnswers[j] == list[j])
                {
                    result++;
                }
            }
            Console.WriteLine("Правильных ответов: " + result.ToString());
            XDocument dox = XDocument.Load("Результаты.xml");
            dox.Root.Add(new XElement(login, new XElement("name", login), new XElement("subject", subject), new XElement("result", result)));
            dox.Save("Результаты.xml");
            result = 0;
        }

        public void ShowUserResult()
        {
            XDocument doc = XDocument.Load("Результаты.xml");
            WriteLine("Введите логин: ");
            login = ReadLine();

            foreach (XElement el in doc.Root.Elements())
            {
                if (el.Name == login)
                {
                    int i = 0;
                    foreach (XElement em in el.Elements())
                    {
                        if (i == 0)
                            Console.Write("У пользователя " + em.Value);
                        else if (i == 1)
                            Console.Write(" по предмету " + em.Value);
                        else if (i == 2)
                            Console.Write(" результат = " + em.Value + "\n");
                        i++;
                    }
                }
            }

        }
        public void ShowTop()
        {

            XDocument doc = XDocument.Load("Результаты.xml");

            subject = ReadLine();

            if (subject == (2).ToString())
                subject = "география";
            else
                subject = "random";


            foreach (XElement el in doc.Root.Elements())
            {
                int i = 0;
                foreach (XElement em in el.Elements())
                {
                    if (i == 1)
                    {
                        if(em.Value == subject)
                        {
                            Write("У пользователя " + em.ElementsBeforeSelf().First().Value + " ");
                            Write(em.ElementsAfterSelf().First().Value + " очков \n");
                        }
                    }
                    i++;
                }
            }
        }




        // создавал свои викторины
        void CreateGeordafyVictory()
        {

            String[] ques =
            {
              "Какая тертья столица РФ?",
              "Какой самый большой субъект РФ?",
              "Какой народ второй по численности населения РФ?",
              "Площадь аршином общим неизмеримой?",
              "Самая южная точка РФ?",
              "Сколько субъектов РФ?",
              "Самая большая страна мира?",
              "Где находится большое мусорное пятно?",
              "Кому принадлежит Гринландия?",
              "Какой на Земле зарегестрированный абсолютный минус?",
              "А абсолютный плюс?",
              "Какая глубина Марианской впадины?",
              "Высота Эвереста?",
              "Сколько стран в мире?",
              "Когда Колумб открыл Америку?" };

            String[,] answ = { { "РнД", "2.СпБ", "3.Екб", "4.Казань" },
              { "Ростовская", "2.Сахалинская", "3.Красноярский край", "4.Республтка Саха (Якутия)" },
              { "Украинцы", "2.Немцы", "3.Татары", "4.Чеченцы" },
              { "17 000 000 км²", "2.100 000 000 км²", "3.1 000 000 км²", "4.50 000 000 км²" },
              { "Гора Базардюзи", "2.Мыс Челюскин", "3.Мыс Дежнева", "4.Балтийская Коса" },
              { "50", "2.75", "3.100",
                "4.85" },
              { "Бразилия", "2.Каннада", "3.РФ", "4.США" },
              { "В России", "2.В зарубежной азиатской стране",
                "3.В Анталнтическом океане", "4.В Тихом океане" },
              { "США", "2.Дании", "3.Каннаде",
                "4.Исландии" },
              { "−93,2 °C", "2.−100,2 °C", "3.−130,0 °C",
                "−121,9°C" },
              { "+51,2 °C", "2.+56,7 °C", "3.+65,3 °C", "4.+71,2 °C" },
              { "11000 метров", "2.7000", "3.15000",
                "4.5000" },
              { "8 849 м", "2.12 456 м", "3.5 985 м", "4.10 987 м" },
              { "85", "2.235",
                "3.154", "4.197" },
              { "1548", "2.1648", "3.1492 ", "4.1742" } };

            int[] correctAnswers = { 4, 4, 3, 1, 1, 4, 3, 4, 2, 1, 2, 1, 1, 4, 3 };

            XDocument doc = new XDocument();
            doc.Add(new XElement("Викторина"));
            for (int i = 0; i < 15; i++)
            {
                doc.Root.Add(new XElement("Вопрос" + i.ToString(), ques[i]));
                doc.Root.Add(new XElement("Ответ" + i.ToString(), answ[i, 0] + "   " + answ[i, 1] + "   " + answ[i, 2] + "   " + answ[i, 3]));
            }

            doc.Save("география.xml");
        }
        void CreateVictory()
        {

            String[] ques =
            {
              "Which of these dance names is used to describe a fashionable dot?",
              "What is the only position on a football team that can be 'sacked'?",
              "What god of love is often depicted as a chubby winged infant with a bow and arrow?",
              "Which of the following months has no U.S. ferderal holiday?",
              "What mythological beast is reborn from its own ashes?",
              "Who developed the first effective vaccine against polio?",
              "Which of the following is not a monotheistic religion?",
              "In 2014, 17-year-old Pakistani Malla Yousafzai became the youngest person ever awarded the Nobel Peace Prize in recognition of her work for what?",
              "Translated from the Latin, what is the motto of the United States?",
              "As part of its maintenance, which of these tourist attractions requires the use of embalming fluid?",
              "Gerontology is the study of what?",
              "The card game solitaire is also called what?",
              "Which of the following is the title of an acclaimed PBS science series?",
              "When asked why he wanted to climb Mount Everest, what explorer said, 'Because it's there'?",
              "According to the well-known phrase, if a plan is not perfect what will be found 'in the ointment'?" };

            String[,] answ = { { "Hora", "2.Swing", "3.Lambada", "4.Polka" },
              { "Center", "2.Wide receiver", "3.Tight end", "4.Quarterback" },
              { "Zeus", "2.Mercury", "3.Cupid", "4.Poseidon" },
              { "August", "2.February", "3.September", "4.November" },
              { "Phoenix", "2.Minotaur", "3.Dragon", "4.Golem" },
              { "Albert Sabin", "2.Niels Bohr", "3.Louis Pasteur",
                "4.Jonas Salk" },
              { "Islam", "2.Judaism", "3.Hinduism", "4.Christianity" },
              { "Animal welfare", "2.Freedom of the press",
                "3.Nuclear disarmament", "4.Education rights" },
              { "In God we trust", "2.One out of many", "3.All as one",
                "4.Striving together" },
              { "Lenin's tomb", "2.Mount Rushmore", "3.Stonehenge",
                "Hoover Dam" },
              { "Music history", "2.Aging", "3.Color", "4.Grammar" },
              { "Patience", "2.Rochambo", "3.Concentration",
                "4.Associations" },
              { "Nova", "2.Pulsar", "3.Universe", "4.Life" },
              { "Reinhold Messner", "2.Sir Edmund Hillary",
                "3.Peter Habeler", "4.George Mallory" },
              { "Salmon", "2.Frog", "3.Fly", "4.Wildebeest" } };

            int[] correctAnswers = { 4, 4, 3, 1, 1, 4, 3, 4, 2, 1, 2, 1, 1, 4, 3 };

            XDocument doc = new XDocument();
            doc.Add(new XElement("Викторина"));
            for (int i = 0; i < 15; i++)
            {
                doc.Root.Add(new XElement("Вопрос" + i.ToString(), ques[i]));
                doc.Root.Add(new XElement("Ответ" + i.ToString(), answ[i, 0] + "   " + answ[i, 1] + "   " + answ[i, 2] + "   " + answ[i, 3]));
            }

            doc.Save("география.xml");
        }
        void Poisk()
        {
            //foreach (XElement el in doc.Root.Elements().Nodes())
            //{
            //    if (el.Name == "item")
            //    {
            //        foreach (XElement em in el.Elements())
            //        {
            //            if (em.Name == "title")
            //                Console.Write(em.Value);

            //            if (em.Name == "description")
            //                Console.Write(em.Value);
            //            Console.WriteLine();
            //        }
            //    }
            //}
        }


    }
}

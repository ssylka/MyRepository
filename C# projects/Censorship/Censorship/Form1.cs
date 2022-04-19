using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Windows.Forms;
using System.IO;
using System.Diagnostics;
using System.ComponentModel;
using System.Text.RegularExpressions;

namespace Censorship
{
    public partial class Form1 : Form
    {
        static List<string> file_static_path_and_weight = new List<string>();

        static List<string> censored_words;
        static List<string> mati = new List<string>();
        static string text = "";
        static string newtext = text;
        static string[] allfiles;
        static List<Thread> threads = new List<Thread>();
        static int j; // счётчик для каждого читаемого файла. ибо передать значение в поток невозможно в thread(((
        static Semaphore semaphore = new Semaphore(1,60);
        static List<int> topMats = new List<int>();
        static List<int> mat10words = new List<int>();
        static string outputTopMatWords = "";
        
        // новый

        List<string> main_directories = new List<string>();



        public Form1()
        {
            InitializeComponent();
            censored_words = File.ReadAllLines(textBoxDictionary.Text).ToList();
        }
        #region Старый код
        private void PrintStatic()
        {
            using (StreamWriter sw = new StreamWriter(textBoxStatic.Text + "\\mats.txt"))
            {

                foreach (var item in mati)
                {
                    sw.WriteLine( mati.Count(s => s.Equals(item)).ToString() + " слова " + item);
                }
                sw.WriteLine();
                sw.WriteLine();
                foreach (var item in file_static_path_and_weight)
                {
                    sw.WriteLine(item);
                }
            }
        }

        private void buttonPauth_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < threads.Count; i++)
            {   
                if(threads[i].IsAlive)
                threads[i].Suspend();
            }
        }

        private void buttonReturn_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < threads.Count; i++)
            {
                if (threads[i].IsAlive)
                    threads[i].Resume();
            }
        }

        private void buttonStop_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < threads.Count; i++)
            {
                if (threads[i].IsAlive)
                    threads[i].Abort("Завершение по жеанию пользователя");
            }
        }
        #endregion
        void AddInLisrForStatic(object str)//потому что в потоковом чтении добавитть в статистические лситы значения не получается
        {
            text = File.ReadAllText(str.ToString());
            newtext = text;
            foreach (var item in censored_words)
            {
                string newstr = ""; // нужна для нормальнорго названия нового отцензуренного текста (да и запииси тоже)
                for (int i = 0; i < str.ToString().Length; i++)
                {
                    if (str.ToString()[i] == '\\')
                    {
                        newstr = str.ToString().Substring(i);
                    }
                }
                if (text.Contains(item))
                {
                    Regex REX = new Regex(item, RegexOptions.IgnoreCase);
                    MatchCollection RTQ = REX.Matches(text);
                    Console.ReadLine();
                    FileInfo fileInfo = new FileInfo(str.ToString());
                    if(!file_static_path_and_weight.Contains("Мат имеет файл " + str.ToString() + " с весом " + fileInfo.Length.ToString() + " байт"))
                    file_static_path_and_weight.Add("Мат имеет файл " + str.ToString() + " с весом " + fileInfo.Length.ToString() + " байт");
                    for (int i = 0; i < RTQ.Count; i++)
                    {
                        mati.Add(item);
                    }
                    
                }
            }
        }

        void Svoboda_slova_net(object str)
        {
            text = File.ReadAllText(str.ToString());
            newtext = text;
            foreach (var item in censored_words)
            {
                string newstr = ""; // нужна для нормальнорго названия нового отцензуренного текста (да и запииси тоже)
                for (int i = 0; i < str.ToString().Length; i++)
                {
                    if (str.ToString()[i] == '\\')
                    {
                        newstr = str.ToString().Substring(i);
                    }
                }
                if (text.Contains(item))
                {
                    //if (text.Contains(item))
                    //{
                    //    Regex REX = new Regex(item, RegexOptions.IgnoreCase);
                    //    MatchCollection RTQ = REX.Matches(text);
                    //    Console.ReadLine();
                    //    FileInfo fileInfo = new FileInfo(str.ToString());
                    //    file_static_path_and_weight.Add(str.ToString() + " с весом " + fileInfo.Length.ToString());
                    //    for (int i = 0; i < RTQ.Count; i++)
                    //    {
                    //        mati.Add(item);
                    //    }
                    //}
                    newtext = newtext.Replace(item, "*******");

                    File.WriteAllText(textBoxPathOutput.Text + newstr, newtext);
                    File.WriteAllText(textBoxPathOutput.Text + newstr.Replace(".txt", "") + " оригинальный.txt", text);



                }

            }

        }

        private void button1_Click(object sender, EventArgs e)
        {

            List<string> dirs = Directory.GetDirectories(textBoxIstochnic.Text, "*", SearchOption.AllDirectories).ToList();
            dirs.Add(textBoxIstochnic.Text); 
            string[] files_dir;
            foreach (var item in dirs)
            {
                files_dir = Directory.GetFiles(item).Where(s => s.EndsWith(".txt")).ToArray();
                foreach (var item1 in files_dir)
                {
                    Thread thread = new Thread(Svoboda_slova_net);

                    //threads.Add(thread);
                    //threads.LastOrDefault().Start(item1);
                    //не работет. почему-то пишет, что ссылка на последний thread не имеет объекта.

                    thread.Start(item1);
                    AddInLisrForStatic(item1);
                }
            }
            PrintStatic();
        }

    }
}












namespace aaaa
{
    class Program
    {
    }
}







using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using static System.Console;
//using System.Windows.Forms;
using System.Windows;
/*
 * 
 * 
■ Создавать словарь. При создании нужно указать тип словаря. Например,
англо-русский или русско-английский.
■ Добавлять слово и его перевод в уже существующий словарь. Так как у
слова может быть несколько переводов, 
необходимо поддерживать возможность создания нескольких вариантов перевода.
■ Заменять слово или его перевод в словаре.
■ Удалять слово или перевод. Если удаляется слово, 
все его переводы удаляются вместе с ним. Нельзя удалить перевод слова, если это последний
вариант перевода.
■ Словари должны храниться в файлах.
■ Слово и варианты его переводов можно экспортировать в отдельный файл
результата.
■ При старте программы необходимо показывать меню для работы с программой. 
Если выбор пункта меню открывает подменю, то тогда в нем
требуется предусмотреть возможность возврата в предыдущее меню.
 */
namespace ABC
{
    class Program
    {
        static void Main(string[] args)
        {
            using (FileStream file = new FileStream("123.txt", FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite))
            using (StreamWriter sw = new StreamWriter("ENRUS.txt"))
            {
                sw.WriteAsync("123123");
            }
            using (FileStream file = new FileStream("ENRUS.txt", FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite))
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                WriteLine("Перевод какого английского слова хотите увидеть?");

                string str = "";

                string kay = Console.ReadLine();
                for (int i = 0; i < 100000; i++)
                {
                    str = sr.ReadLine();
                    if (str == kay)
                    {
                        WriteLine("\nПеревод:\t");
                        WriteLine(sr.ReadLine());
                    }
                }
                sr.Close();
            }
        }
    }
}




/*
     class SimplCipher : ICipher
    {
        string myString;
        string[] A = { "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};
        string temp;
        public string decode(string str)
        {
            myString = "";
            string r = "";
            for (int i = 0; i < str.Length; i++)
            {
                for (int j = 0; j <= 35; j++)
                {
                    r = str[i].ToString();
                    if (r == A[j])
                    {
                        if (j == 0)
                        {
                            myString = myString.Insert(i, "z".ToString());
                        }
                        else if (j == 26)
                        {
                            myString = myString.Insert(i, "9".ToString());
                        }
                        else
                        {
                            myString = myString.Insert(i, A[j - 1].ToString());
                        }
                    }

                }
            }
            return myString;
        }

        public string encode(string str)
        {
            myString = "";
            temp = "";
            for (int i = 0; i < str.Length; i++)
            {
                temp = str[i].ToString();
                Console.WriteLine($"str[i] = {str[i]}");
                for (int j = 0; j <= 35; j++)
                {
                    if (temp == A[j])
                    {
                        if (j == 25)
                        {
                            myString = myString.Insert(i, "a".ToString());
                            continue;
                        }
                        else if (j == 35)
                        {
                            myString = myString.Insert(i, "0".ToString());
                            continue;
                        }
                        myString = myString.Insert(i, A[j+1].ToString());
                        Console.WriteLine(myString);
                    }
                }
            }
            return myString;
        }
    }

 





 */

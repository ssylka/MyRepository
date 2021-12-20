using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using static System.Console;
//using System.Windows.Forms;
using System.Windows;

namespace ABC
{
    class WorkWithFile
    {
        static void Reading(string name)
        {
            using (StreamReader sr = new StreamReader(name, Encoding.Default))
            {
                WriteLine("Перевод:\n");

                string str = "";

                string kay = ReadLine();
                for (int i = 0; i < 100000; i++)
                {
                    str = sr.ReadLine();
                    if (str == kay)
                    {
                        WriteLine(sr.ReadLine());
                    }
                }
                sr.Close();
            }

        }
    }
}

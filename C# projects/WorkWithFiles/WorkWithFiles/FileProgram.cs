using System;
using System.Collections.Generic;
using System.Text;
using System;
using System.IO;
using System.Text;
using static System.Console;
//using System.Windows.Forms;
using System.Windows;

namespace WorkWithFiles
{
    static class FileProgram
    {
        public static void CreateFile()
        {FileStream file = new FileStream("Day17.txt", FileMode.CreateNew
            );
        }
        public static void OpenAndRead()
        {
            using (FileStream file = new FileStream("C:\\Users\\user\\Desktop\\ENRUS.txt", FileMode.Open, FileAccess.Read, FileShare.Read))
            using (StreamReader sr = new StreamReader(file, Encoding.Unicode))
            {
                // выводим результат на консоль
                WriteLine($"Информация с файла:\n");
                WriteLine(sr.ReadToEnd());
            }
        }
        public static void Record(double[,] massivDouble, int[,] massivInt)
        {
            string filePath = "Day17.txt";
            using (FileStream fs = new FileStream(filePath, FileMode.Create, FileAccess.ReadWrite, FileShare.ReadWrite))
            {
                using (StreamWriter sw = new StreamWriter(fs, Encoding.Unicode))
                {
                    WriteLine("Введите имя, фамилию и отчество");

                    sw.WriteLine(ReadLine());

                    sw.WriteLine($"\n\nстрок массива дробных чисел = {massivDouble.GetLength(0)}, столбцов = {massivDouble.GetLength(1)}");

                    for (int i = 0; i < massivDouble.GetLength(0); i++)
                    {
                        for (int j = 0; j < massivDouble.GetLength(1); j++)
                        {
                            sw.Write(($"{massivDouble[i, j]} \t"));
                        }
                        sw.WriteLine();
                    }

                    sw.WriteLine($"\n\nстрок массива целых чисел = {massivInt.GetLength(0)}, столбцов = {massivInt.GetLength(1)}");

                    for (int i = 0; i < massivInt.GetLength(0); i++)
                    {
                        for (int j = 0; j < massivInt.GetLength(1); j++)
                        {
                            sw.Write(($"{massivInt[i, j]} \t"));
                        }
                        sw.WriteLine();
                    }
                    sw.WriteLine(DateTime.Today.ToLongDateString());
                }
            }
        }
        public static void ReadAndTransformInOriginalStructure(double[,] massivDouble, int[,] massivInt)
        {
            using (FileStream file = new FileStream("Day17.txt", FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite))
            {
                using (StreamWriter sw = new StreamWriter(file, Encoding.Unicode))
                {
                    WriteLine("Введите имя, фамилию и отчество");
                    string writeText = ReadLine();

                    sw.WriteLine(writeText);

                    sw.WriteLine($"\n\nстрок = {massivDouble.GetLength(0)}, столбцов = {massivDouble.GetLength(1)}");

                    for (int i = 0; i < massivDouble.GetLength(0); i++)
                    {
                        for (int j = 0; j < massivDouble.GetLength(1); j++)
                        {
                            sw.Write(($"{massivDouble[i, j]} \t"));
                        }
                        sw.WriteLine();
                    }

                    sw.WriteLine($"\n\nстрок = {massivInt.GetLength(0)}, столбцов = {massivInt.GetLength(1)}");

                    for (int i = 0; i < massivInt.GetLength(0); i++)
                    {
                        for (int j = 0; j < massivInt.GetLength(1); j++)
                        {
                            sw.Write(($"{massivInt[i, j]} \t"));
                        }
                        sw.WriteLine();
                    }
                    sw.WriteLine(DateTime.Today.ToLongDateString());
                }
            }

        }
    }

}

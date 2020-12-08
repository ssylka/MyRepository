#include "Array.h"
#include <iostream>

using namespace std;


Array::Array()
{
}

Array::Array(int n) : size{ n } // yjsdakljsadyhsfkhrewaushfkj инициализаци€ присваивани€ с функцией
{								// важна¬ј∆Ќјважна¬ј∆Ќјважна¬ј∆Ќјважна¬ј∆Ќјважна¬ј∆Ќјважна¬ј∆Ќјважна¬ј∆Ќј
	/*size = n;*/				// важна¬ј∆Ќјважна¬ј∆Ќјважна¬ј∆Ќјважна¬ј∆Ќјважна¬ј∆Ќјважна¬ј∆Ќјважна¬ј∆Ќј
	array = new int[size] {0};
}

void Array::SetSize(int n)
{
	size = n;
	int* array = new int[size];
}

void Array::SetMassiv()
{
	for (int i = 0; i < size; i++)
	{
		cin >> array[i];
	}
}

void Array::Show()
{
	for (int i = 0; i < size; i++)
	{
		cout << array[i]<<"   ";
	}
	
}

void Array::ChangeArray(int newSize)
{
	int* array2 = new int[newSize];
	if (newSize >= size)
	{
		for (int i = 0; i < size; i++)
		{
			array2[i] = array[i];
		}
	}
	else
	{
		for (int i = 0; i < newSize; i++)
		{
			array2[i] = array[i];
		}
	}
	delete[] array;
	array =  array2;
	size = newSize;
}

void Array::Sorting()
{
	int take = 0;
	for (int i = 0; i < size; i++)
	{
		for (int j = i+1; j < size; j++)
		{
			if (array[i] > array[j])
			{
				take = array[i];
				array[i] = array[j];
				array[j] = take;
			}
		}
	}
}

void Array::MinMax(int& min, int& max)
{
	for (int i = 0; i < size; i++)
	{
		if (array[i]<min)
		{
			min = array[i];
		}
		if (array[i]>max)
		{
			max = array[i];
		}
	}
}

Array::~Array()
{
	delete[] array;
}


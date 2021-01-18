#pragma once
#include "dek.h"
void Deq::Clear()
{
	length = 0;
}

Deq::~Deq()
{
	delete[]massiv;
}

Deq::Deq(int a)
{
	massiv = new int[a];
	maxLength = a;
	length = 0;
}

void Deq::Push_front(int m)
{
	massiv[length] = m;
	length++;
}

void Deq::Push_back(int m)
{
	length++;
	for (int i = length; i > 1; i--)
	{
		massiv[i] = massiv[i - 1];
	}

	massiv[0] = m;
}

void Deq::Pop_front()
{
	length--;
}

void Deq::Pop_back()
{
	for (int i = 0; i < length-1; i++)
	{
		massiv[i] = massiv[i+1];
	}
}

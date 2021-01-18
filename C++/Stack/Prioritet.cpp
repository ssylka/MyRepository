#include "Prioritet.h"

PriorityQueue::PriorityQueue(int m)
{
	maxLenght = m;
	lenght = 0;
	queue = new int[m];
	priority = new int[m]; 
}

void PriorityQueue::Push(int a, int _priority)
{
	queue[lenght] = a;
	priority[lenght] = _priority;
	lenght++;
}

void PriorityQueue::Pop()
{
	int max_pri = priority[0];
	int max_ptr = 0;
	for (int g = 1; g < this->lenght ; g++) // поиск первого максимального приоретета и его индексаа
	{
		if (max_pri<this->priority[g])
		{
			max_pri = priority[g];
			max_ptr = g;
		}
	}
	for (int i = max_ptr; i < lenght-1; i++)
	{
		priority[i] = priority[i+1];
		queue[i] = queue[i+1];
	}
	this->lenght--;
}


PriorityQueue::~PriorityQueue()
{
	if (queue)
	{
		delete[]queue;
	}
	if (priority)
	{
		delete[]priority;
	}
}

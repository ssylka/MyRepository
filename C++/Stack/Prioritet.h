#pragma once
#include <iostream>
using namespace std;

class PriorityQueue
{
private:
	int* queue;
	int* priority;
	int maxLenght;
	int lenght;
public:
	PriorityQueue(int m = 10);

	int operator[](int m) { return queue[m]; };
	friend ostream& operator<< (ostream& os, const PriorityQueue& Q)
	{
		for (int i = 0; i < Q.lenght; i++)
		{
			cout << Q.queue[i] << " ["<<Q.priority[i]<<"] "<<endl;
		}
		cout << endl;
		return os;
	};
	void Push(int, int);
	void Pop(); //извлечение элемента
	bool IsFull() { return lenght == maxLenght; };
	bool IsEMPTY() { return lenght == 0; };
	~PriorityQueue();
};

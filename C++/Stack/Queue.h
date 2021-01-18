#pragma once
#include <iostream>
using namespace std;
//LILO
//FIFO
// fiest in = fiest out

class Queue
{
private:
	int* Wait;	// кол-во эл. массива
	int top = 100;	// максимум 
	int point;	// текущий размер
public:
	Queue(int m);
	void Add(int n) { for (int i = 0; i < n; i++) { Wait[point++] = rand() % 100; } };
	int operator[](int m) { return Wait[m]; };
	friend ostream& operator<< (ostream& os, const Queue& Q)
	{
		for (int i = 0; i < Q.point; i++)
		{
			cout << Q.Wait[i] << " ";
		};
		cout << endl;
		return os;
	};
	void Pop(int n);
	void Game();
	~Queue();
};

Queue::Queue(int m=1)
{
	Wait = new int[m];
	point = 0;
	top = m;
	for (int i = 0; i < top; i++)
	{
		Wait[i] = rand() % 10;
	}
}

 void Queue::Pop(int n)
{
	 for (int i = 0; i < n; i++)
	 {
		 for (int i = 0; i < point - 1; i++)
		 {
			 Wait[i] = Wait[i + 1];
		 }
		 point--;
	 }

}



Queue::~Queue()
{
	delete[]Wait;
}
#pragma once

//LILO
//FIFO
// fiest in = fiest out

class Queue
{
private:
	int* Wait;
	int top;
	int point;
public:
	Queue(int m);
	~Queue();

};

Queue::Queue(int m)
{
	Wait = new int[m];
}

Queue::~Queue()
{
}
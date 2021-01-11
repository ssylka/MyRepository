#pragma once
#include <iostream>
using namespace std;

// LIFO
// FILO
// fiest int - lust out

class Stack
{
private:
	enum { EMPTY = -1, FULL = 20 };
	char st[FULL + 1];
	int top;
public:
	Stack();
	void Push(char c);
	char Pop(); //извлечение элемента
	bool IsFull() { return top == FULL; };
	bool IsEMPTY() { return top == EMPTY; };
	void FullStack();
	void Show() 
	{
		for (int i = 0; i < top+1; i++)
		{
			cout << st[i];
		}
	}
};


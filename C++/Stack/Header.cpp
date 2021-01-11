#include "Header.h"

Stack::Stack()
{
	top = EMPTY;
}

void Stack::Push(char c)
{
	if (top == FULL)
	{
		cout << "error, top = -1\n";
	}
	st[++top] = c;
}

char Stack::Pop()
{
	if (top == -1)
	{
		cout << "error, top = -1\n";
		return 0;
	}
	return st[top--];
}

void Stack::FullStack()
{
	while (top <= FULL)
	{
		st[++top] = rand() % 100;
	}

}


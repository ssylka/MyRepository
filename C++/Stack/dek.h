#pragma once
#include <iostream>
using namespace std;
class Deq
{
private:
	int length;
	int maxLength;
	int* massiv;

public:
	Deq(int);
	void Push_front(int m);
	void Push_back(int m);
	void Pop_front();
	void Pop_back();
	//void Front();
	//void Back();
	//void Size();
	void Clear();
	
	friend ostream& operator<< (ostream& os, const Deq& Q)
	{
		for (int i = 0; i < Q.length; i++)
		{
			cout << Q.massiv[i] << " " << endl;
		}
		cout << endl;
		return os;
	};

	~Deq();

};


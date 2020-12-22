
#include <iostream>
#include "Header.h"
#include "Temp.h"
using namespace std;

int main()
{
	//Singlton* p = Singlton::GetRef();
	//cout<<p->Get();
	MyPoint* m = new MyPoint;
	m->operator->()->Set(2);
	m->operator->()->ShowTemp();
}

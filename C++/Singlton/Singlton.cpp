
#include <iostream>
//#include "Header.h"
//#include "Temp.h"
using namespace std;

//int main()
//{
//	//Singlton* p = Singlton::GetRef();
//	//cout<<p->Get();
//	MyPoint* m = new MyPoint;
//	m->operator->()->Set(2);
//	m->operator->()->ShowTemp();
//}



template<typename T>
T sum(T k, ...)
{
	T* pk = &k;
	T sm = 0;
	for (; k; k--)
	{
		sm += *(++pk);
	}
	return sm;
}


template<typename T>
T sum2(T k, ...)
{
	T* pk = &k;
	T sm = 0;
	do
	{
		sm += *pk++;
	} while (*pk);
	return sm;
}


int main()
{
	int a = 5;
	int b = 6;
	cout<<sum2(a, b, 0)<<endl;

}
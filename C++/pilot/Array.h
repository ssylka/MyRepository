#pragma once
//#include <iostream>
//using namespace std;

class Array
{
private:
	int size = 10;
	int* array = new int[size] {0};
public:
	Array();
	Array(int n) /*: size{
	n ? size = n : n = size };*/;
	void SetSize(int n);
	void SetMassiv();
	void Show();
	void ChangeArray(int newSize);
	void Sorting();
	void MinMax(int& min, int& max);
	~Array();
};


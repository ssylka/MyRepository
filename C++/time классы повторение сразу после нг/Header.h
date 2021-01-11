#pragma once
#include <iostream>
using namespace std;


class Time
{
private:
	int second, minutes, hour;
public:
	Time(int _second = 0, int _minutes=0,int _hour=0);
	void Proverka();
	Time operator+= ( const Time &temp);
	void Show() { cout << second << endl << minutes << endl << hour << endl; };
};





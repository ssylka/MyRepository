#pragma once
using namespace std;
class Date
{
private:
	int _day = 0;
	int _month = 0;
	int _year = 0;
	int num = 5;
	int i = 0;
public:
	static int conter;
	static void ShowDate();
	Date(int day, int month, int year);
	Date() { conter++; };
	Date& operator- (const Date& d);
	Date& operator+ (const Date& d);
	Date& operator+ (int d2);

	//Date& operator= (template <d2>);
	operator int();
	operator int*();
	void Show();
	~Date()
	{
		conter = 0;
	}
};




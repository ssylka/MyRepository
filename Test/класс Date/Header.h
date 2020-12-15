#pragma once
using namespace std;
class Date
{
private:
	int _day = 0;
	int _month = 0;
	int _year = 0;

public:
	Date(int day, int month, int year);
	Date() {};
	Date& operator- (const Date& d);
	Date& operator+ (const Date& d);
	Date& operator+ (int d2);

	void Show();
};




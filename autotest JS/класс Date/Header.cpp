#include "Header.h"
#include <iostream>

void Date::ShowDate()
{
	cout<<"Date\n";
}

Date::Date(int day, int month, int year)
{
	_day = day;
	_month =month ;
	_year = year;
	conter++;
}

Date& Date::operator-(const Date& d)
{
	Date temp(this->_day - d._day, this->_month - d._month, this->_year - d._year);
	return temp;
}

Date& Date::operator+(const Date& d)
{
	Date temp(this->_day + d._day, this->_month + d._month, this->_year + d._year);
	temp.num++;
	return temp;
}

Date& Date::operator+(int d2)
{
	int newDay = d2 % 30;
	int newMonth = (d2 % 365) / 30;
	int newYear = d2 / 365;
	Date newDate(newDay, newMonth, newYear);
	return newDate;
}

Date::operator int()
{
	return this->num;
}

Date::operator int* ()
{
	int* numPoint = &num;
	return numPoint;
}

void Date::Show()
{
	cout << "day: " << _day << "\nmonth: " << _month << "\nyear: " << _year << "\n";
}

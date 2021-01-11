#include <iostream>
#include "Header.h"

Time::Time(int _second, int _minutes, int _hour)
{
	second = _second;
	minutes = _minutes;
	hour = _hour;
	if (second >= 60 || minutes >= 60 || hour >= 24)
	{
		if (second==60)
		{
			second = 0;
			minutes += 1;
		}
		if (minutes == 60)
		{
			minutes = 0;
			hour += 1;
		}
		if (hour == 24)
		{
			hour = 0;
		}
	}
}

void Time::Proverka()
{
	if (second >= 60 || minutes >= 60 || hour >= 24)
	{
		if (second >= 60)
		{
			second -= 60;
			minutes += 1;
		}
		if (minutes >= 60)
		{
			minutes -= 60;
			hour += 1;
		}
		if (hour >= 24)
		{
			hour -= 24;
		}
	}
}

Time Time::operator+=(const Time& temp)
{
	this->second += temp.second;
	this->minutes += temp.minutes;
	this->hour += temp.hour;
	Proverka();
	return *this;
}

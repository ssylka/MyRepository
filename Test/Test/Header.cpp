#include "Header.h"
#include <iostream>
using namespace std;

String::String(char* _str)
{
	char* str = new char [strlen(_str)+1];
	strcpy(str, _str);
}

String::String(int _size)
{
	size = _size;
	char* str = new char [size];
}

String::String(const String& Copy)
{
	size = Copy.size;
	strcpy(str, Copy.str);
}

void String::SetStr(char* line)
{
	strcpy(str, line);
}

char* String::GetStr()
{
	return str;
}

void String::Show()
{
	for (int i = 0; i < size; i++)
	{
		cout << str[i];
	}
}


void String::Input()
{
	cin >> str;
	int a = strlen(str);
	str[a + 1] = '\0';
}



String::~String()
{
	delete[] str;
}

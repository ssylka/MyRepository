#pragma once

class String
{
private:
	int size   = 80;
	char* str  = new char[size];
public:
	//String() {};
	String(int _size = 80);
	String(const String& Copy);
	String(char* _str);
	void SetStr(char* line);
	char* GetStr();
	void Show();
	void Input();
	~String();

};


#pragma once

class Singlton 
{
private:
	static Singlton* s;
	int k;
	Singlton(int i) { k = 665; };
	static Singlton* getReferense() { return s; };

public:
	static Singlton* GetRef() { return s; };
	int Get() { return k; };
	void Set(int _k) { k = _k; }
};




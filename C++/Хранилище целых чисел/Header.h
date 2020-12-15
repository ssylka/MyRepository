#pragma once
#include <iostream>
#include <ctime>

using namespace std;


class NumberStorage
{
private:
	int* storage = new int[0];
	uint32_t elementsCount;
	static uint32_t usedMemory;
	static int countStorages;
public:

	NumberStorage(uint32_t ElementsCountP);
	NumberStorage();
	NumberStorage(const NumberStorage& copy) :NumberStorage(copy.elementsCount)
	{
		for (int i = 0; i < elementsCount; i++)
		{
			storage[i] = copy.storage[i];
		}
	};
	int* GetStorage()	{ return storage; };
	void Show();
	void ShowStatic() { cout << usedMemory << endl; };
	~NumberStorage()	{ delete[] storage; }; 

};


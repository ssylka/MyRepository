#include "Header.h"
#include <iostream>

uint32_t NumberStorage::usedMemory = 0;

NumberStorage::NumberStorage(uint32_t ElementsCountP)
{
	storage = new int[ElementsCountP] {0};
	usedMemory += 0;
	elementsCount = ElementsCountP;
}

NumberStorage::NumberStorage()
{
}



void NumberStorage::Show()
{
	for (int i = 0; i < elementsCount; i++)
	{
		cout << storage[i];
	}
}




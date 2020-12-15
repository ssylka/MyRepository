#include <iostream>
#include "Header.h"

using namespace std;

int main()
{
    Date date1(2, 3, 4);
    Date date2(1, 1, 1);
    Date date3 = date1 + 421;
    date3.Show();
}
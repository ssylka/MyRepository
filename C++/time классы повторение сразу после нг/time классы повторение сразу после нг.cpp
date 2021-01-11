#include <iostream>
#include "Header.h"
using namespace std;
int main()
{
    Time time1(1,2,3);
    Time time2(1, 2, 10);
    time1 += time2;
    time1.Show();
}

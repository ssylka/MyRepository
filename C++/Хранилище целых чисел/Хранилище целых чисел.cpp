#include <iostream>
#include "Header.h"
using namespace std;

int main()
{
    NumberStorage noname{ 10 };
    noname.Show();
    cout << endl << "new:"<<endl;
    NumberStorage onename(noname);
    onename.Show();
}
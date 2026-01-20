#include <iostream>
#include "Header.h"

using namespace std;
int Date::conter = 0;
int main()
{
    Date* a = new Date[10];
    cout << Date::conter << endl;
    delete[]a;
    cout << Date::conter<<endl;
    Date b{};
    cout << Date::conter << endl;
    b.ShowDate();
    //Date date2(1, 1, 1);
    //Date date3 = date1 + 422;
    //date3.Show();

}
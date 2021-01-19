#include <iostream>
#include "Node.h"
using namespace std;

int main()
{
    cout << "Hello World!\n";
    List Parovoz;
    Parovoz.AddToTail(0);
    Parovoz.AddToHead(1);
    Parovoz.AddToHead(2);
    Parovoz.AddToHead(3);
    Parovoz.AddToTail(-1);
    Parovoz.AddToHead(4);
    Parovoz.AddToHead(5);
    Parovoz.AddToHead(6);

    Parovoz.Show();

    Parovoz.DeleteIndex(4);
    Parovoz.Show();

    Parovoz.DeleteIndex(214);
    Parovoz.Show();


}

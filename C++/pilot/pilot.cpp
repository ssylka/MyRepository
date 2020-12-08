#include <iostream>
#include "Array.h"
using namespace std;

int main()
{
    //Array* MyArray = new Array [10];


    Array* MyArray_ = new Array[5]
    {
        {5},
        {4},
        {3},
        {2},
        {1}
    };
    for (int i = 0; i < 5; i++)
    {
        MyArray_[i].Show();
        cout << endl;
    }
    //MyArray.SetMassiv();
    //MyArray.Show();
    //MyArray.Sorting();
    //MyArray.Show();
}


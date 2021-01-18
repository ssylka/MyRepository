#include <iostream>
#include "Header.h"
#include "Queue.h"
#include "Prioritet.h"
#include "dek.h"

#include <stdio.h>
#include <time.h>

#include "windows.h"


int main()
{
    //Stack st;
    //st.Push('d');
    //st.Push('i');
    //st.Pop();
    //st.Push('o');
    //st.Push(' ');
    //st.Push('i');
    //st.Push('t');
    //st.Show();
    //cout << endl;
    //st.FullStack();
    //st.Show();
    //cout << endl;
    //while (!st.IsEMPTY())
    //{
    //    st.Pop();
    //}
    //while (!st.IsFull())
    //{
    //    st.Push(rand() % 100);
    //}
    //st.Show();
    //Queue* Q = new Queue[3]{ (10),(10),(10) };
    //for (int i = 0; i < 10; i++)
    //{
    //    cout << Q[0][rand() % 10] << " " << Q[1][rand() % 10] << " " << Q[2][rand() % 10] << endl;
    //    cout << Q[0][rand() % 10] << " " << Q[1][rand() % 10] << " " << Q[2][rand() % 10] << endl;
    //    cout << Q[0][rand() % 10] << " " << Q[1][rand() % 10] << " " << Q[2][rand() % 10] << endl;
    //    Sleep(5000);
    //    system("stl");
    //}
    //PriorityQueue Q(10);
    //Q.Push(1, 1);
    //Q.Push(5, 2);
    //Q.Push(4, 2);
    //Q.Push(3, 2);
    //Q.Push(4, 2);
    //    cout << Q;
    //Q.Pop();
    //cout<<Q.IsEMPTY()<<endl;
    //cout << Q;
    Deq Q(10);
    cout << Q;
    Q.Push_front(1);
    Q.Push_front(1);
    Q.Push_front(1);
    Q.Push_back(2);
    Q.Push_front(2);
    Q.Push_back(3);
    cout << Q;
}

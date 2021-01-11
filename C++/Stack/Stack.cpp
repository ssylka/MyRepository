#include <iostream>
#include "Header.h"


// LIFO
// FILO
// fiest int - lust out
int main()
{
    Stack st;
    st.Push('d');
    st.Push('i');
    st.Pop();
    st.Push('o');

    st.Push(' ');
    st.Push('i');
    st.Push('t');
    st.Show();
    cout << endl;
    st.FullStack();
    st.Show();
    cout << endl;
    while (!st.IsEMPTY())
    {
        st.Pop();
    }
    while (!st.IsFull())
    {
        st.Push(rand() % 100);
    }
    st.Show();
}

// See https://aka.ms/new-console-template for more information
using System.Collections;
using System.Diagnostics;

using System;

class Program
{
    static void Main(string[] args)
    {

        Counter ints1 = new Counter(new int[] { 1, 2, 3, 4, 5 }); // ✅
        foreach (var i in ints1)
        {
            Console.WriteLine(i);
        }

    }
}

class Counter : IEnumerable<int>
{
    private readonly int[] _ints;
    public Counter(int[] ints)
    { 
         _ints = ints;
    }
    public IEnumerator<int> GetEnumerator()
    {
        return new MyEnumerator(_ints);
    }
    IEnumerator IEnumerable.GetEnumerator() => this.GetEnumerator();

}

class MyEnumerator : IEnumerator<int>
{
    public int[] Value { get; }
    private int index = -1;
    public MyEnumerator(int[] ints)
    {
        this.Value = ints;
    }
    public int Current => this.Value[this.index];

    object IEnumerator.Current => this.Current;

    public void Dispose()
    {

    }

    public bool MoveNext()
    {
        index++;
        return index < Value.Length;
    }

    void IEnumerator.Reset()
    {
        index = -1;
    }
}

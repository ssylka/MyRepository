#pragma once

struct Node
{
	int data;
	Node* next;
};


class List
{
private:
	Node* head;
	Node* tail;
	int count;

public:
	List();
	void AddToHead(int);
	void AddToTail(int);
	void DeleteHead();
	void DeleteTail();
	void DeleteIndex(int);
	void Show();
	void AddByIndex(int, int);

	~List();

};

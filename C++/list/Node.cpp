#include "Node.h"
#include <iostream>
using namespace std;

List::List() :
	count{ 0 }, head{ NULL }, tail{NULL}{}

void List::AddToHead(int _count)
{
	// Создали новый узел
	Node* newNode = new Node; //почему вводим new
	newNode->data = _count;
	newNode->next = NULL;
	count++;

	// 1

	if (head == NULL)
	{
		head=tail = newNode;
		return;
	}

	// 2

	newNode->next = this->head;

	// 3 do not cut head (c) Alena 

	this->head = newNode;
}

void List::AddToTail(int volue)
{
	// Создали новый узел
	Node* newNode = new Node; 
	newNode->data = volue;
	newNode->next = NULL;
	count++;

	// 1

	if (tail == NULL)
	{
		head = tail = newNode;
		return;
	}

	// 2 х теперь вторая в списке, ссылка на следующий элемент

	this->tail->next = newNode;

	// 3 do not cut head (c) Alena 

	tail = newNode;
}

void List::DeleteHead()
{
	count--;
	if (head == tail)
	{
		delete head;
		head = tail = NULL;
		return;
	}
	
	Node* temp = this->head->next;
	delete head;
	head = temp;
}

void List::DeleteTail()
{
	count--;

	if (head==tail)
	{
		delete head;
		head = tail = NULL;
		return;
	}

	Node* temp = this->head;

	while (temp->next!= tail)
	{
		temp = temp->next;
	}
	delete tail;
	temp->next = NULL;
	tail = temp;

}

void List::DeleteIndex(int index)
{
	count--;
	Node* temp = this->head;

	if (index <= 1)
	{
		temp = head->next;
		delete head;
		head = temp;
		return;
	}		
	if (index >= count)
	{
		while (temp->next != tail)
		{
			temp = temp->next;
		}
		delete tail;
		tail = temp;
		tail->next = NULL;
		return;
	}
	
	for (int i = 2; i < index; i++)
	{
		temp = temp->next;
	}
	Node* temp1 = temp->next->next;
	delete temp->next;
	temp->next = temp1;
}

void List::Show()
{
	Node* temp = this->head;
	while (temp != NULL)
	{ 
		cout << temp->data<< endl;
		temp = temp->next;
	}
	cout << endl;
}

void List::AddByIndex(int _data, int index)
{
	count++;
	Node* temp = this->head;
	for (int i = 0; i < index ; i++)
	{
		temp = temp->next;
	} //решить частный случай добавления в голову и в хвост
	Node* tempIndex = new Node;
	tempIndex->next = temp->next;
	temp->next = tempIndex;
	tempIndex->data = _data;

}

List::~List()
{
	
}
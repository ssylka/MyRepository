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

void List::DeleteTail()
{
	if (head==tail)
	{
		delete head;
		head = tail = NULL;
		return;
	}

	Node* temp;

	while (temp->next!=this->tail)
	{
		temp->next = temp;
	}
	delete tail;
	tail = temp;


	count--;
	
	delete tail;
	tail = this->head->next->; // неправильно
	head = this->head->;

}

void List::Show()
{
	Node* temp = this->head;
	while (temp)
	{
		cout << temp->data<< endl;
		temp = temp->next;
	}
}

List::~List()
{
	
}
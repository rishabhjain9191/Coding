#include<stdio.h>
#include<stdlib.h>
#include<math.h>
#define LIST_SIZE 1
#define K 3

/* Link list node */
struct node {
	int data;
	struct node* next;
};
void printList(struct node *node);
/* Reverses the linked list in groups of size k and returns the
 pointer to the new head node. */
struct node *reverse(struct node *head, int k) {
	struct node* current = head;
	struct node* next = NULL;
	struct node* prev = NULL;
	int count = 0;

	while (count <k && current!=NULL) {
		next=current->next;
		current->next=prev;
		prev=current;
		current=next;
		count++;
		printf("\n%d\n", count);		/*
		next = current->next;

		current = next;
		prev = current;
		count++;
		*/
		/*
		if(next==NULL||current->next==NULL){
			break;
		}
		*/
		//prev=current;
		/*
		current=current->next;
		next=current->next;
		current->next=prev;
		prev=current;
		count++;
		*/
	}

	if (next != NULL) {
		//reverse(head, k)-->reverse(next, k);
		head->next = reverse(next, k);
	}
	printList(prev);
	printf("\n");
	//head->next=NULL;
	return prev;
}

/*Function to insert node*/
void push(struct node** head_ref, int new_data) {
	/* allocate node */
	struct node* new_node = (struct node*) malloc(sizeof(struct node));

	/* put in the data  */
	new_node->data = new_data;

	new_node->next = (*head_ref);

	(*head_ref) = new_node;
}

/* Function to print linked list */
void printList(struct node *node) {
	while (node != NULL) {
		printf("%d->", node->data);
		node = node->next;
	}
}

/* Driver program*/
int main(void) {

	struct node* head = NULL;
	struct node* result = NULL;
	int i = 0;

	/* Created Linked list */
	for (; i < LIST_SIZE; i++) {
		push(&head, rand() % 100);
	}

	printf("\n Linked list is \n");
	printList(head);
	result=reverse(head, K);

	printf("\n Reversed Linked list is \n");
	printList(result);

	getchar();
	return (0);
}


#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;
typedef pair<double, double> tl;
bool comparator(const tl &p1, const tl &p2){return p1.first<p2.first;}
struct Node{
	double low;
	double high;
	Node *next;
};
typedef struct Node Node;
typedef struct Answer{
	double time;
	double cordinate;
};
class LinkedList{
	Node *head;
	Answer lastAnswer;
	public:
	int noOfNodes;
		void LinkedList(Node *n){
			head=n;
			n->next=head;
			noOfIntervals=1;
		};
		void calculateAnswer();
		void insert(Node *at, Node *node);
};
double speed;
int main(){
	vector<tl > v;
	int blocks;
	cin>>speed;
	cin>>blocks;
	double t, l;
	for(int i=0;i<blocks;i++){
		cin>>t>>l;
		//for the -ve cordinates, convert them to +ve ones
		if(l<0){
			l=360-l;
		}
		v.push_back(make_pair(t, l));
	}
	sort(v.begin(), v.end(), comparator);

	//initialize intervals with the first point
	Node *n=new Node();
	n->high=v[0].second;
	n->low=v[0].second;
	n->next=NULL;
	//initialize the linked list with this node
	LinkedList ll(n);
	//Calculate the answer for first node
	ll.calculateAnswer(v[0].first);
	//for rest of the nodes : 1. expand  2. Merge and Insert 3. Calculate answer
	for(int i=1;i<v.size();i++){
		ll.expandBy(v[i].first);
		ll.mergeAndInsert(v[i].second);
		ll.expandMergeInsert(v[i].first, v[i].second);
	}
}
void LinkedList::expandMergeInsert(double amount, double point){
	Node *current=head;
	while(current!=NULL){

	}
}
void LinkedList::expandBy(double amount){
	Node *current=head;
	while(current!=NULL){
		current->low-=amount;
		if(current->low<0)
			current->low=360-current->low;
		current->high=(current->high+amount)%360;
		current=current->next;
	}
}
void LinkedList::mergeAndInsert(double point){
	Node *current=head;
	
}
void LinkedList::calculateAnswer(double currentTime){
	//find the difference between all the successive intervals, for the largest interval, find the time and cordinate
	Node *current=head;
	Node *next=current->next;
	//if only one node
	if(next==NULL){
		double timeTaken=380/2*speed;
		double dist=speed*timeTaken;
		double from=current->high;
	}
	else{
		double from;
		int max=0, diff;
		while(next!=NULL){
			diff=next->low-current->high;
			if(diff>max){
				max=diff;
				from=current->high;
			}
			current=current->next;
			next=current->next;
		}
		//calculate the diff between 1st and last
		Node *first=head;
		//last element will be current one
		diff=current->high-first->low;
		if(diff>max){
			max=diff;
			from=current->high;
		}
		//timeTaken=distnce(diff)/speed(2*givenspeed(relative))
		double timeTaken=diff/2*speed;
		double dist=timeTaken*speed;//dist=speed(given speed)*time(time taken)
	}
	lastAnswer.time=currentTime+timeTaken;
	lastAnswer.cordinate=(from+dist)%360;
}
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
double dbmod(double n);
int determineCase(Node *interval, double point);
class LinkedList{
	Node *head;
	Answer lastAnswer;
	public:
	int noOfNodes;
		LinkedList(Node *n){
			head=n;
			n->next=head;
			noOfNodes=1;
		};
	Answer getAnswer();
	void expandBy(double amount);
	void merge();
	bool canMerge(Node *interval1, Node *interval2);
	void mergeIntervals(Node *interval1, Node *interval2);
	bool insert(double point);
	void insertPoint(Node *current, double point);
	void calculateAnswer(double currentTime);
	void print();
	void insertPointAfter(Node *current, double point);
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
			l=360+l;
		}
		v.push_back(make_pair(t, l));
	}
	sort(v.begin(), v.end(), comparator);
	//print the sorted ip
	for(int i=0;i<v.size();i++){
		cout<<v[i].first<<", "<<v[i].second<<"\n";
	}
	cout<<"\n";
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
	bool newPointInserted=false;
	double lastTime=v[0].first;
	for(int i=1;i<v.size();i++){
		ll.expandBy(v[i].first-lastTime);
		cout<<"after expanding : ";
		ll.print();
		ll.merge();
		cout<<"after merging : ";
		ll.print();
		newPointInserted=ll.insert(v[i].second);
		if(newPointInserted){
			cout<<"new point inserted : ";
			ll.noOfNodes++;
			ll.print();
			ll.calculateAnswer(v[i].first);
		}

		lastTime=v[i].first;
	}
	Answer ans=ll.getAnswer();
	cout<<ans.time<<", ";
	if(ans.cordinate>180)
		ans.cordinate=(360-ans.cordinate)*-1;
	cout<<ans.cordinate<<"\n";
}
void LinkedList::print(){
	Node *current=head;
	cout<<"\n";
	for(int i=0;i<noOfNodes;i++){
		cout<<current->low<<", "<<current->high<<" -> ";
		current=current->next;
	}
	cout<<"/\n";
}
Answer LinkedList::getAnswer(){
	return lastAnswer;
}
void LinkedList::expandBy(double t){
	double amount=t*speed;
	Node *current=head;
	for(int i=0;i<noOfNodes;i++){
		current->low-=amount;
		if(current->low<0)
			current->low=360+current->low;
		current->high=current->high+amount;
		if(current->high>360)current->high-=360;
		current=current->next;
	}
}
void LinkedList::merge(){
	Node *current=head;
	int iter=noOfNodes;
	//no merging for single interval
	if(noOfNodes<=1){
		return;
	}
	for(int i=0;i<iter;i++){
		if(canMerge(current, current->next)){
			mergeIntervals(current, current->next);
			iter--;
		}
		else{
			current=current->next;
		}
	}
}
bool LinkedList::canMerge(Node *interval1, Node *interval2){
	if(interval2==head){
		//We are trying to merge last and first
		if(interval1->high>interval2->low && interval1->high<interval2->high)
			return true;
		return false;
	}
	if(interval2->low <= interval1->high)
		return true;
	return false;
}
void LinkedList::mergeIntervals(Node *interval1, Node *interval2){
	if(interval2==head){
		interval1->high=interval2->high;
		interval1->next=interval2->next;
		head=interval1;
		free(interval1);
	}
	else{
		interval1->high=interval2->high;
		//delete interval2
		Node *temp=interval2;
		interval1->next=interval2->next;
		free(temp);
	}
}
bool LinkedList::insert(double point){
	bool inserted=false;
	bool newPointInserted=false;
	Node *current=head;
	for(int i=0;i<noOfNodes && !inserted;i++){
		int opt=determineCase(current, point);
		cout<<"opt : "<<opt<<"\n";
		switch(opt){
			case 1:
				//point is within the interval, do nothing
				inserted=true;
				break;
			case 2:
				//point is greater than this interval, move forward, if lastInterval, insert
				if(i==noOfNodes-1){
					insertPointAfter(current, point);
					inserted=true;
					newPointInserted=true;
				}
				else{
					current=current->next;
				}
				break;
			case 3:
				insertPoint(current, point);
				inserted=true;
				newPointInserted=true;
		}
	}
	return newPointInserted;
}
void LinkedList::insertPointAfter(Node *current, double point){
	Node *n=new Node();
	n->low=n->high=point;
	n->next=current->next;
	current->next=n;
}
void LinkedList::insertPoint(Node *current, double point){
	Node *n=new Node();
	n->low=current->low;
	n->high=current->high;
	n->next=current->next;
	current->low=current->high=point;
	current->next=n;
}

int determineCase(Node *interval, double point){
	double high, low;
	if(interval->low<interval->high){
		high=interval->high;
		low=interval->low;
		if(point<low)
			return 3;
		if(point>high)
			return 2;
		return 1;
	}
	else{
		
	}
}
void LinkedList::calculateAnswer(double currentTime){
	Node *current=head;
	vector<double> from;
	double maxDist=0, dist, timeTaken;
	if(noOfNodes==1)maxDist=360;
	for(int i=0;i<noOfNodes;i++){
		if(i==noOfNodes-1)
			dist=current->high-current->next->low;
		else
			dist=current->next->low-current->high;
		if(dist<0)dist=dist*-1;
		cout<<"dist : "<<dist<<"\n";
		if(dist>maxDist){
			maxDist=dist;
			from.clear();
		}
		if(dist==maxDist){
			from.push_back(current->high);
		}
		current=current->next;
	}

	timeTaken=maxDist/(2*speed);//timeTaken=distnce(diff)/speed(2*givenspeed(relative))
	dist=timeTaken*speed;//dist=speed(given speed)*time(time taken)

	cout<<timeTaken<<", "<<dist<<"\n";
	
	lastAnswer.time=currentTime+timeTaken;
	
	//choose the nearest one in case of multiple cordinates
	double cord, minCord=1000;
	for(int i=0;i<from.size();i++){
		cord=from[i]+dist;
		if(cord>=360)cord-=360;
		cout<<"Cord"<<cord<<"\n";
		if(cord<minCord)minCord=cord;
	}
	lastAnswer.cordinate=minCord;
	//if(lastAnswer.cordinate>360){lastAnswer.cordinate-=360;}
}
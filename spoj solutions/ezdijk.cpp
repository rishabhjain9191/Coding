#include <iostream>
#include <cstdio>
#include <vector>
#include <cstring>

#define INF 999999
#define MAX 10002
using namespace std;
class Node{
public:
	int name, length, dValue;
	Node(){};
	Node(int n, int l, int d){
		name=n;length=l;dValue=d;
	};
};
class Heap{
	Node *ary[MAX];
	int size;
	int index;
public:
	int positionOf[MAX];
	bool isInserted[MAX];
	bool empty();
	void insert(Node *);
	void minHeapify(int);
	void changeKey(int elem, int newKey);
	Node *extract_min();
	int parent(int i){
		return i/2;
	};
	int left(int i){
		return i*2;
	};
	int right(int i){
		return i*2+1;
	};
	void clear(){
		size=0;
		index=1;
	};
	int valueof(Node *);

	void swap(int, int);
	Heap(int n){
		index=1;
		size=0;
		memset(isInserted, false, sizeof isInserted);
		for(int i=0;i<n;i++){
			ary[i]=NULL;
		}
	};
	Node * getNode(int n);
};
int Dijkstra();
vector<Node *> *Tree;
int A, B, V, K;
int main(){
	int T;
	int u, v, l;
	scanf("%d", &T);
	while(T--){
		scanf("%d %d", &V, &K);
		Tree=new vector<Node *>[V+1];
		for(int i=0;i<K;i++){
			scanf("%d %d %d", &u, &v, &l);
			Tree[u].push_back(new Node(v, l, INF));
		}
		/*for(int i=1;i<V+1;i++){
			cout<<i<<"--> ";
			for(int j=0;j<Tree[i].size();j++){
				cout<<"("<<Tree[i][j]->name<<", "<<Tree[i][j]->length<<") ";
			}
			cout<<"\n";
		}*/
		scanf("%d %d", &A, &B);
		Dijkstra();
		delete[] Tree;
	}
	return 0;
}
int Dijkstra(){
	if(A==B){
		printf("0\n");
		return 0;
	}
	Node *n=new Node(A, 0, 0);
	Heap pq(V);
	pq.insert(n);
	bool visited[MAX];
	for(int i=0;i<=V;i++){visited[i]=false;}
	int node;
	while(!pq.empty()){
		n=pq.extract_min();
		node=n->name;
		if(visited[node])continue;
		visited[node]=true;
		for(int i=0;i<Tree[node].size();i++){
			if(!visited[Tree[node][i]->name] && Tree[node][i]->dValue>n->dValue+Tree[node][i]->length){
				if(pq.isInserted[Tree[node][i]->name]){
					//cout<<"Key changed\n";
					pq.changeKey(Tree[node][i]->name, n->dValue+Tree[node][i]->length);
				}
				else{
					//cout<<"Inserted\n";
					pq.insert(new Node(Tree[node][i]->name, 0,n->dValue+Tree[node][i]->length));
					//pq.isInserted[Tree[node][i]->name]=true;
				}
			}
		}
	}
	n=pq.getNode(B);
	if(n==NULL){
		printf("NO\n");
	}
	else{
		printf("%d\n", n->dValue);
	}
}
Node * Heap::extract_min(){
	Node *res=ary[1];
	ary[1]=ary[size];
	size--;
	minHeapify(1);
	return res;
}
void Heap::minHeapify(int oddIndex){
	int l=left(oddIndex);
	int r=right(oddIndex);
	int minimum=oddIndex;
	if(l<=size && valueof(ary[l])<valueof(ary[oddIndex]))
		minimum=l;
	if(r<=size && valueof(ary[r])<valueof(ary[minimum]))
		minimum=r;
	if(minimum!=oddIndex){
		swap(oddIndex, minimum);
		minHeapify(minimum);
	}
}
void Heap::swap(int a, int b){
	Node *temp=ary[a];
	ary[a]=ary[b];
	ary[b]=temp;
	int p=a;
	positionOf[ary[a]->name]=b;
	positionOf[ary[b]->name]=p;
}
int Heap::valueof(Node *n){
	return n->dValue;
}
void Heap::insert(Node *rc){
	if(!isInserted[rc->name])
	{
		isInserted[rc->name]=true;
		if(size==0){
			size++;
			ary[size]=rc;
			positionOf[rc->name]=size;
		}
		else{
			size++;
			ary[size]=rc;
			positionOf[rc->name]=size;
			int indx=size;
			int p=parent(indx);
			while(indx>1&&valueof(ary[p])>valueof(ary[indx])){
				swap(p, indx);
				indx=p;
				p=parent(indx);
			}
		}
	}
}
void Heap::changeKey(int n, int key){
	int pos=positionOf[n];
	(ary[pos])->dValue=key;
	while(pos>1 && ary[parent(pos)]->dValue>ary[pos]->dValue){
		swap(pos, parent(pos));
		pos=parent(pos);
	}
}
bool Heap::empty(){
	if(size==0)
		return true;
	return false;
}
Node *Heap::getNode(int n){
	if(isInserted[n])
		return ary[positionOf[n]];
	return NULL;
}
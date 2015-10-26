#include <iostream>
#include <vector>
#define MAX 105
using namespace std;
typedef pair<int, int> rowCol;
class Heap{
private:
	rowCol ary[MAX*MAX];
	int size;
	int index;
public:
	void insert(rowCol);
	rowCol extractMin();
	void minHeapify(int);
	bool isEmpty();
	int valueof(rowCol);
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
	void swap(int, int);
	void print();
	Heap(){
		size=0;
		index=1;
	};
};
int P(rowCol rc, int height);
bool getDownNode(rowCol rc, rowCol &r);
bool getRightNode(rowCol rc, rowCol &r);
bool getUpperNode(rowCol rc, rowCol &r);
bool getLeftNode(rowCol rc, rowCol &r);
int heightof(rowCol rc);
void printPair(rowCol rc);

int row, column;
int totalWater=0;
bool visited[MAX][MAX];
bool insertedIntoHeap[MAX][MAX];
int Height[MAX][MAX];
Heap heap;

int main(){
	int t, input;
	cin>>t;
	while(t--){
		cin>>row>>column;
		for(int i=0;i<row;i++){
			for(int j=0;j<column;j++){
				visited[i][j]=false;
				insertedIntoHeap[i][j]=false;
			}
		}
		totalWater=0;
		for(int i=0;i<column;i++){
			cin>>input;
			Height[0][i]=input;
			heap.insert(make_pair(0, i));
		}
		for(int i=1;i<row-1;i++){
			for(int j=0;j<column;j++){
				cin>>input;
				Height[i][j]=input;
				if(j==0||j==column-1){
					heap.insert(make_pair(i,j));
				}
			}
		}
		if(row>1){
			for(int i=0;i<column;i++){
				cin>>input;
				Height[row-1][i]=input;
				heap.insert(make_pair(row-1, i));
			}
		}
		rowCol res;
		int r;
		while(!heap.isEmpty()){
			res=heap.extractMin();
			r=P(res, heightof(res));
		}
		cout<<totalWater<<"\n";
		heap.clear();
	}
	return 0;
}
int P(rowCol rc, int height){
	if(visited[rc.first][rc.second])
		return 0;
	else{
		vector<rowCol> toBeProcessed;
		visited[rc.first][rc.second]=true;
		rowCol r;
		if(getDownNode(rc, r)){
			if(heightof(r)<=height){
				totalWater+=height-heightof(r);
				toBeProcessed.push_back(r);
				P(r, height);
			}
			else{
				heap.insert(r);
			}
		}
		if(getRightNode(rc, r)){
			if(heightof(r)<=height){
				totalWater+=height-heightof(r);
				toBeProcessed.push_back(r);
				P(r, height);
			}
			else{
				heap.insert(r);
			}
		}
		if(getUpperNode(rc, r)){
			if(heightof(r)<=height){
				totalWater+=height-heightof(r);
				toBeProcessed.push_back(r);
				P(r, height);
				//cout<<"Total water : "<<totalWater<<"\n";
			}
			else{
				heap.insert(r);
			}
		}
		if(getLeftNode(rc, r)){
			if(heightof(r)<=height){
				totalWater+=height-heightof(r);
				//cout<<"Total water : "<<totalWater<<"\n";
				P(r, height);
				toBeProcessed.push_back(r);
			}
			else{
				heap.insert(r);
			}
		}
	}
	return 0;
}
bool getDownNode(rowCol rc, rowCol &r){
	if(rc.first+1>=row)
		return false;
	if(visited[rc.first+1][rc.second])
		return false;
	r.first=rc.first+1;
	r.second=rc.second;
	return true;
}
bool getRightNode(rowCol rc, rowCol &r){
	if(rc.second+1>=column)
		return false;
	if(visited[rc.first][rc.second+1])
		return false;
	r.first=rc.first;
	r.second=rc.second+1;
	return true;
}
bool getUpperNode(rowCol rc, rowCol &r){
	if(rc.first-1<0)
		return false;
	if(visited[rc.first-1][rc.second])
		return false;
	r.first=rc.first-1;
	r.second=rc.second;
	return true;
}
bool getLeftNode(rowCol rc, rowCol &r){
	if(rc.second-1<0)
		return false;
	if(visited[rc.first][rc.second-1])
		return false;
	r.first=rc.first;
	r.second=rc.second-1;
	return true;
}
void Heap::insert(rowCol rc){
	if(!insertedIntoHeap[rc.first][rc.second])
	{
		insertedIntoHeap[rc.first][rc.second]=true;
		if(size==0){
			size++;
			ary[size]=rc;
		}
		else{
			size++;
			ary[size]=rc;
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
	rowCol temp=ary[a];
	ary[a]=ary[b];
	ary[b]=temp;
}
int Heap::valueof(rowCol rc){
	return Height[rc.first][rc.second];
}
rowCol Heap::extractMin(){
	rowCol res=ary[1];
	ary[1]=ary[size];
	size--;
	minHeapify(1);
	return res;
}
bool Heap::isEmpty(){
	if(size==0)
		return true;
	return false;
}
void Heap::print(){
	for(int i=1;i<=size;i++){
		cout<<valueof(ary[i])<<" ";
	}
	cout<<"\n";
}
int heightof(rowCol rc){
	return Height[rc.first][rc.second];
}
void printPair(rowCol rc){
	cout<<"("<<rc.first<<", "<<rc.second<<")";
}
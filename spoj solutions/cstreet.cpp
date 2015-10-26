#include <iostream>
#include <queue>
#define MAX 1001
using namespace std;
class VE{
	public:
	int src,dest,length;
	friend bool operator <(const VE &ve1, const VE &ve2){return ve1.length>ve2.length;};
};
typedef struct Node{
		int data;
		Node *parent;
		Node(int i){
			data=i;
			parent=NULL;
		}
	};
class unionFind{
private:
	int size[MAX];
	Node *set[MAX];
public:
	unionFind(int n){
		for(int i=1;i<=n;i++){
			set[i]=new Node(i);
			size[i]=1;
		}
	};
	int find(int node){
		Node *n=set[node];
		Node *p=n;
		while(n->parent!=NULL){
			n=n->parent;
		}
		//Path Compression
		if(p!=n){
			p->parent=n;
		}
		return n->data;
	};
	int merge(int n1, int n2){
		if(size[n1]>size[n2]){
			set[n2]->parent=set[n1];
			size[n1]+=size[n2];
		}
		else{
			set[n1]->parent=set[n2];
			size[n2]+=size[n1];
		}
	}
};
int main(){
	int T, unitPrice, n, m, a, b, c;
	VE ve;
	priority_queue<VE> edges;
	cin>>T;
	while(T--){
		cin>>unitPrice>>n>>m;
		for(int i=0;i<m;i++){
			cin>>ve.src>>ve.dest>>ve.length;
			edges.push(ve);
		}
		int consideredEdges=0;
		int totalLength=0;
		int srcSet, destSet;
		/*while(!edges.empty()){
			ve=edges.top();
			cout<<ve.src<<" "<<ve.dest<<" "<<ve.length<<"\n";
			edges.pop();
		}*/
		
		unionFind UF(n);
		while(consideredEdges!=n-1){
			//cout<<consideredEdges<<"\n";
			ve=edges.top();
			//Set is different
			srcSet=UF.find(ve.src);
			destSet=UF.find(ve.dest);
			if(srcSet!=destSet){
				UF.merge(srcSet, destSet);
				consideredEdges++;
				totalLength+=ve.length;
			}
			edges.pop();
		}
		cout<<totalLength*unitPrice<<"\n";
		
		//Delete the Queue;
		//edges.clear();
	}
	return 0;
}
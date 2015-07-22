#include <iostream>
#include <vector>
#define MAX 50002
using namespace std;
typedef struct Node{
	int value;
	int weight;
};
vector<Node> *Tree;
pair<int, int> top;
int noOfNodes;
bool visited[MAX];

int Diameter(int node);
int P(int node, int dist);

int main(){
	int T;
	int a, b, l;
	Node newNode;
	cin>>T;
	while(T--){
		cin>>noOfNodes;
		Tree=new vector<Node>[noOfNodes+1];
		for(int i=0;i<noOfNodes-1;i++){
			cin>>a>>b>>l;
			newNode.value=b;
			newNode.weight=l;
			Tree[a].push_back(newNode);
			newNode.value=a;
			newNode.weight=l;
			Tree[b].push_back(newNode);
		}
		/*for(int i=1;i<=noOfNodes;i++){
			for(int j=0;j<Tree[i].size();j++){
				cout<<Tree[i][j].value<<" "<<Tree[i][j].weight;
			}
			cout<<"\n";
		}*/
		cout<<Diameter(1)<<"\n";
	}
	return 0;
}
int Diameter(int node){
	top.first=top.second=0;
	for(int i=0;i<=noOfNodes;i++){
		visited[i]=false;
	}
	P(node, 0);
	for(int i=0;i<=noOfNodes;i++){
		visited[i]=false;
	}
	P(top.second, 0);
	return top.first;
}
int P(int node, int dist){
	if(dist>top.first){
		top.first=dist;
		top.second=node;
	}
	visited[node]=true;
	int maxi=0;
	for(int i=0;i<Tree[node].size();i++){
		if(!visited[Tree[node][i].value]){
			maxi=max(maxi, P(Tree[node][i].value, dist+Tree[node][i].weight));
		}
	}
}
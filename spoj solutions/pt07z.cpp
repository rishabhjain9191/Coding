#include <iostream>
#include <vector>

#define MAX 10002
using namespace std;

vector<int> *Tree;
bool visited[MAX];
int maxVertex=0;
pair<int, int> top;

int Diameter(int Startingnode);
int P(int node, int dist);
int main(){
	int noOfEdges;
	int a, b;
	cin>>noOfEdges;
	Tree=new vector<int>[noOfEdges+1];
	for(int i=1;i<=noOfEdges;i++){
		cin>>a>>b;
		maxVertex=max(maxVertex, max(a,b));
		Tree[a].push_back(b);
		Tree[b].push_back(a);
	}

	//visited[0]=true;

	cout<<Diameter(1)<<"\n";
	return 0;
}

int Diameter(int Startingnode){
	int res1, res2;
	top.first=top.second=0;
	for(int i=0;i<=maxVertex;i++)
		visited[i]=false;
	P(Startingnode, 0);
	//top.first=top.second=0;
	//cout<<maxVertex<<"\n";
	for(int i=0;i<=maxVertex;i++)
		visited[i]=false;
	res2=P(top.second, 0);
	return top.first;
}
int P(int node, int dist){
	//cout<<node<<" "<<dist<<"\n";
	visited[node]=true;
	int maxi=0;
	if(dist>top.first){
		top.first=dist;
		top.second=node;
	}
	for(int i=0;i<Tree[node].size();i++){
		if(!visited[Tree[node][i]])
			maxi=max(maxi, P(Tree[node][i], dist+1));
	}
	return maxi;
}

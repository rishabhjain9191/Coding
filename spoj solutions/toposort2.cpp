#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
#include <stack>
#define MAX 10001
using namespace std;
int n, m;
vector<int> *Tree;
stack<int> res;
bool temp[MAX];
bool visited[MAX];
bool isDAG=true;

bool tsort();
bool dfs(int i);

int main(){
	int u,v;
	scanf("%d %d", &n, &m);
	Tree=new vector<int>[n+1];
	for(int i=0;i<=n;i++){
		visited[i]=false;
		temp[i]=false;
		
	}
	isDAG=true;
	for(int i=0;i<m;i++){
		scanf("%d %d", &u, &v);
		Tree[u].push_back(v);
	}
	if(tsort()){
		//Print values from stack
		while(!res.empty()){
			printf("%d ", res.top());
			res.pop();
		}
	}
	else{
		printf("Sandro fails.");
	}
	return 0;
}
bool tsort(){
	for(int i=n;i>=1;i--){
		if(!visited[i]&&isDAG){
			dfs(i);
		}
	}
	return isDAG;
}
bool dfs(int i){
	//cout<<i<<"\n";
	if(visited[i])
		return false;
	if(temp[i]==true){
		isDAG=false;
		return false;
	}
	temp[i]=true;
	priority_queue<int> pq;
	for(int c=0;c<Tree[i].size();c++){
		if(!visited[Tree[i][c]]){
			pq.push(Tree[i][c]);
		}
	}
	while(!pq.empty()){
			dfs(pq.top());
			pq.pop();
	}
	res.push(i);
	temp[i]=false;
	visited[i]=true;
	return true;
}
#include <iostream>
#include <cstdio>
#include <stack>
#define MAX 10001
using namespace std;
int n, m;
bool Tree[MAX][MAX];
stack<int> res;
bool temp[MAX];
bool visited[MAX];
bool isDAG=true;

bool tsort();
bool dfs(int i);

int main(){
	int u,v;
	scanf("%d %d", &n, &m);
	//Tree=new vector<priority_queue<int> >[n+1];
	for(int i=0;i<=n;i++){
		visited[i]=false;
		temp[i]=false;
		for(int j=0;j<=n;j++){
			Tree[i][j]=false;
		}
	}
	isDAG=true;
	for(int i=0;i<m;i++){
		scanf("%d %d", &u, &v);
		Tree[u][v]=true;;
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
	if(temp[i]==true){
		isDAG=false;
		return false;
	}
	temp[i]=true;
	for(int c=n;c>=1;c--){
		if(Tree[i][c] && !visited[c]){
			dfs(c);
		}
	}
	res.push(i);
	temp[i]=false;
	visited[i]=true;
	return true;
}
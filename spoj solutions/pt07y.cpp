#include <iostream>
#include <cstdio>
#include <vector>
#define MAX 10002
using namespace std;
int N, M;
vector<int> *Tree;
bool visited[MAX];
bool gray[MAX];
//bool vertex[MAX][MAX];
bool dfs(int node, int parent);
int main(){
	int u,v;
	scanf("%d %d", &N, &M);
	Tree=new vector<int>[N+1];
	for(int i=0;i<=N;i++){
		visited[i]=false;
		gray[i]=false;
	}
	for(int i=0;i<M;i++){
		scanf("%d %d", &u, &v);
		Tree[u].push_back(v);
		Tree[v].push_back(u);
		//vertex[u][v]=true;
		//vertex[v][u]=true;
	}
	if(!dfs(1, 0)){
		printf("NO\n");
		return 0;
	}
	else{
		for(int i=2;i<=N;i++){
			if(!visited[i]){
				printf("NO\n");
				return 0;
			}
		}
		printf("YES\n");
	}
	return 0;
}
bool dfs(int node, int parent){
	if(gray[node]){
		return false;
	}
	/*if(visited[node]){
		return false;
	}*/
	else{
		bool res=true;
		visited[node]=true;
		gray[node]=true;
		for(int i=0;i<Tree[node].size()&&res;i++){
			if(Tree[node][i]!=parent){
				res=res&dfs(Tree[node][i], node);
				//cout<<res<<"\n";
			}
		}
		gray[node]=false;
		return res;
	}
}
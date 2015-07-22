#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
#define MAX 1002
using namespace std;
int n,m;
int a[MAX];
bool visited[MAX];
vector<int> *Tree;
int dfs(int node, priority_queue<int> &indexList, priority_queue<int> &nodeList);
int main(){
	int t;
	int u, v;
	scanf("%d", &t);
	while(t--){
		scanf("%d %d", &n, &m);
		Tree=new vector<int>[n+1];
		for(int i=0;i<n;i++){
			scanf("%d", &a[i+1]);
			visited[i+1]=0;
		}
		for(int i=0;i<m;i++){
			scanf("%d %d", &u, &v);
			Tree[u].push_back(v);
			Tree[v].push_back(u);
		}
		int res[MAX], index, num;
		for(int i=1;i<=n;i++){
			priority_queue<int> indexList;
			priority_queue<int> nodeList;
			if(!visited[i]){
				dfs(i, indexList, nodeList);
				while(!indexList.empty()){
					index=indexList.top();
					num=nodeList.top();
					res[index]=num;
					nodeList.pop();
					indexList.pop();
				}
			}
		}
		for(int i=1;i<=n;i++){
			printf("%d ", res[i]);
		}
		printf("\n");
	}
	return 0;
}
int dfs(int node, priority_queue<int> &indexList, priority_queue<int> &nodeList){
	visited[node]=true;
	indexList.push(node);
	nodeList.push(a[node]);
	for(int i=0;i<Tree[node].size();i++){
		if(!visited[Tree[node][i]]){
			dfs(Tree[node][i], indexList, nodeList);
		}
	}
}	
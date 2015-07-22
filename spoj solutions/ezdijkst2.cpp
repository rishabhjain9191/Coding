#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>

#define INF 1000000

using namespace std;

typedef struct Node{
public:
	int name,dValue, length;
	Node(){

	};
	Node(int n, int l){
		name=n;
		length=l;
		dValue=INF;
	};
};
bool operator<(Node a, Node b){return a.dValue>b.dValue;};
int Dijkstra();
vector<Node> *Tree;
int V, K, A, B;
int main(){
	int T,s,d,l;
	scanf("%d", &T);
	while(T--){
		scanf("%d %d", &V, &K);
		Tree=new vector<Node>[V+1];
		for(int i=0;i<K;i++){
			scanf("%d %d %d", &s, &d, &l);
			Node n(d,l);
			Tree[s].push_back(n);
		}
		scanf("%d %d", &A, &B);
		int res=Dijkstra();
		if(res==INF){
			printf("NO\n");
		}
		else{
			printf("%d\n", res);
		}
		delete[] Tree;
	}
	return 0;
}
int Dijkstra(){
	priority_queue<Node> q;
	//vector<Node> v;
	Node n(A, 0);
	Node node;
	if(A==B){
		return 0;
	}
	n.dValue=0;
	q.push(n);
	bool visited[10001];
	int dist[10001];
	for(int i=0;i<=V;i++){visited[i]=false;dist[i]=INF;}
	int res=INF, nn;
	bool found=false;
	while(!q.empty()&&!found){
		node=q.top();
		nn=node.name;
		q.pop();
		if(visited[nn])continue;
		visited[nn]=true;
		//v.push_back(node);
		for(int i=0;i<Tree[nn].size();i++){
			if(!visited[Tree[nn][i].name] && Tree[nn][i].dValue>node.dValue+Tree[nn][i].length){
				Tree[nn][i].dValue=node.dValue+Tree[nn][i].length;
				dist[Tree[nn][i].name]=Tree[nn][i].dValue;
			q.push(Tree[nn][i]);
		}
		}

		
	}
	return dist[B];
}
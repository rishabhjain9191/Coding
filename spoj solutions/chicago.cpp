#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
#include <cstdlib>
#include <cmath>
#define MAX_NODES 101
#define INF 999999
using namespace std;
int N;
typedef pair<int, int > node;
vector<node > *Tree;
bool operator < (node node1, node node2){
	return abs(node1.second)>abs(node2.second);
}
int P();
int main(){
	int m, u,v;
	float w;
	while(scanf("%d %d", &N, &m)==2){
	Tree=new vector<node >[N+1];
	for(int i=0;i<m;i++){
		scanf("%d%d%f", &u, &v, &w);
		Tree[u].push_back(make_pair(v,w));
		Tree[v].push_back(make_pair(u,w));
	}
	/*for(int i=1;i<=N;i++){
		cout<<i<<"->";
		for(int j=0;j<Tree[i].size();j++){
			cout<<"("<<Tree[i][j].first<<", "<<Tree[i][j].second<<")"<<" ---> ";
		}
		cout<<"/\n";
	}*/
	P();
	delete[] Tree;
}
	return 0;
}
int P(){
	bool visited[MAX_NODES];
	int dist[MAX_NODES];
	int nUpdated[MAX_NODES];
	int mVal;
	node n1(1, 1);
	node n;
	for(int i=0;i<=N;i++){
		visited[i]=false;
		dist[i]=INF;
		nUpdated[i]=0;
	}
	dist[n1.first]=0;
	nUpdated[n1.first]=0;
	priority_queue<node > q;
	q.push(n1);
	cout<<q.size()<<"\n";
	while(!q.empty()){
		n=q.top();
		q.pop();
		if(visited[n.first])continue;
		visited[n.first]=true;
		cout<<"For "<<n.first<<" node("<<n.second<<") : \n";
		for(int i=0;i<Tree[n.first].size();i++){
			//double mVal=-abs(dist[n.first] * Tree[n.first][i].second)/100;
			mVal=dist[n.first] + Tree[n.first][i].second;
			//cout<<"mVal = "<<mVal<<"\n";
			if(!visited[Tree[n.first][i].first]&&dist[Tree[n.first][i].first]>mVal){
				dist[Tree[n.first][i].first]=mVal;
				nUpdated[Tree[n.first][i].first]=nUpdated[n.first]+1;
				q.push(make_pair(Tree[n.first][i].first, mVal));
				cout<<"\n Q.top()= ("<<q.top().first<<", "<<q.top().second<<")\n";
				cout<<"\t"<<Tree[n.first][i].first<<" pushed with value "<<mVal<<"\n";
			}
		}
	}
	double ans=-dist[N]*100;
	printf("%.6lf percent\n", ans);
	return 0;
}
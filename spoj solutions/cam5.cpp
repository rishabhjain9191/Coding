#include <iostream>
#include <vector>
using namespace std;
vector<int> *Tree;
bool visited[100000];
int N;

void visit(int node);

int main(){
	int T, e, s, d, count;
	cin>>T;
	while(T--){
		cin>>N;
		Tree=new vector<int>[N];
		for(int i=0;i<N;i++){
			visited[i]=false;
		}
		cin>>e;
		for(int i=0;i<e;i++){
			cin>>s>>d;
			Tree[s].push_back(d);
			Tree[d].push_back(s);
		}
		count=0;
		for(int i=0;i<N;i++){
			if(!visited[i]){
				count++;
				visit(i);
			}
		}
		cout<<count<<"\n";
	}
	return 0;
}
void visit(int node){
	visited[node]=true;
	for(int i=0;i<Tree[node].size();i++){
		if(!visited[Tree[node][i]]){
			visit(Tree[node][i]);
		}
	}
}
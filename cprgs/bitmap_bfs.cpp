#include <iostream>
#include <vector>
#include <cstdio>
#include <queue>
#define INF 999999
using namespace std;
int res[183][183];
int m, n;
bool isValid(int i, int j);
int bfs(int x, int y);
int main(){
	int t;
	char input;
	scanf("%d", &t);
	while(t--){
	vector< pair<int, int> >whites;
		scanf("%d %d\n", &n, &m);
		for(int i=1;i<=n;i++){
			for(int j=1;j<=m;j++){
				scanf("%c", &input);
				//printf("%c", input);
				
				if(input=='1'){
					res[i][j]=0;
					whites.push_back(make_pair(i, j));
				}
				else{
					res[i][j]=INF;
				}
			}
			scanf("%c", &input);
			//printf("%c", input);
		}
		
		for(int i=0;i<whites.size();i++){
			bfs(whites[i].first, whites[i].second);
		}
		for(int i=1;i<=n;i++){
			for(int j=1;j<=m;j++){
				printf("%d ", res[i][j]);
			}
			printf("\n");
		}
	}
}
int bfs(int x, int y){
	queue<int> q;
	q.push(x);
	q.push(y);
	while(!q.empty()){
		int xx=q.front();
		q.pop();
		int yy=q.front();
		q.pop();
		//cout<<xx<<" "<<yy<<"\n";
		int d=res[xx][yy]+1;
		//cout<<"  "<<d<<"\n";
		//see up
		if(isValid(xx, yy-1)&&res[xx][yy-1]>d){
			res[xx][yy-1]=d;
			q.push(xx);
			q.push(yy-1);
		}
		//see down
		if(isValid(xx, yy+1)&&res[xx][yy+1]>d){
			res[xx][yy+1]=d;
			q.push(xx);
			q.push(yy+1);
		}
		//see right
		if(isValid(xx+1, yy)&&res[xx+1][yy]>d){
			res[xx+1][yy]=d;
			q.push(xx+1);
			q.push(yy);
		}
		//see left
		if(isValid(xx-1, yy)&&res[xx-1][yy]>d){
			res[xx-1][yy]=d;
			q.push(xx-1);
			q.push(yy);
		}
	}
}
bool isValid(int i, int j){
	if(i<1||i>n||j<1||j>m)
		return false;
	return true;
}
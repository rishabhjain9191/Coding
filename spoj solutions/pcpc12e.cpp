#include <iostream>
#include <cstdio>
#define INF 0x3f3f3f3f
#define MAX 10010
using namespace std;

int Grid[MAX][7];
int dp[MAX];
bool gray[MAX];
bool visited[MAX];
int SnL[MAX];
int consolidatedSnL[MAX];
int FD[MAX];
int n, m;
bool g[MAX], v[MAX];

int P(int );
int finalDest(int src);

int main(){
	int nLadders, nSnakes;
	int src, dest, res;
	int T;
	
	//cin>>n>>m>>nSnakes>>nLadders;
	while(scanf("%d %d %d %d", &n, &m, &nSnakes, &nLadders)==4){
	for(int i=0;i<=n*m;i++){
		dp[i]=-1;
		gray[i]=false;
		visited[i]=false;
		SnL[i]=-1;
		FD[i]=-1;
		consolidatedSnL[i]=-1;
		g[i]=false;
	}
	for(int i=0;i<nSnakes;i++){
		cin>>src>>dest;
		SnL[src]=dest;
	}
	for(int i=0;i<nLadders;i++){
		cin>>src>>dest;
		SnL[src]=dest;
	}
	for(int i=0;i<=n*m;i++){
		if(SnL[i]!=-1){
			consolidatedSnL[i]=finalDest(i);
		}
	}
	for(int i=0;i<=n*m;i++){
		for(int j=1;j<=6;j++){
			dest=i+j;
			if(dest>n*m){
				res=-1;
			}
			else if(consolidatedSnL[dest]!=-1){
				res=consolidatedSnL[dest];
			}
			else{
				res=dest;
			}
			Grid[i][j]=res;
		}
	}
	/*for(int i=0;i<=n*m;i++){
		cout<<i<<" - ";
		for(int j=1;j<=6;j++){
			cout<<Grid[i][j]<<" ";
		}
		cout<<"\n";
	}*/
	res=P(0);
	if(res>=INF){
		cout<<"-1\n";
	}
	else{
		cout<<res<<"\n";
	}
	}
	return 0;
}
int P(int position){
	if(position==n*m){
		if(consolidatedSnL[position]!=-1)
			return INF;
		return 0;
	}
	if(position<=-1){//Dead End
		return INF;
	}
	if(dp[position]!=-1){
		return dp[position];
	}
	if(gray[position]){//Cycle
		return INF;
	}
	else{
		int mini=INF;
		gray[position]=true;
		for(int i=1;i<=6;i++){
			if(!visited[Grid[position][i]])
				mini=min(mini, 1+P(Grid[position][i]));
		}
		dp[position]=mini;
		gray[position]=false;
		//visited[position]=true;
		return mini;
	}
}
int finalDest(int src){
	if(SnL[src]==-1){
		return src;
	}
	if(FD[src]!=-1){
		return FD[src];
	}
	if(g[src]){
		return -2;
	}
	else{
		g[src]=true;
		int res=finalDest(SnL[src]);
		g[src]=false;
		FD[src]=res;
		return res;
	}
}
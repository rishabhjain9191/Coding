#include <iostream>
#define INF 999999
using namespace std;
int Grid[101][7];
int snakes[101];
int ladders[101];
int dp[101];
bool gray[101];
bool visited[101];
int P(int );
int main(){
	int nLadders, nSnakes;
	int src, dest, res;
	int T;
	cin>>T;
	while(T--){
		cin>>nLadders;
		for(int i=0;i<101;i++){
			snakes[i]=-1;
			ladders[i]=-1;
			dp[i]=-1;
			gray[i]=false;
			visited[i]=false;
		}
		for(int i=0;i<nLadders;i++){
			cin>>src>>dest;
			ladders[src]=dest;
		}
		cin>>nSnakes;
		for(int i=0;i<nSnakes;i++){
			cin>>src>>dest;
			snakes[src]=dest;
		}
		for(int i=0;i<=100;i++){
			for(int j=1;j<=6;j++){
				dest=i+j;
				if(dest>100){
					res=-1;
				}
				else if(ladders[dest]!=-1){
					res=ladders[dest];
				}
				else if(snakes[dest]!=-1){
					res=snakes[dest];
				}
				else{
					res=dest;
				}
				Grid[i][j]=res;
			}
		}
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
	if(position==100){
		return 0;
	}
	if(position==-1){//Dead End
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
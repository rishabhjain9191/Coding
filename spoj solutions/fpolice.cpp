#include <iostream>
#define MAX 101
#define INF 999999
using namespace std;
int Risk[MAX][MAX];
int Time[MAX][MAX];
int N, T;
int MinRisk, MinTime;
bool visited[MAX];

int P(int ps, int timeSoFar, int riskSoFar);

int main(){
	int t;
	cin>>t;
	while(t--){
		cin>>N>>T;
		for(int i=0;i<N;i++){
			for(int j=0;j<N;j++){
				cin>>Time[i][j];
			}
		}
		for(int i=0;i<N;i++){
			visited[i]=false;
			for(int j=0;j<N;j++){
				cin>>Risk[i][j];
			}
		}
		MinRisk=INF;
		MinTime=INF;
		P(0, 0, 0);
		if(MinRisk==INF){
			cout<<"-1"<<"\n";
		}
		else{
			cout<<MinRisk<<" "<<MinTime<<"\n";
		}
	}
	return 0;
}
int P(int ps, int timeSoFar, int riskSoFar){
	if(riskSoFar>MinRisk){
		return INF;
	}
	else if(timeSoFar>T){
		return INF;
	}
	else if(ps==N-1){
		if(riskSoFar<MinRisk){
			MinRisk=riskSoFar;
			MinTime=timeSoFar;
		}
		else if(riskSoFar==MinRisk){
			MinTime=min(MinTime, timeSoFar);
		}
		return 0;
	}
	else{
		visited[ps]=true;
		for(int i=0;i<N;i++){
			if(!visited[i]){
				P(i, timeSoFar+Time[ps][i], riskSoFar+Risk[ps][i]);
			}
		}
		visited[ps]=false;
	}
}
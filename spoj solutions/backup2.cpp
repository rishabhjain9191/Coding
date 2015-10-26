#include <iostream>
#include <cstdio>
#define INF 1<<31
using namespace std;
typedef unsigned long long ULL;
int N, K;
ULL dist[100002];
ULL dp[100002][50002];
ULL P(int source, int k);
ULL mymin(ULL a, ULL b);

int main(){
	int t;
	scanf("%d", &t);
	ULL s1, s2;
	while(t--){
		scanf("%d %d", &N, &K);
		scanf("%llu", &s1);
		for(int i=1;i<=N;i++){
			scanf("%llu", &s2);
			dist[i]=s2-s1;
			s1=s2;
		}
		for(int i=0;i<=N;i++){
			for(int j=0;j<=K;j++){
				dp[i][j]=-1;
			}
		}

		printf("%llu\n", P(1, K));
	}
	return 0;
}
ULL P(int source, int k){
	//cout<<source<<", "<<k<<"\n";
	if(source>=N){
		if(k>0)
			return INF;
		return 0;
	}
	if(dp[source][k]!=-1){
		return dp[source][k];
	}
	else{
		ULL opt1=dist[source]+P(source+2, k-1);
		ULL opt2=P(source+1, k);
		ULL ans=mymin(opt1, opt2);
		dp[source][k]=ans;
		return ans;
	}
}
ULL mymin(ULL a, ULL b){
	if(a>b)
		return b;
	return a;
}
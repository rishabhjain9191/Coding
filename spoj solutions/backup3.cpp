#include <iostream>
#include <cstdio>
#define INF 1<<31
using namespace std;
typedef unsigned long long ULL;
int N, K;
ULL dist[100002];
ULL mymin(ULL a, ULL b);
ULL prev[50001], prevprev[50001], curr[50001];
ULL *p, *pp, *c, *temp;
int main(){
	int t;
	scanf("%d", &t);
	ULL s1, s2;
	while(t--){
		scanf("%d %d", &N, &K);
		scanf("%llu", &s1);
		for(int i=1;i<N;i++){
			scanf("%llu", &s2);
			dist[i]=s2-s1;
			s1=s2;
		}
		prev[0]=0;
		prevprev[0]=0;
		curr[0]=0;
		for(int i=1;i<=K;i++){
			prev[i]=INF;
			prevprev[i]=INF;
		}
		p=prev;
		pp=prevprev;
		c=curr;
		int diff=0;
		for(int i=N-1;i>=1;i--){
			if(i&1){}else{diff++;}
			for(int j=diff;j<=K;j++){
				c[j]=mymin(p[j], dist[i]+pp[j-1]);
			}
			temp=pp;
			pp=p;
			p=c;
			c=temp;
		}
		printf("%llu\n", p[K]);

	}
	return 0;
}
ULL mymin(ULL a, ULL b){
	if(a>b)
		return b;
	return a;
}
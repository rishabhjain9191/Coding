#include <iostream>
#include <queue>
using namespace std;
typedef unsigned long long ULL;
int main(){
	int t;
	unsigned int n,k;
	unsigned long long s1, s2, ans=0;
	scanf("%d", &t);
	while(t--){
		priority_queue<ULL, vector<ULL>, greater<ULL> > pq;
		scanf("%u %u", &n, &k);
		scanf("%llu", &s1);
		for(int i=1;i<n;i++){
			scanf("%llu", &s2);
			pq.push(s2-s1);
			s1=s2;
		}
		for(int i=0;i<k;i++){
			ans+=pq.top();
			pq.pop();
		}
		printf("%llu\n", ans);
	}	
}
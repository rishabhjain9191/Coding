#include <iostream>
#include <cstdio>
using namespace std;
typedef unsigned long long ULL;

int gcd(int a, int b);
int lcm(int a, int b);

int main(){
	int t;
	int a, b, l;
	ULL n, lcmIndex, i, ans, p, q, lcmSkipped;
	scanf("%d", &t);
	while(t--){
		scanf("%d %d %llu", &a, &b, &n);
		l=lcm(a,b);
		lcmIndex=l/a+l/b-1;
		lcmSkipped=n/lcmIndex;
		p=lcmSkipped*l/a;
		q=lcmSkipped*l/b;
		i=lcmSkipped*lcmIndex;
		//ans=a*p;
		//cout<<p<<" "<<q<<" "<<lcmSkipped<<"\n";
		for(;i<=n;i++){
			if(a*p==b*q){
				ans=a*p;
				p++;
				q++;
			}
			else if(a*p<b*q){
				ans=a*p;
				p++;
			}
			else{
				ans=b*q;
				q++;
			}
		}
		printf("%llu\n", ans);
	}
	return 0;
}
int lcm(int a, int b){
	return a*b/gcd(a, b);
}
int gcd(int a, int b){
	if(a==0)
		return b;
	return gcd(b%a,a);
}
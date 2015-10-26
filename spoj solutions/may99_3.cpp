#include <iostream>
#include <cstdio>
using namespace std;
int gcd(int , int);
int main(){
	int T;
	int a, b, c;
	scanf("%d", &T);
	while(T--){
		scanf("%d %d %d", &a, &b, &c);
		if(c>a&&c>b)
			printf("NO\n");
		else if(c%gcd(a,b)!=0)
			printf("NO\n");
		else
			printf("YES\n");
	}
	return 0;
}
int gcd(int a, int b){
	if(b==0)
		return a;
	return gcd(b, a%b);
}
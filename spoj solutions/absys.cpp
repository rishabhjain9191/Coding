#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cstring>
using namespace std;
int intlen(int num);
int main(){
	int t, res;
	scanf("%d", &t);
	char a[50], b[50], c[50];
	//scanf("%s", a);
	//printf("%d", atoi(a));
	while(t--){
		scanf("%s + %s = %s\n", a, b, c);
		if(intlen(atoi(a))<strlen(a)){
			res=atoi(c)-atoi(b);
			printf("%d + %s = %s\n", res, b, c);
		}
		else if(intlen(atoi(b))<strlen(b)){
			res=atoi(c)-atoi(a);
			printf("%s + %d = %s\n", a, res, c);
		}
		else{
			res=atoi(a)+atoi(b);
			printf("%s + %s = %d\n", a, b, res);	
		}
	}
	return 0;
}
int intlen(int num){
	int res=0;
	while(num!=0){
		num=num/10;
		res++;
	
	}
	return res;
}
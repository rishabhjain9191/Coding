#include <iostream>
#include <cstdio>
using namespace std;
int gcd(int , int);
int P(int a, int b, int c);
int main(){
	int T;
	int a, b, c;
	scanf("%d", &T);
	while(T--){
		scanf("%d %d %d", &a, &b, &c);
		if(c>a&&c>b)
			printf("-1\n");
		else if(c%gcd(a,b)!=0)
			printf("-1\n");
		else if(a==c||b==c)
			printf("1\n");
		else
			printf("%d\n",min(P(a,b,c), P(b,a,c)));
			//P(b,a,c);

	}
	return 0;
}
int gcd(int a, int b){
	if(b==0)
		return a;
	return gcd(b, a%b);
}
int P(int a, int b, int c){
	//cout<<a<<b<<c;
	int move=1;
	int va, vb, waterPoured;
	va=a;
	vb=0;
	while(1){
	//for(int i=0;i<2;i++){
		//cout<<va<<" "<<vb<<"\n";
		waterPoured=min(va,b-vb);
		vb+=waterPoured;
		va=va-waterPoured;
		move++;
		if(va==c||vb==c){
			break;
		}
		if(vb==b){
			//b is full, so empty it
			vb=0;
			move++;
		}
		else{
		//a is empty, so fill a
		va=a;
		move++;
		}
	}	
	//}
	//cout<<move;
	return move;
}
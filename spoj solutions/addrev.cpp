#include <iostream>
using namespace std;

int reversedSum(int n1, int n2);
int reverse(int n);

int main(){
	int N;
	int n1, n2;
	cin>>N;
	while(N--){
		cin>>n1>>n2;
		cout<<reversedSum(n1, n2)<<"\n";
	}
	return 0;
}
int reversedSum(int n1, int n2){
	int a=reverse(n1);
	int b=reverse(n2);
	return reverse(a+b);
}
int reverse(int n){
	int res=0;
	while(n!=0){
		res=res*10+n%10;
		n=n/10;
	}
	return res;
}
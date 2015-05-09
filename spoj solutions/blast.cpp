#include <iostream>
#include <string>
int diff(char &a, char &b);
int mymin(int, int, int);
using namespace std;
int main(){
	string A, B;
	int k;
	int len1, len2;
	cin>>A>>B>>k;

	len1=A.length();
	len2=B.length();

	int count[len2+1][len1+1];
	int i,j;

	int t=0;
	for(i=len2;i>=0;i--){
		count[i][len1]=t*k;
		t++;
	}
	t=0;
	for(j=len1;j>=0;j--){
		count[len2][j]=t*k;
		t++;
	}
	for(i=len2-1;i>=0;i--){
		for(j=len1-1;j>=0;j--){
			count[i][j]=mymin(k+count[i][j+1], k+count[i+1][j], diff(A[j], B[i])+count[i+1][j+1]);
		}
	}
	cout<<count[0][0]<<"\n";
	return 0;
}
int diff(char &a, char &b){
	return abs(a-b);
}
int mymin(int a, int b, int c){
	return min(a, min(b,c));
}
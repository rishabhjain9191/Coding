#include <iostream>
//#define INT_MAX1 20000
typedef struct
{
	int fare;
	int minfare;
}MyStruct;
int mymin(int a, int b, int c);
using namespace std;
int main(){
	int i,j;
	int N, M;
	MyStruct DP[101][103];

	cin>>N>>M;
	for(i=0;i<N;i++){
		DP[i][0].minfare=20000;
		DP[i][M+1].minfare=20000;
	}
	for(i=0;i<N;i++){
		for(j=1;j<=M;j++){
			cin>>DP[i][j].fare;
		}
	}
	for(j=1;j<=M;j++){
		DP[N-1][j].minfare=DP[N-1][j].fare;
	}
	for(i=N-2;i>=0;i--){
		for(j=1;j<=M;j++){
			DP[i][j].minfare=DP[i][j].fare+mymin(DP[i+1][j].minfare, DP[i+1][j+1].minfare, DP[i+1][j-1].minfare);
		}
	}

	int ans=20000;
	for(j=1;j<=M;j++){
		if(DP[0][j].minfare<ans){
			ans=DP[0][j].minfare;
		}
	}
	cout<<ans<<"\n";
	
	return 0;
}
int mymin(int a, int b, int c){
	return min(a, min(b,c));
}
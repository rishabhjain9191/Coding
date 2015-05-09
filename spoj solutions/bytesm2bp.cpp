#include <iostream>
using namespace std;
int Room[102][102];
int DP[102][102];
int h,w;
int main(){
	int t;
	int i,j;
	int maxi;
	cin>>t;
	while(t--){
		memset(DP, 0, sizeof DP);
		//memset(DP, -1, )
		cin>>h>>w;
		for(i=1;i<=h;i++){
			for(j=1;j<=w;j++){
				cin>>Room[i][j];
			}
		}

		for(i=h;i>0;i--){
			for(j=w;j>0;j--){
				DP[i][j]=Room[i][j]+max(max(DP[i+1][j], DP[i+1][j+1]),DP[i+1][j-1]);
			}
		}
		maxi=0;
		for(j=1;j<=w;j++){
			maxi=max(maxi, DP[1][j]);
		}
		cout<<maxi<<"\n";
	}
}
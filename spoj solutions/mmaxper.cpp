#include <iostream>
#include <cstdlib>
using namespace std;
int n;
int R[1000][2];
//int H[1001];
int dp[1000][2];
int solve(int i, int m);
int main(){
	int i,j;
	cin>>n;
	int maxi=0;
	for(i=0;i<n;i++){
		cin>>R[i][0]>>R[i][1];
		//maxi=max(maxi, max(W[i],H[i]));
		dp[i][0]=-1;
		dp[i][1]=-1;
	}

	cout<<max(R[0][0]+solve(1, 1), R[0][1]+solve(1, 0))<<"\n";
	
}
int solve(int i, int m){
	if(i>=n)
		return 0;
	if(dp[i][m]!=-1){
		return dp[i][m];
	}
	int prev=R[i-1][m];
	int ans= max(R[i][0]+abs(prev-R[i][1])+solve(i+1, 1), R[i][1]+abs(prev-R[i][0])+solve(i+1, 0));
	dp[i][m]=ans;
	return ans;
}
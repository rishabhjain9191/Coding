#include <iostream>
using namespace std;
int T[2001];
int dp[2001][2001];
int n;
int main(){
	cin>>n;
	int i;
	for(i=0;i<n;i++){
		cin>>T[i];
	}
	int age=n;
	for(i=0;i<n;i++){
		dp[0][i]=T[i]*age;
	}
	age--;
	int k;
	for(i=1;i<n;i++){
		for(k=0;k<n-i;k++){
			dp[i][k]=max(T[k]*age+dp[i-1][k+1],T[k+i]*age+dp[i-1][k]);
		}
		age--;
	}

	// for(i=0;i<n;i++){
	// 	for(k=0;k<n-i;k++){
	// 		cout<<dp[i][k]<<" ";
	// 	}
	// 	cout<<"\n";
	// }

	cout<<dp[n-1][0]<<"\n";
	return 0;
}
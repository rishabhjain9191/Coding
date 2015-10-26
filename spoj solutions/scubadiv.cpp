#include <iostream>
using namespace std;
int T[1001],A[1001],W[1001];
long int dp[1002][100][100];
int t,a;
int n;
long int P(int Vo,int Vn,int Ci);
int main(){
	int c;
	int i,j,k;
	cin>>c;
	while(c--){
		cin>>t>>a;
		cin>>n;
		for(i=1;i<=n;i++){
			cin>>T[i]>>A[i]>>W[i];
			for(j=0;j<100;j++){
				for(k=0;k<100;k++){
					dp[i][j][k]=-1;
				}
			}
		}
		cout<<P(0,0,1)<<"\n";
	}
	return 0;
}
long int P(int Vo,int Vn,int Ci){
	if(Ci>n){
		if(Vo>=t&&Vn>=a)
			return 0;
		return 800*1000;
	}
	if(Vo>=t&&Vn>=a){
		return 0;
	}
	//Missing Condition////
	if(Vo>=t)
		Vo=t;
	if(Vn>=a)
		Vn=a;
	/////////////
	if(dp[Ci][Vo][Vn]!=-1){
		return dp[Ci][Vo][Vn];
	}
	else{
		long int ans= min(W[Ci]+P(Vo+T[Ci],Vn+A[Ci],Ci+1), P(Vo,Vn,Ci+1));
		dp[Ci][Vo][Vn]= ans;
		return ans;
	}
}
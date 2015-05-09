#include <iostream>
#include <string.h>
using namespace std;
int n,m;
int profit[1002];
int DP[1002][1002];
int startfrom(int broomNo, int maxThatCanBeBought);
int main(){
	int t;
	cin>>t;
	while(t--){
		memset(DP, -1, sizeof DP);
		cin>>n>>m;
		int i, input;
		for(i=0;i<n;i++){
			cin>>input;
			profit[i+1]=-input;
		}
		int maxi=0;
		for(i=1;i<=n;i++)
			maxi=max(maxi, startfrom(i, m));
		cout<<maxi<<"\n";
	}
	return 0;
}
int startfrom(int broomNo, int maxThatCanBeBought){
	if(maxThatCanBeBought<=0)
		return 0;
	if(broomNo>n)
		return 0;
	if(DP[broomNo][maxThatCanBeBought]!=-1){
		return DP[broomNo][maxThatCanBeBought];
	}
	int ans;
	ans=max(profit[broomNo]+startfrom(broomNo+1, maxThatCanBeBought-1),startfrom(broomNo+1, maxThatCanBeBought));
	DP[broomNo][maxThatCanBeBought]=ans;
	//cout<<broomNo<<"-"<<maxThatCanBeBought<<" : ";

	//cout<<ans<<"\n";
	return ans;
}
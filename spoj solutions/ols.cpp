#include <iostream>
using namespace std;
int main(){
	int N,M;
	int X1[100001],X2[100001];
	cin>>N>>M;
	int i,j;
	for(i=0;i<N;i++){
		cin>>X1[i]>>X2[i];
	}
	int query,ans;
	for(i=0;i<M;i++){
		cin>>query;
		ans=0;
		for(j=0;j<N;j++){
			if(query>=X1[j]&&query<=X2[j]){
				ans++;
			}
		}
		cout<<ans<<"\n";
	}
}
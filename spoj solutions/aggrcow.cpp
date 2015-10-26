#include <iostream>
#include <algorithm>
using namespace std;
int N, C;
unsigned long long x[100010];
int main(){
	int t;
	cin>>t;
	while(t--){
		cin>>N>>C;
		for(int i=1;i<=N;i++){
			cin>>x[i];
		}
		sort(x+0, x+N+1);
		int minMMD=1;
		int maxMMD=x[N]-x[1];
		int mmd;
		while(minMMD<maxMMD){
			//cout<<"["<<minMMD<<", "<<maxMMD<<"]";
			mmd=minMMD+(maxMMD-minMMD+1)/2;
			//cout<<"  , min : "<<mmd<<"\n";
			int dist=0, cowsPlaced=1, lastCowIndex=1;
			for(int i=2;i<=N;i++){
				dist=x[i]-x[lastCowIndex];
				if(dist<mmd){
					//Cannot place the cow here
				}
				else{
					//Place the cow here
					cowsPlaced++;
					lastCowIndex=i;
					dist=0;
				}
			}
			if(cowsPlaced<C){
				// unable to place all the cows for mmd => for x>mmd, you also cannot
				//=> decrement the higher limit to mmd-1;
				maxMMD=mmd-1;
			}
			else{
				//all the cows can be places for this value for mmd, so it is also possible that we can place at this distance or higher than this
				minMMD=mmd; 
			}
		}
		cout<<minMMD<<"\n";
	}
	return 0;
}
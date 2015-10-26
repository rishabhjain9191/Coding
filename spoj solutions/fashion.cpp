#include <iostream>
using namespace std;
int main(){
	int T,n,i,ip,pm,pf,score;
	int M[11], W[11];
	cin>>T;
	while(T--){
		for(i=0;i<=10;i++){
			M[i]=0;
			W[i]=0;
		}
		cin>>n;
		for(i=0;i<n;i++){
			cin>>ip;
			M[ip]++;
		}
		for(i=0;i<n;i++){
			cin>>ip;
			W[ip]++;
		}
		pm=pf=10;
		score=0;
		while(pm>=0||pf>=0){
			if(M[pm]==W[pf]){
				score+=pm*pf*M[pm];
				pm--;
				pf--;
			}
			else if(M[pm]>W[pf]){
				score+=W[pf]*pf*pm;
				M[pm]=M[pm]-W[pf];
				pf--;
			}
			else{
				score+=M[pm]*pf*pm;
				W[pf]-=M[pm];
				pm--;
			}
		}
		cout<<score<<"\n";
	}
	return 0;
}
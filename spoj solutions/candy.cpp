#include <iostream>
using namespace std;
int main(){
	int n, sum,i,ans, val,ip;
	int a[10001];
	cin>>n;
	while(n!=-1){
		sum=0;
		for(i=0;i<n;i++){
			cin>>ip;
			sum+=ip;
			a[i]=ip;
		}
		
		if(sum%n!=0){
			cout<<"-1"<<"\n";
		}
		else{
			val=sum/n;
			ans=0;
			for(i=0;i<n;i++){
				if(a[i]<val){
					ans+=val-a[i];
				}
			}
			cout<<ans<<"\n";
		}
		cin>>n;
	}
	return 0;
}
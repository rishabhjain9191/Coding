#include <iostream>
using namespace std;
double P(long long int availableDices, long long int sumToObtain);
long long int maxSum(long long int availableDices);
long long int minSum(long long int availableDices);
long long int mirrorImage(long long int dices, long long int sum);
long long int power(long long int num, long long int p);
double DP[1001][6001];
int main(){
	long long int t;
	cin>>t;
	long long int availableDices, sumToObtain;
	for(long long int i=1;i<=6;i++){
		DP[1][i]=100.0/6;
	}
	while(t--){
		cin>>availableDices>>sumToObtain;
		cout<<(int)P(availableDices, sumToObtain)<<"\n";
	}
	
	return 0;
}
double P(long long int availableDices, long long int sumToObtain){
	if(availableDices>1000)
		return 0;
	if (sumToObtain>maxSum(availableDices))
	{
		return 0.0;
	}
	if (sumToObtain<minSum(availableDices))
	{
		/* code */
		return 0.0;
	}
	if(DP[availableDices][sumToObtain]>0){
		return DP[availableDices][sumToObtain];
	}
	if(DP[availableDices][mirrorImage(availableDices, sumToObtain)]>0){
		return DP[availableDices][mirrorImage(availableDices, sumToObtain)];
	}
	double ans=0.0, ans1;
	long long int k=0;
	for(long long int i=1;i<=6;i++){
		ans+=P(availableDices-1, sumToObtain-i);
		/*ans1=P(availableDices-1, sumToObtain-i);
		if(ans1!=0){
			ans+=ans1;
			k++;
		}*/
	}
	// cout<<k<<"\n";
	DP[availableDices][sumToObtain]=ans/6;
	DP[availableDices][mirrorImage(availableDices, sumToObtain)]=ans/6;
	return ans/6;
}
long long int maxSum(long long int availableDices){
	return 6*availableDices;
}
long long int minSum(long long int availableDices){
	return availableDices;
}
long long int mirrorImage(long long int dices, long long int sum){
	if (sum-minSum(dices)<maxSum(dices)-sum)
	{
		return maxSum(dices)-(sum-minSum(dices));
	}
	return minSum(dices)+(maxSum(dices)-sum);
	//()?return maxSum(dices)-(sum-minSum(dices)):return minSum(dices)+(maxSum(dices)-sum);
}
long long int power(long long int num, long long int p){
	long long int ans=1;
	while(p--){
		ans=ans*num;
	}
	return ans;
}
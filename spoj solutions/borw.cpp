#include <iostream>
#include <algorithm>
using namespace std;
int numbers[201];
int n;
//int DP[201][1000001][1000001];
int p(int currentIndex,int uptillMax, int uptillMin);
int main(){
	int i;
	cin>>n;
	while(n!=-1){
		for(i=0;i<n;i++){
			cin>>numbers[i];
		}
		//memset(DP, -1, sizeof DP);
		cout<<n-p(0, 0, 1000001)<<"\n";
		cin>>n;
	}
	return 0;
}
int p(int currentIndex,int uptillMax, int uptillMin){
	cout<<currentIndex<<"-"<<uptillMax<<" - "<<uptillMin<<"\n";
	if(currentIndex>=n){
		return 0;
	}
	
	int skipScore=0, blckScore=0, whtScore=0;
	if(numbers[currentIndex]>uptillMax)
		blckScore=1+p(currentIndex+1, numbers[currentIndex], uptillMin);
	if(numbers[currentIndex]<uptillMin)
		whtScore=1+p(currentIndex+1, uptillMax, numbers[currentIndex]);
	skipScore=p(currentIndex+1, uptillMax, uptillMin);
	int ans=max(max(blckScore, whtScore), skipScore);
	//DP[currentIndex][uptillMax][uptillMin]=ans;
	return ans;
}

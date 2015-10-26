#include <iostream>
using namespace std;
int MaxCapacity, noOfBags;
int Weight[51],Value[51];
int DP[1001][51];
int P(int capacityLeft, int bagToConsider);
int main(){
	int instances;
	cin>>instances;
		while(instances--){
		cin>>MaxCapacity>>noOfBags;
		for(int i=0;i<=MaxCapacity+1;i++){
			for(int j=0;j<=noOfBags+1;j++){
				DP[i][j]=-1;
			}
		}
		for(int i=0;i<noOfBags;i++){
			cin>>Weight[i+1];
			cin>>Value[i+1];
		}
		cout<<"Hey stupid robber, you can get "<<P(MaxCapacity,1)<<".\n";
	}
	return 0;
}
int P(int capacityLeft, int bagToConsider){
	if(capacityLeft<=0)
		return 0;
	if(bagToConsider>noOfBags)
		return 0;
	if(DP[capacityLeft][bagToConsider]!=-1)
		return DP[capacityLeft][bagToConsider];
	int valueGain1=0, valueGain2=0;
	//Opt1
	if(capacityLeft>=Weight[bagToConsider])
		valueGain1=Value[bagToConsider]+P(capacityLeft-Weight[bagToConsider], bagToConsider+1);
	//Opt2
	valueGain2=P(capacityLeft, bagToConsider+1);
	int ans= max(valueGain1, valueGain2);
	DP[capacityLeft][bagToConsider]=ans;
	return ans;
}

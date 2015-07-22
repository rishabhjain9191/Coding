#include <iostream>
using namespace std;
int main(){
	int noOfDays;
	int prices[20];
	cin>>noOfDays;
	for(int i=0;i<noOfDays;i++){
		cin>>prices[i];
	}
	int noOfStock=0;
	int finalAmount=0;
	int p=0;

	for(int day=0;day<noOfDays-1;day++){
		if(noOfStock==0){
			if(prices[day+1]>=prices[day]){
				noOfStock=1;
				finalAmount-=prices[day];
			}
			else{
				p=prices[day];
			}
		}
		else{
			if(prices[day+1]<prices[day]){
				noOfStock=0;
				finalAmount+=prices[day];
			}
			else{
				p=prices[day+1];
			}
		}
	}
	if(noOfStock==1)
		finalAmount+=p;
	cout<<finalAmount<<"\n";
	return 0;
}
#include <iostream>
#include <string>
using namespace std;
int main(){
	int t;
	int noOfPlayer;
	string winners;
	cin>>t;
	while(t--){
		cin>>noOfPlayer>>winners;
		cout<<winners[winners.length()-1]<<"\n";
	}
	return 0;
}
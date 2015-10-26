#include <iostream>
using namespace std;
int main(){
	int input, count=0, noOfwindows=0;
	int n,T, c;
	cin>>n>>T>>c;
	for(int i=0;i<n;i++){
		cin>>input;
		if(input<=T){
			count++;
		}
		else{
			count=0;
		}
		if(count==c){
			noOfwindows++;
			count--;
		}
	}
	cout<<noOfwindows<<"\n";
	return 0;
}
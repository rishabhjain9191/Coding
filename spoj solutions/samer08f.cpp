#include <iostream>
using namespace std;
int main(){
	int input,ans;
	cin>>input;
	while(input!=0){
		ans=input*(input+1)*(2*input+1)/6;
		cout<<ans<<"\n";
		cin>>input;
	}
}
#include <iostream>
#include <stack>
using namespace std;
int n;
int truck[1001];
stack <int> myStack;
bool Ans(int lastTruckSeen, int index);
int main(){
	cin>>n;
	while(n!=0){
		for(int i=0;i<n;i++){
			cin>>truck[i];
		}
		if(Ans(0,0))
			cout<<"yes"<<"\n";
		else
			cout<<"no"<<"\n";
		while(!myStack.empty()){
			myStack.pop();
		}
		cin>>n;
	}
	return 0;
}
bool Ans(int lastTruckSeen, int index){
	//cout<<lastTruckSeen<<"\n";
	if(lastTruckSeen+1==n){
		return true;
	}
	if(!myStack.empty() && myStack.top()==lastTruckSeen+1){
		myStack.pop();
		return Ans(lastTruckSeen+1, index);
	}
	else{
		while(truck[index]!=lastTruckSeen+1 && index<n){
		myStack.push(truck[index]);
		index++;
		}
		if(index==n){
			return false;
		}
		//Truck Found !!
		else{
			return Ans(lastTruckSeen+1, index+1);
		}
	}
}


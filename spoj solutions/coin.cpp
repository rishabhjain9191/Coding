#include <iostream>
#include <map>

using namespace std;
typedef unsigned long long numbers;

map <numbers, numbers> results;
numbers calc(numbers);
int main(){
	int i;
	results[0]=0;

	numbers input;

		cin>>input;
		while(cin){
		cout<<calc(input)<<"\n";
		cin>>input;

		
	}
}
numbers calc(numbers input){
	//Found
	if(results.find(input)!=results.end()){
		return results[input];
	}
	else{
		numbers a=input/2;
		numbers b=input/3;
		numbers c=input/4;
		numbers ans= max(calc(a)+calc(b)+calc(c), input);
		results[input]=ans;
		return ans;
	}

}

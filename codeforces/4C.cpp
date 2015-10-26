#include <iostream>
#include <map>
#include <string>
using namespace std;
int main(){
	map<string, int> names;
	map<string, int>::iterator iter;
	int n;
	string input;
	cin>>n;
	for(int i=0;i<n;i++){
		cin>>input;
		iter=names.find(input);
		if(iter==names.end()){
			names[input]=0;
			cout<<"OK\n";
		}
		else{
			iter->second++;
			cout<<input<<iter->second<<"\n";
		}
	}
	return 0;
}
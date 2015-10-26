#include <iostream>
#include <cstdlib>
#include <vector>
using namespace std;
int main(){
	int n, input;
	vector<int> v;
	cin>>n;
	for(int i=0;i<n;i++){
		cin>>input;
		v.push_back(input);
	}
	int p1=0, temp;
	for(int i=0;i<n;i++){
		if(v[i]>n){
			temp=v[i];
			v[i]=v[p1];
			v[p1]=temp;
			p1++;
		}
		else if(v[i]<1){
			temp=abs(v[i]);
			v[i]=v[p1];
			v[p1]=temp;
			p1++;
		}
	}
	for(int i=p1;i<n;i++){
		v[abs(v[i])]=-abs(v[abs(v[i])]);
	}
	for(int i=1;i<n;i++){
		if(v[i]>0){
			cout<<i;
			//return i;
		}
	}
	cout<<n+1;
	return n+1;
	return 0;
}
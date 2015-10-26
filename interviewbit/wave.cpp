#include <iostream>
#include <vector>
using namespace std;
int main(){
	int n;
	cin>>n;
	vector<int > v;
	int input;
	for(int i=0;i<n;i++){
		cin>>input;
		v.push_back(input);
	}
	sort(v.begin(), v.end());
	vector<int> res;
	int c=n/2;
	c=c*2;
	int i;
	for(i=0;i<c;){
		res.push_back(v[i+1]);
		res.push_back(v[i]);
		i+=2;
	}
	cout<<i<<"\n";
	if(c<n){
		res.push_back(v[i]);
	}
	for(int i=0;i<res.size();i++){
		cout<<res[i]<<" ";
	}
	return 0;
}
#include <iostream>
#include <map>
#include <vector>
using namespace std;
int main(){
	map<int, int> counts;
	map<int, int>::iterator iter;
	vector<int> array;
	vector<int> lArray;
	int n, L, input, distinctValues=0;
	cin>>n>>L;
	for(int i=0;i<n;i++){
		cin>>input;
		array.push_back(input);
		iter=counts.find(input);
		if(iter==counts.end()){
			counts[input]=1;
			distinctValues++;
		}
		else{
			counts[input]++;
		}
	}
	lArray.push_back(distinctValues);
	int nc;
	for(int i=0;i<n-1;i++){
		//iter=counts.find(array[i]);
		//nc=iter->second--;
		nc=--counts[array[i]];
		if(nc<=0)
			lArray.push_back(lArray[i]-1);
		else
			lArray.push_back(lArray[i]);
	}
	int l;
	for(int i=0;i<L;i++){
		cin>>l;
		cout<<lArray[l-1]<<"\n";
	}
	return 0;
}
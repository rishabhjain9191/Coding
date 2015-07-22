#include <iostream>
#include <map>
using namespace std;

void getInput(int size, map<int, int> &inputMap);
int arrayDiff(map<int, int> &map1, map<int, int> &map2);

int main(){
	map<int, int> map1, map2, map3;
	int n;
	cin>>n;
	getInput(n,map1);
	getInput(n-1, map2);
	cout<<arrayDiff(map1, map2)<<"\n";
	getInput(n-2, map3);
	cout<<arrayDiff(map2, map3)<<"\n";
	return 0;
}
void getInput(int size, map<int, int> &inputMap){
		map<int, int>::iterator iter;
		int input;
		for(int i=0;i<size;i++){
		cin>>input;
		iter=inputMap.find(input);
		if(iter!=inputMap.end()){
			inputMap[input]++;
		}
		else{
			inputMap[input]=1;
		}

	}
}
int arrayDiff(map<int, int> &map1, map<int, int> &map2){
	map<int, int>::iterator iter2;
	for(map<int, int>::iterator iter1=map1.begin();iter1!=map1.end();iter1++){
		iter2=map2.find(iter1->first);
		if(iter2==map2.end())
			return iter1->first;
		if(iter2->second<iter1->second)
			return iter1->first;
	}
}
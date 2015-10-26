#include <iostream>
#include <vector>
#include <map>
#include <string>
using namespace std;
int main(){
	vector<string> initialValues(1000);
	map<string, int> recentValues;
	map<string, int>::iterator iter;
	int n,index;
	cin>>n;
	string p1,p2;
	int handles=0;
	for(int i=0;i<n;i++){
		cin>>p1>>p2;
		iter=recentValues.find(p1);
		if(iter==recentValues.end()){
			initialValues[handles]=p1;
			recentValues[p2]=handles;
			handles++;
		}
		else{
			index=iter->second;
			recentValues.erase(iter);
			recentValues[p2]=index;
		}
	}
	cout<<handles<<"\n";
	for(iter=recentValues.begin();iter!=recentValues.end();iter++){
		cout<<initialValues[iter->second]<<" "<<iter->first<<"\n";
	}
	return 0;
}
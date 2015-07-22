#include <iostream>
#include <algorithm>
using namespace std;

int a[100000001];

int main(){
	int count=0,n;
	int t=15;
	while(cin){
		cin>>n;
		a[count++]=n;
	}
	sort(a+0, a+count-1);
	a[count-1]=-2;
	int start=0;
	int prev=start;
	int end=1;
	while(end!=count){
		if(a[end]==a[prev]+1){
			end++;
			prev++;
		}
		else{
			cout<<"for (int i = "<<a[start]<<"; i <= "<<a[end-1]<<"; i++) cout << i << \" \";"<<"\n";
			start=end;
			prev=start;
			end++;
		}
	}
	return 0;
}
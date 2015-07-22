#include <iostream>
#include <vector>
#define MAX 100
using namespace std;
int main(){
	int n;
	cin>>n;
	int c=1;
	//cout<<"a";
	//Print the elements in spiral order
	int levels=n/2;
	vector<vector<int> > a;
	for(int i=0;i<n;i++){
		a[i].resize(n);
	}
	a.resize(n);
	int printed=0;
	vector<int> numbers;
	for(int i=0;i<=levels;i++){
		for(int j=i;j<n-i;j++){
			//cout<<a[i][j]<<" ";
			//numbers.push_back(a[i][j]);
			a[i][j]=c++;
		}
		for(int k=i+1;k<n-i;k++){
			//cout<<a[k][n-1-i]<<" ";
			//numbers.push_back(a[k][n-1-i]);
			a[k][n-1-i]=c++;
		}
		for(int l=n-2-i;l>=i;l--){
			//cout<<a[n-1-i][l]<<" ";
			numbers.push_back(a[n-1-i][l]);
			a[n-1-i][l]=c++;
		}
		for(int m=n-2-i;m>i;m--){
			//cout<<a[m][i]<<" ";
			numbers.push_back(a[m][i]);
			a[m][i]=c++;
		}
	}
	for(int i=0;i<n;i++){
		for(int j=0;j<n;j++){
			cout<<a[i][j]<<" ";
		}
	}
	//return res;
	return 0;
}
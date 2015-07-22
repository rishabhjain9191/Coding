#include <iostream>
#include <queue>
#define MAX 100
using namespace std;
int main(){
	int n;
	int a[MAX][MAX];
	cin>>n;
	for(int i=0;i<n;i++){
		for(int j=0;j<n;j++){
			cin>>a[i][j];
		}
	}
	int levels=n/2;
	for(int level=0;level<levels;level++){
		//cout<<"level="<<level<<"\n";
		//Create initial queue
		queue<int> q;
		for(int col=level;col<n-level-1;col++){
			q.push(a[level][col]);
		}
		for(int row=level;row<n-level;row++){
			//cout<<"("<<row<<", "<<n-1-level<<") ";
			q.push(a[row][n-1-level]);
			a[row][n-1-level]=q.front();
			q.pop();
		}
		for(int col=n-2-level;col>=level;col--){
			//cout<<"("<<n-1-level<<", "<<col<<") ";
			q.push(a[n-1-level][col]);
			a[n-1-level][col]=q.front();
			q.pop();
		}
		for(int row=n-2-level;row>=level;row--){
			//cout<<"("<<row<<", "<<level<<") ";
			q.push(a[row][level]);
			a[row][level]=q.front();
			q.pop();
		}
		for(int col=level+1;col<=n-2-level;col++){
			//cout<<"("<<level<<", "<<col<<") ";
			q.push(a[level][col]);
			a[level][col]=q.front();
			q.pop();
		}
	}
	cout<<"\n";
	for(int i=0;i<n;i++){
		for(int j=0;j<n;j++){
			cout<<a[i][j]<<" ";
		}
		cout<<"\n";
	}
	return 0;
}
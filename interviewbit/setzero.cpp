#include <iostream>
#include <vector>
using namespace std;
int main(){
	int n,m,input;
	cin>>n>>m;
	vector<vector<int> >matrix;
	matrix.resize(n+1);
	for(int i=0;i<n;i++){
		for(int j=0;j<m;j++){
			cin>>input;
			matrix[i].push_back(input);
		}
	}
	vector<bool> rows(n), cols(n);
	for(int i=0;i<n;i++){
		for(int j=0;j<m;j++){
			if(matrix[i][j]==0){
				rows[i]=true;
				cols[j]=true;
			}
		}
	}
	int r,c;
	for(int i=0;i<n;i++){
		if(rows[i]){
			for(int j=0;j<m;j++){
				matrix[i][j]=0;
			}
		}
	}
	for(int i=0;i<m;i++){
		if(cols[i]){
			for(int j=0;j<n;j++){
				matrix[j][i]=0;
			}
		}
	}
	for(int i=0;i<n;i++){
		for(int j=0;j<m;j++){
			cout<<matrix[i][j]<<" ";
		}
		cout<<"\n";
	}
	return 0;
}

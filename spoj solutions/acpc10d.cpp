#include <iostream>
using namespace std;
int Graph[100000][3];
int DP[100000][3];
int n;
int sp(int i, int j);
int main(){
	int i,j,t; 
	t=0;
	cin>>n;
	while(n!=0){
		t++;
		for(i=0;i<n;i++){
			for(j=0;j<3;j++){
				cin>>Graph[i][j];
				DP[i][j]=-1000;
			}
		}
		cout<<t<<". "<<Graph[0][1]+sp(0,1)<<"\n";
		cin>>n;
	}
	return 0;
}
int sp(int i, int j){
	if(i>=n){
		return 0;
	}
	if(i==n-1){
		if(j==2)
			return 10000;
		if(j==1)
			return 0;
		if(j==0)
			return Graph[i][1];
	}
	if(DP[i][j]!=-1000){
		return DP[i][j];
	}
	int c1,c2,c3,c4;
	if(j==1){
		c1=Graph[i][j+1]+sp(i,j+1);
		c2=Graph[i+1][j+1]+sp(i+1,j+1);
		c3=Graph[i+1][j]+sp(i+1,j);
		c4=Graph[i+1][j-1]+sp(i+1,j-1);
		DP[i][j]=min(min(c1,c2),min(c3,c4));
		return DP[i][j];
	}
	else if(j==0){
		c1=Graph[i][j+1]+sp(i,j+1);
		c2=Graph[i+1][j+1]+sp(i+1,j+1);
		c3=Graph[i+1][j]+sp(i+1,j);
		DP[i][j]=min(c1,min(c2,c3));
		return DP[i][j];
	}
	else{
		c3=Graph[i+1][j]+sp(i+1,j);
		c4=Graph[i+1][j-1]+sp(i+1,j-1);
		DP[i][j]=min(c3,c4);
		return DP[i][j];
	}
}
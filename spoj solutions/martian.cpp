#include <iostream>
using namespace std;
int row, column;
int B[501][501];
int B_sum[501][501];

int Y[501][501];
int Y_sum[501][501];

int dp[501][501];

int P(int row, int column);
int main(){
	int i,j;	
	cin>>row>>column;
	for(i=0;i<=row;i++){
		Y_sum[i][0]=0;
	}
	for(i=0;i<=column;i++){
		B_sum[0][i]=0;
	}
	while(row!=0&&column!=0){
		for(i=1;i<=row;i++){
			for(j=1;j<=column;j++){
				cin>>Y[i][j];
				Y_sum[i][j]=Y_sum[i][j-1]+Y[i][j];
				dp[i][j]=-1;
			}
		}
		for(i=1;i<=row;i++){
			for(j=1;j<=column;j++){
				cin>>B[i][j];
				B_sum[i][j]=B_sum[i-1][j]+B[i][j];
			}
		}
		cout<<P(row, column)<<"\n";
		cin>>row>>column;
	}
}
int P(int row, int column){
	if(dp[row][column]!=-1)
		return dp[row][column];
	if(row<1)
		return 0;
	if(column<1)
		return 0;
	if(row==1&&column==1)
		return max(B[row][column],Y[row][column]);
	dp[row][column]= max(Y_sum[row][column]+P(row-1,column),B_sum[row][column]+P(row,column-1));
	return dp[row][column];
}
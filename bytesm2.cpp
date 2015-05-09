#include <iostream>
#include <string.h>
using namespace std;
int Room[101][101];
int DP[101][101];
int h, w;
int maxStones(int row, int column);
int main(){
	int t, i,j;
	int maxi, startingColumn;
	cin>>t;
	while(t--){
		memset(DP, -1, sizeof DP);
		cin>>h>>w;
		for(i=0;i<h;i++){
			for(j=0;j<w;j++){
				cin>>Room[i][j];
			}
		}
		maxi=0;
		for(startingColumn=0;startingColumn<w;startingColumn++){
			maxi=max(maxi, maxStones(0,startingColumn));
		}
		cout<<maxi<<"\n";
	}
}
int maxStones(int row, int column){
	if(row>=h)
		return 0;
	if(column>=w||column<0)
		return 0;
	if(DP[row][column]!=-1)
		return DP[row][column];
	int ans= Room[row][column]+max(max(maxStones(row+1, column), maxStones(row+1,column+1)),maxStones(row+1,column-1));
	DP[row][column]=ans;
	return ans;
}
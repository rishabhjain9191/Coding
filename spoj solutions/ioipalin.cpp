#include <iostream>
#include <string>
using namespace std;
int main(){
	int N;
	static int DP[5001][5001];
	//make diagonal elements 0
	char str[5001];
	int i,j;
	cin>>N;
	j=N-1;
	memset(DP, 0, sizeof DP);
	
	cin>>str;
	//calcular the DP matrix
	int startingColumn,k;
	for(startingColumn=N-2; startingColumn>=0;startingColumn--){
		k=N-1;
		for(i=0;i<=startingColumn;i++){
			//for(j=startingColumn;j>=0;j--){
				j=startingColumn-i;
				//k=N-1;
				//cout<<j<<"-"<<k<<"\n";
				if(str[j]!=str[k--]){
					DP[i][j]=1+min(DP[i+1][j], DP[i][j+1]);
				}
				else{
					DP[i][j]=DP[i+1][j+1];
				}
			//}
		}
	}
	
	cout<<DP[0][0]<<"\n";
}
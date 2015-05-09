#include <iostream>
#include <string.h>
using namespace std;
int main(){
	int N;
	static int DP[1002][1002];
	int ary[27];
	//make diagonal elements 0
	char str[1002];
	int i,j,t;
	cin>>t;
	while(t--){
	cin>>str;
	for(i=0;i<27;i++){
		ary[i]=0;
	}
	for(i=0;i<strlen(str);i++){
		ary[str[i]-97]++;
	}
	char str2[1002];
	int len=0;
	for(i=0;i<27;i++){
		if(ary[i]>0){
			if(ary[i]%2==1){
				str2[len]=i+97;
				len++;
			}
		}
	}
	str2[len]='\0';
	//cout<<"\n"<<str2<<"\n";

	//str=str2[0];
	N=strlen(str2);
	j=N-1;
	memset(DP, 0, sizeof DP);
	
	//cin>>str;
	//calcular the DP matrix
	int startingColumn,k;
	for(startingColumn=N-2; startingColumn>=0;startingColumn--){
		k=N-1;
		for(i=0;i<=startingColumn;i++){
			//for(j=startingColumn;j>=0;j--){
				j=startingColumn-i;
				//k=N-1;
				//cout<<j<<"-"<<k<<"\n";
				if(str2[j]!=str2[k--]){
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
}
#include <iostream>
#include <string>
using namespace std;
int mymin(int a, int b, int c){
	return min(min(a,b),c);
}
int main(){
	string str1,str2;
	
	int i,j;
	int Ci=1;
	int Cd=1;
	int Cr=1;
	int T, t;
	cin>>T;
	for(t=0;t<T;t++){
	cin>>str1>>str2;
	int len1=str1.length();
	int len2=str2.length();
	int M[len1+2][len2+2];
	//Initialization
	for(i=0;i<len1+2;i++){
		M[i][len2+1]=1000;
	}
	for(j=0;j<len2+2;j++){
		M[len1+1][j]=1000;
	}

	for(i=len1;i>=0;i--){
		for(j=len2;j>=0;j--){
			if(str1.substr(i,string::npos).compare(str2.substr(j,string::npos))==0){
				M[i][j]=0;
			}
			else{
				if(str1[i]==str2[j]){
					//In that case, Replacement cost=0
					M[i][j]=mymin(M[i+1][j]+Ci, M[i][j+1]+Cd, M[i+1][j+1]+0);
				}
				else{
					M[i][j]=mymin(M[i+1][j]+Ci, M[i][j+1]+Cd, M[i+1][j+1]+Cr);
				}
			}
		}
	}


	cout<<M[0][0]<<"\n";
}
	
}
#include <iostream>
#include <string>
using namespace std;
int max3(int a, int b, int c){
	int result;
	if(a>=b){
		result=a;
	}
	else{
		result=b;
	}
	if(c>=result){
		result=c;
	}
	return result;

}
int main(){
	string str1, str2;
	cin>>str1>>str2;
	int l1=str1.length();
	int l2=str2.length();
	int LCS[l2+1][l1+1];
	int i,j;
	for(i=0;i<=l2;i++){
		LCS[i][l1]=0;
	}
	for(j=0;j<=l1;j++){
		LCS[l2][j]=0;
	}
	for(i=l2-1;i>=0;i--){
		for(j=l1-1;j>=0;j--){
			if(str1.at(j)==str2.at(i)&&(str1.at(j)!='\n')){
				LCS[i][j]=max3(LCS[i][j+1], LCS[i+1][j], 1+LCS[i+1][j+1]);
			}
			else{
				LCS[i][j]=max3(LCS[i][j+1], LCS[i+1][j], LCS[i+1][j+1]);
			}
		}
	}
	
	cout<<LCS[0][0]<<"\n";
	int abc=2<<29;
	cout<<"\n"<<abc;

}
#include <iostream>
#include <string>
#include <cstring>
using namespace std;
string str;
int len;
int intValue(int s, int e);
unsigned long P(int s, int e);
unsigned long dp[5002];
bool calculated[5002];
int main(){
	cin>>str;
	while(str[0]!='0'){
		len=str.size();
		// for(int i=0;i<=len;i++)
		// 	calculated[i]=false;
		memset(calculated, false, sizeof calculated);
		cout<<P(0,0)<<"\n";
		cin>>str;
	}
	return 0;
}
unsigned long P(int s, int e){
	//cout<<s<<", "<<e<<"\n";
	int iVal=intValue(s, e);
	//cout<<iVal<<"\n";
	if(e>=len-1){
		if(iVal<=26 && iVal>0)
			return 1;
		else
			return 0;
	}
	if(calculated[s]){
		//cout<<dp[s]<<"\n";
		return dp[s];
	}
	if(iVal<=26 && iVal>0){
		unsigned long res =  P(e+1, e+1)+P(s, e+1);
		calculated[s]=true;
		dp[s]=res;
		return res;
	}
	else{
		return 0;
	}
}
int intValue(int s, int e){
	int res=0;
	if(str[s]==0)
		return 0;
	for(int i=s;i<=e;i++){
		res=(res*10)+(str[i]-'0');
	}
	//cout<<res<<"\n";
	return res;
}

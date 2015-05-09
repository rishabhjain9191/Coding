#include <iostream>
using namespace std;
typedef struct{
int fun;
int money;
}party;
party Party[100];
party dp[101][501];
bool canGoToParty(int i, int moneyLeft);
int P(int partyNo, int moneyLeft, int *moneySpent);

int noOfParties, money;
int main(){
	cin>>money>>noOfParties;
	int i,moneySpent=0,maxFun,j;
	while(noOfParties!=0&&money!=0){
	for(i=0;i<noOfParties;i++){
		cin>>Party[i].money>>Party[i].fun;
	}
	for(i=0;i<=noOfParties;i++){
		for(j=0;j<=money;j++){
			dp[i][j].fun=-1;
			dp[i][j].money=-1;
		}
	}
	maxFun=P(0,money,&moneySpent);
	//cout<<maxFun<<" "<<moneySpent<<"\n";
	cout<<moneySpent<<" "<<maxFun<<"\n";
	cin>>money>>noOfParties;
	moneySpent=0;
}
}

int P(int i, int moneyLeft, int *moneySpent){
	//cout<<"Party No : "<<i<<", Money Left : "<<moneyLeft<<"\n";
	if(moneyLeft<=0){
		return 0;
	}
	if(i>=noOfParties){
		return 0;
	}
	if(dp[i][moneyLeft].fun!=-1&&*moneySpent!=0){
		*moneySpent+=dp[i][moneyLeft].money;
		return dp[i][moneyLeft].fun;
	}
	int opt1, opt2, ms1=0,ms2=0;
	if(canGoToParty(i, moneyLeft)){
		//Go to party i
		ms1=Party[i].money;
		opt1=Party[i].fun+P(i+1, moneyLeft-Party[i].money,&ms1);
		
		ms2=0;
		opt2=P(i+1, moneyLeft,&ms2);

		if(opt1>opt2){
			*moneySpent+=ms1;
			dp[i][moneyLeft].money=*moneySpent;
			dp[i][moneyLeft].fun=opt1;
			return opt1;
		}
		else if(opt2>opt1){
			*moneySpent+=ms2;
			dp[i][moneyLeft].money=*moneySpent;
			dp[i][moneyLeft].fun=opt2;
			return opt2;
		}
		else{
			*moneySpent+=min(ms1,ms2);		
			dp[i][moneyLeft].money=*moneySpent;
			dp[i][moneyLeft].fun=opt1;
			return opt1;
		}

		
	}
	else{
		ms2=0;
		opt2=P(i+1, moneyLeft,&ms2);
		*moneySpent+=ms2;
		dp[i][moneyLeft].money=*moneySpent;
		dp[i][moneyLeft].fun=opt2;
		return opt2;

	}
}

bool canGoToParty(int i, int moneyLeft){
	if(moneyLeft>=Party[i].money){
		return true;
	}
	return false;
}

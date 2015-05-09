#include <iostream>
#include <string.h>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;
/*
typedef struct{
	int cost;
	int power;
}Weapon;

class BatchPower{
public:
	BatchPower(int b, int cost[], int  power[]){
		int i;
		this->weaponTypes=b;
		for(i=0;i<weaponTypes;i++){
			W[i].cost=cost[i];

			W[i].power=power[i];
		}
	}
	int weaponTypes;
	Weapon W[21];
	int maximizePower(int availableMoney);
	map <int, int> StoredPowers;

private:
	bool canBuyWeapon(int weapon, int money);
	int maximizeArray(vector<int> powers);

};
*/
int maximizePower(int availableMoney, int);
bool canBuyWeapon(int, int weapon, int money);
int noOfBatches, weaponTypes, availableMoney;
int DP[21][1001];
int StoredPowers[21][1001];
int sealCost[21];
int costs[21][21];
int powers[21][21];
int startfrom(int batchno, int money);
int InvestInBatch(int batchno, int money);
int main(){
	int i,j;
	
	int t;
	cin>>t;
	while(t--){
	cin>>noOfBatches>>weaponTypes>>availableMoney;
	//memset(sealCost, 1000, sizeof sealCost);
	for(i=0;i<20;i++){sealCost[i]=1000;}
	memset(DP, -1, sizeof DP);
	memset(StoredPowers, -1, sizeof StoredPowers);
	for(i=0;i<noOfBatches;i++){
		cin>>sealCost[i];
	}
	for(i=0;i<noOfBatches;i++){
		for(j=0;j<weaponTypes;j++){
			cin>>costs[i][j];
		}
	}
	for(i=0;i<noOfBatches;i++){
		for(j=0;j<weaponTypes;j++){
			cin>>powers[i][j];
		}
	}

	
	int maxi=0;
	for(i=0;i<noOfBatches;i++){
		maxi=max(maxi, startfrom(i, availableMoney-sealCost[i]));
	}
	cout<<maxi<<"\n";
}
	//cout<<myBatch->maximizePower(availableMoney);
	return 0;
}
int startfrom(int batchno, int money){
	if(batchno>=noOfBatches){return 0;}
	if(money<=0){return 0;}
	if(DP[batchno][money]!=-1){return DP[batchno][money];}
	int i, maxi=0;
	for(i=1;i<=money;i++){
		maxi=max(maxi, max(InvestInBatch(batchno, i), startfrom(batchno+1, money-i-sealCost[batchno+1])));
	}
	DP[batchno][money]=maxi;
	return maxi;
}
int InvestInBatch(int batchno, int money){
	if(batchno<noOfBatches)
		{
		int a=maximizePower(batchno, money);
		return a;
		}	
	return 0;
}
int maximizePower(int batchno, int availableMoney){
	if(StoredPowers[batchno][availableMoney]!=-1){
		return StoredPowers[batchno][availableMoney];
	}
	else{
		int i, maxi=0;
		for(i=0;i<weaponTypes;i++){
			if(canBuyWeapon(batchno, i, availableMoney)){
				maxi=max(maxi, powers[batchno][i]+maximizePower(batchno, availableMoney-costs[batchno][i]));
			}
		}
		StoredPowers[batchno][availableMoney]=maxi;
		return maxi;
}
}
bool canBuyWeapon(int batchno, int weapon, int money){
	if(money>=costs[batchno][weapon]){
		return true;
	}
	return false;
}

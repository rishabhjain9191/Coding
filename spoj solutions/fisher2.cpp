#include <iostream>
#define MAX 50
#define INF 999999
using namespace std;

int Toll[MAX][MAX];
int Time[MAX][MAX];
bool visited[MAX];
int minMoney, totalTime;

int states, availableTime;
int P(int state, int timeSpent, int moneySpent);
int main(){
	cin>>states>>availableTime;
	while(states!=0){
		for(int i=0;i<states;i++){
			for(int j=0;j<states;j++){
				cin>>Time[i][j];
			}
		}
		for(int i=0;i<states;i++){
			visited[i]=false;
			for(int j=0;j<states;j++){
				cin>>Toll[i][j];
			}
		}
	
		minMoney=INF;

		P(0, 0, 0);
		cout<<minMoney<<" "<<totalTime<<"\n";
		cin>>states>>availableTime;
	}
	return 0;
}
int P(int state, int timeSpent, int moneySpent){
	//cout<<"State : "<<state<<"\n";
	if(moneySpent>minMoney)
		return INF;
	if(timeSpent>availableTime)
		return INF;
	if(state==states-1){
		if(moneySpent<minMoney){
			minMoney=moneySpent;
			totalTime=timeSpent;
		}
		else if(moneySpent==minMoney){
			totalTime=min(totalTime, timeSpent);
		}
		return 0;
	}
	int mini=INF, res;
	visited[state]=true;
	for(int i=0;i<states;i++){
		int tl=0;
		if(!visited[i]){
			/*res=Toll[state][i]+P(i, timeLeft-Time[state][i], &tl);
			if(res<mini){
				mini=res;
				*timeSpent=tl;
			}*/
			P(i, timeSpent+Time[state][i], moneySpent+Toll[state][i]);
		}
	}
	//cout<<"Time Spent : "<<*timeSpent<<"\n";
	visited[state]=false;
	return mini;
}

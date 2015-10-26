#include <iostream>
#define MAX 50
#define INF 999999
using namespace std;

int Toll[MAX][MAX];
int Time[MAX][MAX];
bool visited[MAX];
int Money[MAX];
int TimeReq[MAX];

int states, availableTime;
int P(int state, int timeLeft, int *);
int Q(int state, int *ts);
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
			Money[i]=-1;
			TimeReq[i]=-1;
			for(int j=0;j<states;j++){
				cin>>Toll[i][j];
			}
		}
	
		int timeSpent=0;
		/*cout<<P(0, availableTime, &timeSpent)<<" ";
		cout<<availableTime-timeSpent<<"\n";*/
		Q(0,&timeSpent);
		for(int i=0;i<states;i++){
			cout<<Money[i]<<" ";
		}
		cout<<"\n";
		for(int i=0;i<states;i++){
			cout<<TimeReq[i]<<" ";
		}
		cin>>states>>availableTime;
	}
	return 0;
}
int P(int state, int timeLeft, int *timeSpent){
	cout<<"State : "<<state<<"\n";
	if(timeLeft<0)
		return INF;
	if(state==states-1){
		*timeSpent=timeLeft;
		return 0;
	}
	int mini=INF, res;
	visited[state]=true;
	for(int i=0;i<states;i++){
		int tl=0;
		if(!visited[i]){
			res=Toll[state][i]+P(i, timeLeft-Time[state][i], &tl);
			if(res<mini){
				mini=res;
				*timeSpent=tl;
			}
		}
	}
	cout<<"Time Spent : "<<*timeSpent<<"\n";
	visited[state]=false;
	return mini;
}

int Q(int state, int *ts){
	if(state==states-1){
		Money[state]=0;
		TimeReq[state]=0;
		return 0;
	}
	else if(Money[state]!=-1){
		*ts=TimeReq[state];
		return Money[state];
	}
	else{
		visited[state]=true;
		int mini=INF;
		int tl=0;
		for(int i=0;i<states;i++){
			int t=0;
			if(!visited[i]){
				int ans=Q(i, &t);
				cout<<ans<<"\n";
				mini=min(mini, ans+Toll[state][i]);
				tl=t+Time[state][i];
			}
		}
		visited[state]=false;
		Money[state]=mini;
		TimeReq[state]=tl;
		return mini;
	}
}
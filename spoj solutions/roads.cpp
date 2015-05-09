#include <iostream>
#include <map>
using namespace std;
typedef struct Road{
	int destination;
	int length;
	int toll;
	bool visited;
	Road *next;
};
const int INF = 0x3f3f3f3f;
std::map<int, Road *> paths;
int coins, cities, roads;
int dp[101][10002];
void insertRoad(int s, int d, int l, int t);
int P(int currentState, int moneyLeft);
int main(){
	int T,i,k;
	int s,d,l,t;
	int mini;
	Road *j;
	Road *r=NULL;
	cin>>T;
	while(T--){
		cin>>coins>>cities>>roads;
		for(i=1;i<=cities;i++){
			//paths.insert(i, r);
			paths[i]=r;
		}
		for(i=0;i<=cities;i++){
			for(k=0;k<=coins;k++){
				dp[i][k]=-1;
				//visited[i][k]=false;
			}
		}
		// Store the paths
		for(i=0;i<roads;i++){
			cin>>s>>d>>l>>t;
			insertRoad(s, d, l, t);
		}
		//display the paths
		j=paths[1];
		//i=1;
		for(i=1;i<=cities;i++){
			j=paths[i];
			cout<<i<<" : ";
		while(j!=NULL){
			cout<<j->destination<<"->";//<<", "<<j->length<<", "<<j->toll<<"->";
			j=j->next;
		}
		cout<<"\n\n";
	}
		//end display
		//storing complete
		//Calculate the result
		mini=INF;
		j=paths[1];
		while(j!=NULL){
			//visit the road
			j->visited=true;
			if(j->destination!=1)
			mini=min(mini, P(j->destination, coins-j->toll)+j->length);
			j=j->next;
		}
		(mini==INF)?mini=-1:mini=mini;
		//End calculation

		//Display result
		cout<<mini<<"\n";
		
	}
	return 0;
}
int P(int currentState, int moneyLeft){
	if(moneyLeft<0){
		dp[currentState][moneyLeft]=INF;
		return INF;
	}
	if(currentState>=cities){
		dp[currentState][moneyLeft]=0;
		return 0;
	}

	/*if(dp[currentState][moneyLeft]!=-1)
		return dp[currentState][moneyLeft];
	*/
	else{
		int mini=INF;
		//visited[currentState][moneyLeft]=true;
		Road *j=paths[currentState];
		while(j!=NULL){
			if(j->visited){
				mini=INF;
			}
			else{
				j->visited=true;
				if(j->destination!=currentState)
				mini=min(mini, P(j->destination, moneyLeft-j->toll)+j->length);
			}	
			j=j->next;
		}
		dp[currentState][moneyLeft]=mini;
		return mini;
	}

}
void insertRoad(int s, int d, int l, int t){
	Road *r=new Road();
	r->destination=d;
	r->length=l;
	r->toll=t;
	r->next=paths[s];
	r->visited=false;
	paths[s]=r;
}
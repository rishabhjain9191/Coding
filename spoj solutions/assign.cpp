#include <iostream>
#include <cstdio>

#define MAX_SPACE INT_MAX
using namespace std;
bool pref[21][21];
int dp[21][10000];
int N;
int waysPossible(int student, int subjectsAssigned);
int main(){
	int t;
	scanf("%d", &t);
	while(t--){
		scanf("%d", &N);
		for(int i=0;i<N;i++){
			for(int j=0;j<N;j++){
				//scanf("%d", &pref[i][j]);
				cin>>pref[i][j];
			}
		}
		bool subjectsAssigned[21];
		for(int i=0;i<N;i++){
			for(int j=0;j<10000;j++){
				dp[i][j]=-1;
			}
		}
		printf("%d\n", waysPossible(0, 0));
	}
	return 0;
}
int waysPossible(int student, int subjectsAssigned){
	//cout<<"Student : "<<student<<"\n";
	if(student>=N){
		return 1;
	}
	if(dp[student][subjectsAssigned]!=-1){
		return dp[student][subjectsAssigned];
	}
	else{
		int noOfWays=0;
		int isSubjectAssigned;
		for(int i=0;i<N;i++){
			int isSubjectAssigned=(subjectsAssigned & (1<<i))>>(i);
			//cout<<"Subect : "<<i<<" assigned : "<<isSubjectAssigned<<"\n";
			if(pref[student][i] && !isSubjectAssigned){
				//subjectsAssigned[i]=true;
				subjectsAssigned = subjectsAssigned | (1<<i);
 				noOfWays+=waysPossible(student+1, subjectsAssigned);
				//subjectsAssigned[i]=false;
				subjectsAssigned&=~(1<<(i));
			}
		}
		dp[student][subjectsAssigned]=noOfWays;
		return noOfWays;
	}
}

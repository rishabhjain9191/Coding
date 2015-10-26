#include <iostream>
#include <cstdio>

#define MAX_SPACE INT_MAX
using namespace std;
typedef unsigned long long ULL;
bool pref[21][21];
ULL dp[1<<20];
int N;

ULL waysPossible(int subjectsAssigned);
int countBits(int n);

int main(){
	int t;
	scanf("%d", &t);
	while(t--){
		scanf("%d", &N);
		for(int i=0;i<N;i++){
			for(int j=0;j<N;j++){
				cin>>pref[i][j];
			}
		}
		bool subjectsAssigned[21];
		for(int i=0;i<(1<<20);i++){
			dp[i]=-1;
		}
		printf("%llu\n", waysPossible(0));
	}
	return 0;
}
ULL waysPossible(int subjectsAssigned){
	int studentConsideredSoFar=countBits(subjectsAssigned);
	if(studentConsideredSoFar>=N){
		if(subjectsAssigned!=(1<<N)-1) return 0;
		return 1;
	}
	if(dp[subjectsAssigned]!=-1){
		return dp[subjectsAssigned];
	}
	else{
		ULL noOfWays=0;
		int isSubjectAssigned;
		for(int i=0;i<N;i++){
			int isSubjectAssigned=(subjectsAssigned & (1<<i))>>(i);
			if(pref[studentConsideredSoFar][i] && !isSubjectAssigned){
				subjectsAssigned = subjectsAssigned | (1<<i);
 				noOfWays+=waysPossible(subjectsAssigned);
				subjectsAssigned&=~(1<<(i));
			}
		}
		dp[subjectsAssigned]=noOfWays;
		return noOfWays;
	}
}
int countBits(int n){
	int res=0;
	while(n){
		res+=n & 1;
		n=n>>1;
	}
	return res;
}
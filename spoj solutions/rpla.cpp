#include <iostream>
#include <vector>
using namespace std;
#define MAX 1002
vector<int> *Tree;
vector<int> *rankTable;
int n,r;
int ranks[MAX];
void getAllRanks();
int Rank(int p);

int main(){
	int t, i, r1, r2, t1=0, j;
	scanf("%d", &t);
	while(t--){
		t1++;
		scanf("%d %d", &n, &r);
		Tree=new vector<int>[n+1];
		rankTable=new vector<int>[n+1];
		for(i=0;i<=n;i++){
			ranks[i]=-1;
		}
		for(i=0;i<r;i++){
			scanf("%d %d", &r1, &r2);
			Tree[r1].push_back(r2);
		}
		//PRINT RESULT
		getAllRanks();
		printf("Scenario #%d:\n", t1);
		for(i=0;i<=n;i++){
			if(rankTable[i].size()>0){
				for(j=0;j<rankTable[i].size();j++){
					printf("%d %d\n", i, rankTable[i][j]);
				}
			}
		}
		delete[] Tree;
		delete[] rankTable;
	}
	return 0;
}
void getAllRanks(){
	for(int i=0;i<n;i++){
		rankTable[Rank(i)].push_back(i);
	}
}
int Rank(int p){
	if(ranks[p]!=-1)
		return ranks[p];
	int maxi=1;
	for(int i=0;i<Tree[p].size();i++){
		maxi=max(maxi, 1+Rank(Tree[p][i]));
	}
	return maxi;
}
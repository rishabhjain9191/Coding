#include <iostream>
#include <cstdio>
#include <vector>
#include <cstdlib>

#define INF 9999999
using namespace std;
typedef vector< pair<int, int> > PA;
int main(){
	int t, n, m, mini;
	char input;
	scanf("%d", &t);
	while(t--){
		PA p;
		scanf("%d %d\n", &n, &m);
		for(int i=1;i<=n;i++){
			for(int j=1;j<=m;j++){
				scanf("%c", &input);
				if(input=='1')
					p.push_back(make_pair(i, j));
			}
			scanf("%c", &input);
		}
		for(int i=1;i<=n;i++){
			for(int j=1;j<=m;j++){
				mini=INF;
				for(int k=0;k<p.size();k++){
					mini=min(mini, abs(i-p[k].first)+abs(j-p[k].second))	;
				}
				printf("%d ", mini);				
			}
			printf("\n");
		}
	}
}

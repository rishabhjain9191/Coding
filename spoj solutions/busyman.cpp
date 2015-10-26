#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>

using namespace std;
vector<pair<int, int> > intervals;
int calculate();
bool func(const pair<int, int> p1, const pair<int, int> p2){return p1.second<p2.second;}
int main(){
	int t, n, i;
	int u,v;
	scanf("%d", &t);
	while(t--){
		scanf("%d", &n);
		for(i=0;i<n;i++){
			scanf("%d %d", &u, &v);
			intervals.push_back(make_pair(u, v));
		}
		sort(intervals.begin(), intervals.end(), func);
		printf("%d\n", calculate());
		intervals.clear();
	}
}
int calculate(){
	int maxi=0;
	int last=0;
	for(int i=0;i<intervals.size();i++){
		if(intervals[i].first>=last){
			maxi++;
			last=intervals[i].second;
		}
	}
	return maxi;
}
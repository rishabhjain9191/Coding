#include <iostream>
#include <string.h>
using namespace std;
typedef struct{
	int w;
	int h;
}plate;
int findOptimalCut(int w, int h);
int DP[601][601];
plate plates[10];
int n, W,H;
int main(){
	int i,w,h,t;
	cin>>t;
	while(t--){
	memset(DP, -1, sizeof DP);
	cin>>W>>H;
	cin>>n;
	for(i=0;i<n;i++){
		cin>>w;
		cin>>h;
		plates[i].w=w;
		plates[i].h=h;
		DP[w][h]=0;
	}
	cout<<findOptimalCut(W,H)<<"\n";
}
}
int findOptimalCut(int w, int h){
	if(DP[w][h]!=-1){
		return DP[w][h];
	}
	int areaWasted=w*h;
	int i;
	//cut horizontally
	for(i=0;i<n;i++){
		if(plates[i].h<h){
			areaWasted=min(areaWasted, findOptimalCut(w,plates[i].h)+findOptimalCut(w, h-plates[i].h));
		}
	}
	//cut vertically
	for(i=0;i<n;i++){
		if(plates[i].w<w){
			areaWasted=min(areaWasted, findOptimalCut(plates[i].w,h)+findOptimalCut(w-plates[i].w,h));
		}
	}
	DP[w][h]=areaWasted;
	return areaWasted;
}

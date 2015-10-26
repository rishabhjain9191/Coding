#include <iostream>
#include <cstdio>
using namespace std;

#define MAXN 100002
#define INF 99999999

int query(int node, int tl, int tr, int l, int r);
void buildTree(int node, int l, int r);
int mymax(int a, int b);
int mymin(int a, int b);

int a[MAXN];
int t[4*MAXN+4];
int main(){
	int n;
	int m,x,y;
	cin>>n;
	for(int i=0;i<n;i++){
		scanf("%d", &a[i]);
	}
	buildTree(1, 0, n-1);
	
	cin>>m;
	for(int i=0;i<m;i++){
		scanf("%d%d", &x, &y);
		printf("%d\n",query(1, 0, n-1, x, y));
	}
}
int query(int node, int tl, int tr, int l, int r){
	if(l>r){
		return INF;
	}
	if(tl==l && tr==r){
		return t[node];
	}
	else{
		int tm=(tl+tr)/2;
		return mymin(query(node*2, tl, tm, l, mymin(r,tm)), query(node*2+1, tm+1, tr, mymax(tm+1, l), r));
	}
}
void buildTree(int node, int l, int r){
	if(l==r){
		t[node]=a[l];
	}
	else{
		int tm=(l+r)/2;
		buildTree(node*2, l, tm);
		buildTree(node*2+1, tm+1, r);
		t[node]=mymin(t[node*2],t[node*2+1]);
	}
}
int mymax(int a, int b){
	if(a>b)
		return a;
	return b;
}
int mymin(int a, int b){
	if(a<b)
		return a;
	return b;
}
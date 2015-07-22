#include <iostream>
#include <cstdio>

#define MAXN 50001
#define INF 15008
using namespace std;

typedef struct Node{
	int ans, sum, u, v;
};

void buildTree(int v, int l, int r);
Node combine(Node lc, Node rc);
Node query(int node, int l, int r, int x, int y);

int a[MAXN];
Node t[4*MAXN];

Node minAns;

int main(){
	int m, n, x, y;
	minAns.ans=-INF;

	cin>>n;
	for(int i=1;i<=n;i++){
		scanf("%d", &a[i]);
	}
	buildTree(1, 1, n);
	cin>>m;
	for(int i=0;i<m;i++){
		scanf("%d%d", &x, &y);
		printf("%d\n", query(1, 1, n, x, y).ans);
	}
	return 0;
}
void buildTree(int v, int l, int r){
	if(l==r){
		t[v].ans=t[v].sum=t[v].u=t[v].v=a[l];
	}
	else{
		int tm=(l+r)/2;
		buildTree(v*2, l, tm);
		buildTree(v*2+1, tm+1, r);
		t[v]=combine(t[v*2], t[v*2+1]);
	}
}
Node combine(Node lc, Node rc){
	Node newNode;
	newNode.sum=lc.sum+rc.sum;
	newNode.u=max(lc.u, rc.u+lc.sum);
	newNode.v=max(rc.v, lc.v+rc.sum);
	newNode.ans=max(max(lc.ans, rc.ans), lc.v+rc.u);
	return newNode;
}
Node query(int node, int l, int r, int x, int y){
	if(x==l&&y==r)
		return t[node];
	int m=(l+r)/2;
	if(y<=m)
		return query(node*2, l, m, x, y);
	if(x>m)
		return query(node*2+1, m+1, r, x, y);
	return combine(query(node*2, l, m, x, m), query(node*2+1, m+1, r, m+1, y));
}
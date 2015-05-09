#include <cstdio>
#include <iostream>
#include <vector>
#define N 101
using namespace std;
int min(int a,int b){
  if(a<b) 
		return a;
	else 
		return b;
}
 
int Visited[100000+1]={0};
int min0[100000+1]={0};
int min1[100000+1]={0};
vector<int> *AL;
 
int fn(int v)
{
	int i,j,r0,r1;
	vector <int> & k = AL[v];
	r0=0;
	r1=1;
	Visited[v] = 1;
	for(i=0;i<k.size();i++)
	{
			j = k[i];
			if(Visited[j]==0) 
				fn(j);		
			r0=r0+min1[j];
			r1=r1+min(min0[j],min1[j]);			
	}
	min1[v] = r1;
	min0[v] = r0;	
}
 
int main()
{
	int n,a,b;
	scanf("%d", &n);
	AL = new vector<int>[n+1];
	for(int i=0;i<n-1;i++)
	{
		scanf("%d%d", &a,&b);
		AL[a].push_back(b);
		AL[b].push_back(a);
	}	
	fn(1);
//	for(int i=1;i<=n;i++)
//		printf("%d %d\n", min1[i],min0[i] );
	
	printf("%d\n", min(min1[1],min0[1]) );
	delete []AL;
	return 0;
}
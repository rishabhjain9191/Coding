#include <iostream>
#include <cstdio>
#define INF 999999
using namespace std;
int res[183][183];
bool calculated[183][183];
bool Marked[183][183];
int n, m;

int mini(int a, int b, int c, int d);
bool valid(int i, int j);
int calculate(int i, int j);

int main(){
	int t;
	char input;
	scanf("%d", &t);
	while(t--){
		scanf("%d %d\n", &n, &m);
		for(int i=1;i<=n;i++){
			for(int j=1;j<=m;j++){
				scanf("%c", &input);
				//printf("%c", input);
				Marked[i][j]=false;
				if(input=='1'){
					res[i][j]=0;
					calculated[i][j]=true;
				}
				else{
					res[i][j]=INF;
					calculated[i][j]=false;	
				}
			}
			scanf("%c", &input);
			//printf("%c", input);
		}
		
		for(int i=1;i<=n;i++){
			for(int j=1;j<=m;j++){
				if(!calculated[i][j]){
					calculate(i,j);
					calculated[i][j]=true;
				}
				printf("%d ", res[i][j]);
			}
			printf("\n");
		}
	}
}
int calculate(int i, int j){
	//cout<<i<<", "<<j<<"\n";
	if(!valid(i, j))
		return INF;
	if(Marked[i][j])
		return INF;
	if(calculated[i][j])
		return res[i][j];
	else{	
		Marked[i][j]=true;
		int a=calculate(i+1, j);
		//cout<<"a="<<a<<"\n";
		int b=calculate(i-1, j);
		//cout<<"b="<<b<<"\n";
		int c=calculate(i, j+1);
		//cout<<"c="<<c<<"\n";
		int d=calculate(i, j-1);
		//cout<<"d="<<d<<"\n";
		int ans=mini(a, b, c, d);
		if(ans!=INF){
			res[i][j]=1+ans;
			calculated[i][j]=true;
		}
		Marked[i][j]=false;
		//cout<<res[i][j]<<"\n";
		return res[i][j];
	}
}
int mini(int a, int b, int c, int d){
	return min(min(a, b), min(c, d));
}
bool valid(int i, int j){
	if(i<1||i>n||j<1||j>m)
		return false;
	return true;
}
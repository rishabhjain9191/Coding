#include <iostream>
#include <cstring>
#include <climits>
#define INF LLONG_MAX;
using namespace std;
typedef struct{
	long long maxResult;
	long long minResult;
}Cell;
char expr[101];
Cell DP[55][55];
long long calculate(long long o1, long long o2, char o);
long long mymax(long long a, long long b);
long long mymin(long long a, long long b);
int main(){
	int t,i,diff, row,col,r,cols;
	long long maxi, mini;
	cin>>t;
	while(t--){
		cin>>expr;
		int d=strlen(expr)/2+1;
		for(i=0;i<d;i++){
			DP[i][i].maxResult=expr[i*2]-'0';
			DP[i][i].minResult=expr[i*2]-'0';
		}
		for(diff=1;diff<=d-1;diff++){
			for(row=0;row<=d-1-diff;row++){
				col=row+diff;
				maxi=0;
				mini=INF;
				r=row;
				for(cols=row;cols<col;cols++){
					//cout<<row<<cols<<r<<col<<"\n";
					maxi=mymax(maxi, calculate(DP[row][cols].maxResult, DP[++r][col].maxResult, expr[cols*2+1]));
					mini=mymin(mini, calculate(DP[row][cols].minResult, DP[r][col].minResult, expr[cols*2+1]));
				}
				DP[row][col].maxResult=maxi;
				DP[row][col].minResult=mini;
				//cout<<row<<", "<<col<<"-"<<DP[row][col].maxResult<<"\n";
			}
		}
		cout<<DP[0][d-1].maxResult<<" "<<DP[0][d-1].minResult<<"\n";
	}
	return 0;
}
long long calculate(long long o1, long long o2,  char o){
	//cout<<o1<<o<<o2<<"\n";
	if(o=='+')
		return o1+o2;
	else
		return o1*o2;
}
long long mymax(long long a, long long b){
	if(a>b)
		return a;
	return b;
}
long long mymin(long long a, long long b){
	if(a<b)
		return a;
	return b;
}
#include <iostream>
#include <string.h>
#include <climits>
using namespace std;
int Grid[502][502];
int DP[502][502];
int r,c;

int main(){
	int t,i,j;
	int right, bottom;
	cin>>t;
	while(t--){
		cin>>r>>c;
		
		for(i=0;i<r;i++){
			for(j=0;j<c;j++){
				cin>>Grid[i][j];
			}
		}

for(i=0;i<r+1;i++){
			Grid[i][c]=10;
			DP[i][c]=INT_MAX;
		}
		for(j=0;j<c+1;j++){
			Grid[r][j]=10;
			DP[r][j]=INT_MAX;
		}

		//memset(DP,1, sizeof DP);
	/*	for(i=0;i<r+1;i++){
			for(j=0;j<c+1;j++){
				DP[i][j]=10000;
				//cout<<Grid[i][j]<<" ";
			}
			//cout<<"\n";
		}*/
		
		DP[r-1][c]=1;
		DP[r][c-1]=1;
		for(i=r-1;i>=0;i--){
			for(j=c-1;j>=0;j--){
				//if(i+j!=r-1+c-1){
				//	cout<<i<<","<<j<<"\n";
				right=DP[i][j+1]-Grid[i][j+1];
				//cout<<"right : "<<right<<"\n";
				if(right<=0)
					right=1;
				bottom=DP[i+1][j]-Grid[i+1][j];
				//cout<<"Bottom"<<bottom<<"\n";
				if(bottom<=0)
					bottom=1;
				DP[i][j]=min(right,bottom);
				//cout<<"min("<<right<<","<<bottom<<") = "<<DP[i][j]<<"\n";
			//}
			}
		}
		cout<<DP[0][0]<<"\n";
	}
	return 0;


}

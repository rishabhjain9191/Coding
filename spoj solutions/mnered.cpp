#include <iostream>
using namespace std;
int N,M;
int surface[102][102];
int s[102][102];
int main(){
	cin>>N>>M;
	int i,j,r,c;
	for(i=0;i<=N;i++){
		for(j=0;j<=N;j++){
			surface[i][j]=0;
		}
	}
	for(i=0;i<M;i++){
		cin>>r>>c;
		surface[r][c]=1;
	}
	for(i=0;i<=N;i++){
		s[0][i]=0;
		s[i][0]=0;
	}
	//calculate the no. of cubes from (1,1)-(i,j)
	for(i=1;i<=N;i++){
		for(j=1;j<=N;j++){
			s[i][j]=s[i-1][j]+s[i][j-1]-s[i-1][j-1]+surface[i][j];
		}
	}
	int maxi=0,x,y,i1,i2,j1,j2,row,col;
	for(int factor=1;factor*factor<=M;factor++){
		if(M%factor==0){
			x=factor;
			y=M/factor;
			for(row=1;row<=N-x+1;row++){
				for(col=1;col<=N-y+1;col++){
					i1=row;
					j1=col;
					i2=i1+x-1;
					j2=j1+y-1;
					maxi=max(maxi,s[i2][j2]-s[i1-1][j2]-s[i2][j1-1]+s[i1-1][j1-1]);
				}
			}
			if(x!=y){
				for(row=1;row<=N-y+1;row++){
					for(col=1;col<=N-x+1;col++){
						i1=row;
						j1=col;
						i2=i1+y-1;
						j2=j1+x-1;
						maxi=max(maxi,s[i2][j2]-s[i1-1][j2]-s[i2][j1-1]+s[i1-1][j1-1]);
					}
				}
			}
		}
	}
	cout<<M-maxi<<"\n";
	return 0;
}
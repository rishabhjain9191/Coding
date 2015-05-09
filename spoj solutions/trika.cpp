#include <iostream>

static int P[22][22];
static int DP[22][22];
int N, M;
using namespace std;
int goTry(int, int);
int main(){
	int X,Y;

	cin>>N>>M;
	cin>>X>>Y;
	int row, column;
	for(row=1;row<=N;row++){
		for(column=1;column<=M;column++){
			cin>>P[row][column];
		}
	}
	
	for(row=0;row<=N;row++){
		for(column=0;column<=M;column++){
			DP[row][column]=-1;
		}
	}
	DP[N][M]=0;
	int powerLeft=P[X][Y]-goTry(X, Y);
	if(powerLeft>=0){
		cout<<"Y"<<" "<<powerLeft<<"\n";
	}
	else{
		cout<<"N"<<"\n";
	}
	return 0;
}
int goTry(int x, int y){
	if(DP[x][y]!=-1){
		return DP[x][y];
	}
	else{
		int rightPowerLost=60000;
		int downPowerLost=60000;
		if(y+1<=N)
			rightPowerLost=P[x][y+1]+goTry(x, y+1);
		if(x+1<=M)
			downPowerLost=P[x+1][y]+goTry(x+1, y);
		DP[x][y]=min(rightPowerLost, downPowerLost);
		return DP[x][y];
	}
}
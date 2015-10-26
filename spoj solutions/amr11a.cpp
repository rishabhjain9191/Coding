#include <iostream>
using namespace std;
typedef struct{
	int maxEnergy;
	int gain;
	int value;
}grid;
typedef struct{
	int energy;
	int gain;
}energyGain;
int r,c;
grid Grid[501][501];
int main(){
	int t;
	int i,j;
	cin>>t;
	while(t--){
	cin>>r>>c;
	for(i=0;i<r;i++){
		for(j=0;j<c;j++){
			cin>>Grid[i][j].value;
		}
	}
	//Calculate 0,0
	if(Grid[0][0].value<=0){
		Grid[0][0].maxEnergy=1;
		Grid[0][0].gain=1-Grid[0][0].value;
	}
	else{
		Grid[0][0].maxEnergy=Grid[0][0].value;
		Grid[0][0].gain=0;
	}
	//Initialization done
	int maxEnergy=0;
	int maxEnergyTop=0;
	int maxEnergyLeft=0;
	energyGain fromTop, fromLeft;
	for(i=0;i<r;i++){
		for(j=0;j<c;j++){
			//dependency->i-1,j and i,j-1
			fromTop.energy=0;
			fromTop.gain=0;
			fromLeft.energy=0;
			fromLeft.gain=0;
			
			if(i+j!=0){
			if(i-1>=0){
				fromTop.energy=Grid[i][j].value+Grid[i-1][j].maxEnergy;
				fromTop.gain=Grid[i-1][j].gain;
				if(fromTop.energy<=0){
					fromTop.gain+=1-fromTop.energy;
					fromTop.energy=1;
				}
			}
			if(j-1>=0){
				fromLeft.energy=Grid[i][j].value+Grid[i][j-1].maxEnergy;
				fromLeft.gain=Grid[i][j-1].gain;
				if(fromLeft.energy<=0){
					fromLeft.gain+=1-fromLeft.energy;
					fromLeft.energy=1;
				}
			}
			if(fromTop.energy>fromLeft.energy){
				Grid[i][j].maxEnergy=fromTop.energy;
				Grid[i][j].gain=fromTop.gain;
			}
			else if(fromLeft.energy>fromTop.energy){
				Grid[i][j].maxEnergy=fromLeft.energy;
				Grid[i][j].gain=fromLeft.gain;
			}
			else{
				Grid[i][j].maxEnergy=fromLeft.energy;
				Grid[i][j].gain=min(fromTop.gain,fromLeft.gain);
			}
		}
	}
	}
	/*for(i=0;i<r;i++){
		for(j=0;j<c;j++){
			cout<<Grid[i][j].maxEnergy<<"-"<<Grid[i][j].gain<<"  ";
		}
		cout<<"\n";
	}
*/	cout<<Grid[r-1][c-1].gain;
}
	return 0;
}
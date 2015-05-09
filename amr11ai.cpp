#include <iostream>
using namespace std;
int Grid[501][500];
int r,c;
int Solve(int i, int j, int energy);
bool canOnlyGoDown(int i, int j);
bool canOnlyGoRight(int i, int j);

int main(){
	int t,i,j;
	cin>>t;
	while(t--){
		cin>>r>>c;
		for(i=0;i<r;i++){
			for(j=0;j<c;j++){
				cin>>Grid[i][j];
			}
		}
		cout<<1+Solve(0,0,1)<<"\n";
	}
}
int Solve(int i, int j, int energy){
	//cout<<"\n"<<i<<", "<<j<<","<<energy<<"\n";
	if(i>=r-1&&j>=c-1){
	//	cout<<"0\n";
		return 0;
	}
	int ans;
	int cgain=0,energyRight=0,energyDown=0,cGainR=0,cGainD=0;
	if(canOnlyGoRight(i,j)){
		energy=energy+Grid[i][j+1];
		if(energy<=0){
			cgain=1-energy;
			energy=cgain+energy;
		}
		ans= cgain+Solve(i,j+1,energy);
	//	cout<<ans<<"\n";
		return ans;
	}
	if(canOnlyGoDown(i,j)){
		energy=energy+Grid[i+1][j];
		if(energy<=0){
			cgain=1-energy;
			energy=cgain+energy;
		}
	ans= cgain+Solve(i+1,j,energy);
	//cout<<ans<<"\n";
	return ans;

	}
	else{
		int ans1,ans2;
		energyRight=energy+Grid[i][j+1];
		//cout<<energyRight<<"\n";
		if(energyRight<=0){
			cGainR=1-energyRight;
			energyRight=cGainR+energyRight;
		}
		energyDown=energy+Grid[i+1][j];
		if(energyDown<=0){
			cGainD=1-energyDown;
			energyDown=cGainD+energyDown;
		}
	//	cout<<energyDown<<"\n";
		//cout<<"\n"<<
		ans1=cGainR+Solve(i,j+1,energyRight);
		ans2=cGainD+Solve(i+1,j,energyDown);
		ans= min(ans1,ans2);
	//	cout<<"min("<<ans1<<","<<ans2<<")="<<ans<<"\n";
		return ans;
	}
}
bool canOnlyGoDown(int i, int j){
	if(i+1<=r&&j+1>=c){
		return true;
	}
	return false;
}
bool canOnlyGoRight(int i, int j){
	if(j+1<=c&&i+1>=r){
		return true;
	}
	return false;
}
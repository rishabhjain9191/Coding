#include <iostream>
#include <vector>
#define MAX 102
using namespace std;
int r, c;
bool blocked[MAX][MAX];
char STR[]={'A','L','L','I','Z','Z','W','E','L','L','\0'};
char Grid[MAX][MAX];
bool P(pair<int, int> pos, int found);

int main(){
	int T;
	char input;
	vector<pair<int, int> > aPos;
	cin>>T;
	for(int i=0;i<MAX;i++){
		blocked[0][i]=true;
		blocked[i][0]=true;
	}
	while(T--){
		cin>>r>>c;
		for(int i=0;i<c+2;i++){
			blocked[r+1][i]=true;
		}
		for(int i=0;i<r+2;i++){
			blocked[i][c+1]=true;
		}
		for(int i=1;i<=r;i++){
			for(int j=1;j<=c;j++){
				blocked[i][j]=false;
				cin>>input;
				Grid[i][j]=input;
				if(input=='A')
					aPos.push_back(make_pair(i,j));
			}
		}
		bool res=false;
		if(aPos.size()==0){
			cout<<"NO\n";
		}
		else{
			for(int i=0;i<aPos.size() && !res;i++){
				res=P(aPos[i], 0);
			}
			if(res)
				cout<<"YES\n";
			else
				cout<<"NO\n";
		}
		aPos.clear();
	}
	return 0;
}
int displacement[]={0,1,-1};
bool P(pair<int, int> pos, int found){
	//cout<<found<<"\n";
	if(found==9){
		return true;
	}
	int x,y, disX, disY;
	bool res=false;
	pair<int, int> nPos, xPos;
	//cout<<"\n";
	//for(int i=0;i<pos.size();i++){
		//cout<<"In loop";
		x=pos.first;
		y=pos.second;
		blocked[x][y]=true;
		for(int j=0;j<3&&!res;j++){
			for(int k=0;k<3&&!res;k++){
				disX=displacement[j];
				disY=displacement[k];
				//cout<<x+disX<<", "<<y+disY;
				if(!blocked[x+disX][y+disY]){
					if(Grid[x+disX][y+disY]==STR[found+1]){
				//		cout<<"pushed";
						res=res+P(make_pair(x+disX, y+disY), found+1);
					}
				}
				//cout<<"\n";
			}
		}
		blocked[x][y]=false;
		return res;
}
#include <iostream>
#include <vector>
#define MAX 102
using namespace std;
int r, c;
bool blocked[MAX][MAX];
char STR[]={'A','L','L','I','Z','Z','W','E','L','L','\0'};
char Grid[MAX][MAX];
bool P(vector<pair<int, int> > pos, int found);

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
		if(aPos.size()==0){
			cout<<"NO\n";
		}
		else if(P(aPos,0)){cout<<"YES\n";}else{cout<<"NO\n";}
		aPos.clear();
	}
	return 0;
}
int displacement[]={0,1,-1};
bool P(vector<pair<int, int> > pos, int found){
	cout<<found<<"\n";
	if(found==9){
		return true;
	}
	int x,y, disX, disY;
	bool res;
	vector<pair<int, int> >nPos;
	for(int i=0;i<pos.size();i++){
		cout<<"("<<pos[i].first<<", "<<pos[i].second<<")";
	}
	cout<<"\n";
	for(int i=0;i<pos.size();i++){
		//cout<<"In loop";
		x=pos[i].first;
		y=pos[i].second;
		blocked[x][y]=true;
		for(int j=0;j<3;j++){
			for(int k=0;k<3;k++){
				disX=displacement[j];
				disY=displacement[k];
				cout<<x+disX<<", "<<y+disY;
				if(!blocked[x+disX][y+disY]){
					if(Grid[x+disX][y+disY]==STR[found+1]){
						cout<<"pushed";
						nPos.push_back(make_pair(x+disX, y+disY));
					}
				}
				cout<<"\n";
			}
		}
		if(nPos.size()==0){
			blocked[x][y]=true;
			//Next character not found
			res=false;
		}
		else{
			res=P(nPos, found+1);
			cout<<"res : "<<res<<"\n";
			blocked[x][y]=false;
			nPos.clear();
			if(res){
				//blocked[x][y]=false;
				return true;
			}
		}
	}
	return res;
}
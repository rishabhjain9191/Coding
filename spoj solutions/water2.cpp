#include <iostream>
#include <vector>
#define MAX 102
#define INF 10001
using namespace std;
int row, column;

int Height[MAX][MAX];
int EffectiveHeight[MAX][MAX];
int Water[MAX][MAX];
bool Calculated[MAX][MAX];
bool visited[MAX][MAX];
int EH(int i, int j);

int main(){
	int t;
	cin>>t;
	while(t--){
		cin>>row>>column;
		for(int i=0; i<=row+1;i++){
			EffectiveHeight[i][0]=0;
			EffectiveHeight[i][column+1]=0;

			Calculated[i][0]=true;
			Calculated[i][column+1]=true;
		}
		for(int i=0; i<=column+1;i++){
			EffectiveHeight[0][i]=0;
			EffectiveHeight[row+1][i]=0;

			Calculated[0][i]=true;
			Calculated[row+1][i]=true;
		}
		for(int i=1;i<=row;i++){
			for(int j=1;j<=column;j++){
				cin>>Height[i][j];
				Water[i][j]=0;
				visited[i][j]=false;
			}
		}
		cout<<EH(2, 2)<<"\n";
		cout<<"\n";
		for(int i=1;i<=row;i++){
			for(int j=1;j<=column;j++){
				cout<<EffectiveHeight[i][j]<<" ";
			}
			cout<<"\n";
		}
		cout<<"\n";
		for(int i=1;i<=row;i++){
			for(int j=1;j<=column;j++){
				cout<<Calculated[i][j]<<" ";
			}
			cout<<"\n";
		}
		cout<<EH(2, 4)<<"\n";

		for(int i=1;i<=row;i++){
			for(int j=1;j<=column;j++){
				cout<<EffectiveHeight[i][j]<<" ";
			}
			cout<<"\n";
		}
		
		/*
		int totalWater=0;
		for(int i=1;i<=row;i++){
			for(int j=1;j<=column;j++){
				totalWater+=Water[i][j];
			}
		}
		cout<<totalWater<<"\n";*/
	}
	return 0;
}
int EH(int i, int j){
	if(Calculated[i][j]){
		return EffectiveHeight[i][j];
	}
	cout<<"("<<i<<", "<<j<<")\n";
	vector<pair<int, int> >toBeCalculated;
	visited[i][j]=true;
	int h1, h2, h3, h4;
	h1=h2=h3=h4=INF;
	//See Down
	if(Calculated[i+1][j]){
		h1=EffectiveHeight[i+1][j];
		if(h1<=Height[i][j]){
			EffectiveHeight[i][j]=Height[i][j];
			Calculated[i][j]=true;
			return Height[i][j];
		}
		else{
			toBeCalculated.push_back(make_pair(i+1, j));
		}
	}
	else{
		if(!visited[i+1][j]){
			toBeCalculated.push_back(make_pair(i+1, j));
		}
	}
	//See Right
	if(Calculated[i][j+1]){
		h2=EffectiveHeight[i][j+1];
		if(h2<=Height[i][j]){
			EffectiveHeight[i][j]=Height[i][j];
			Calculated[i][j]=true;
			return Height[i][j];
		}
		else{
			toBeCalculated.push_back(make_pair(i, j+1));
		}
	}
	else{
		if(!visited[i][j+1]){
			toBeCalculated.push_back(make_pair(i, j+1));
		}
	}
	//See Up
	if(Calculated[i-1][j]){
		h3=EffectiveHeight[i-1][j];
		if(h3<=Height[i][j]){
			EffectiveHeight[i][j]=Height[i][j];
			Calculated[i][j]=true;
			return Height[i][j];
		}
		else{
			toBeCalculated.push_back(make_pair(i-1, j));
		}
	}
	else{
		if(!visited[i-1][j]){
			toBeCalculated.push_back(make_pair(i-1, j));
		}
	}
	//See Left
	if(Calculated[i][j-1]){
		h4=EffectiveHeight[i][j-1];
		if(h4<=Height[i][j]){
			EffectiveHeight[i][j]=Height[i][j];
			Calculated[i][j]=true;
			return Height[i][j];
		}
		else{
			toBeCalculated.push_back(make_pair(i, j-1));
		}
	}
	else{
		if(!visited[i][j-1]){
			toBeCalculated.push_back(make_pair(i, j-1));
		}
	}
	int mini=INF, v;
	for(int k=0;k<toBeCalculated.size();k++){
		v=EH(toBeCalculated[k].first, toBeCalculated[k].second);
		if(v<=Height[i][j]){
			EffectiveHeight[i][j]=Height[i][j];
			Calculated[i][j]=true;
			return Height[i][j];
		}
		mini=min(mini, v);
	}
	EffectiveHeight[i][j]=mini;
	Water[i][j]=EffectiveHeight[i][j]-Height[i][j];
	Calculated[i][j]=true;
	return mini;
}
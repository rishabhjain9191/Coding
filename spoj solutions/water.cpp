#include <iostream>
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
		//EH(2, 5);
		for(int i=1;i<=row;i++){
			for(int j=1;j<=column;j++){
				if(!Calculated[i][j]){
					EH(i,j);
				}
			}
		}
		int totalWater=0;
		for(int i=1;i<=row;i++){
			for(int j=1;j<=column;j++){
				totalWater+=Water[i][j];
			}
		}
		cout<<totalWater<<"\n";
	}
	return 0;
}
int EH(int i, int j){
	cout<<"("<<i<<", "<<j<<")\n";
	if(Calculated[i][j]){
		return EffectiveHeight[i][j];
	}
	else{
		Calculated[i][j]=true;
		visited[i][j]=true;
		int h1, h2, h3, h4;
		h1=h2=h3=h4=INF;
		if(!visited[i+1][j])
		{
			h1=EH(i+1, j);
			cout<<"h1="<<h1<<"\n";
			if(h1<Height[i][j]){
				EffectiveHeight[i][j]=Height[i][j];
				Water[i][j]=0;
				return Height[i][j];
			}
		}
		if(!visited[i][j+1])
		{
			h2=EH(i, j+1);
			cout<<"h2="<<h2<<"\n";
			if(h2<Height[i][j]){
				EffectiveHeight[i][j]=Height[i][j];
				Water[i][j]=0;
				return Height[i][j];
			}
		}
		if(!visited[i-1][j])
		{
			h3=EH(i-1, j);
			cout<<"h3="<<h3<<"\n";
			if(h3<Height[i][j]){
				EffectiveHeight[i][j]=Height[i][j];
				Water[i][j]=0;
				return Height[i][j];
			}
		}
		if(!visited[i][j-1]){
			h4=EH(i, j-1);
			cout<<"h4="<<h4<<"\n";
			if(h4<Height[i][j]){
				EffectiveHeight[i][j]=Height[i][j];
				Water[i][j]=0;
				return Height[i][j];
			}
		}
		int minHeight=min(min(h1, h2), min(h3, h4));
		if(minHeight==INF){
			visited[i][j]=false;
			Calculated[i][j]=false;
			return 0;
		}
		EffectiveHeight[i][j]=minHeight;
		Water[i][j]=Height[i][j]-EffectiveHeight[i][j];
		return EffectiveHeight[i][j];
	}
}
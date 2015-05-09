#include <cstdio>
#include <iostream>
#include <queue>

using namespace std;
typedef struct{
	int row;
	int col;
}cell;

int done[8][8];
int d[8][8];
int a,b,c,e;
bool isValid(int r, int c);
int findDist(int r1, int c1, int r2, int c2);
bool isOutOfRange(int r, int c);
queue<cell> q;
int main(){
	int per[8][2]={
	{2,1},
	{2,-1},
	{1,2},
	{1,-2},
	{-1,+2},
	{-1,-2},
	{-2,1},
	{-2,-1},
	};
	int i,j;
	cell temp,currentCell;
	int row,col;
	int dist;
	int level=0;
	bool shouldContinue;
	while(scanf("%d %d %d %d",&a, &b, &c, &e)!=EOF)
	{
			//cin>>a>>b>>c>>e;
		shouldContinue=true;
	while(!q.empty()){
		q.pop();
	}
	if(isOutOfRange(a,b)||isOutOfRange(c,e)){
		cout<<"-1"<<"\n";
		shouldContinue=false;
	}
	if(shouldContinue){
	for(i=0;i<8;i++){
		for(j=0;j<8;j++){
			d[i][j]=1000;
			done[i][j]=0;
		}
	}
	d[c][e]=0;
	done[c][e]=1;
	if(done[a][b]){
		cout<<d[a][b]<<"\n";
		continue;
	}
	
	temp.row=c;
	temp.col=e;
	q.push(temp);
	temp.row=-1;
	temp.col=-1;
	q.push(temp);
	
	//visit all the levels, do a BFS
	while(!q.empty()){
		currentCell=q.front();
		q.pop();
		if(currentCell.row==-1&&currentCell.col==-1){
			//currentCell=q.front();
			//q.pop();
			cout<<"level="<<level++<<"\n";
			//Level complete
			if(done[a][b]){
				//cout<<d[a][b]<<"\n";
				break;
			}
			else{
				temp.row=-1;
				temp.col=-1;
				q.push(temp);
			}
		}
		else{
		//cout<<currentCell.row<<", "<<currentCell.col<<"\n";
		done[currentCell.row][currentCell.col]=1;
		for(i=0;i<8;i++){
			row=currentCell.row+per[i][0];
			col=currentCell.col+per[i][1];
			if(isValid(row,col)){
				dist=findDist(row,col,currentCell.row,currentCell.col);
				d[row][col]=min(d[row][col], dist+d[currentCell.row][currentCell.col]);
				temp.row=row;
				temp.col=col;
				q.push(temp);
			}
		}
	}
}
	if(!done[a][b])
		cout<<"-1"<<"\n";
	else
		cout<<d[a][b]<<"\n";
}
}
	return 0;
}

bool isValid(int r, int c){
	if(done[r][c])
		return false;
	if(r>7||r<0||c>7||c<0)
		return false;
	return true;
}
bool isOutOfRange(int r, int c){
	if(r>7||r<0||c>7||c<0)
		return true;
	return false;
}
int findDist(int r1, int c1, int r2, int c2){
	return r1*r2+c1*c2;
}
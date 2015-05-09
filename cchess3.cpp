#include <iostream>
#include <queue>
using namespace std;
typedef struct{
	int row;
	int col;
}cell;

void initializeDistancesAndDone(int, int);
cell make_cell(int row, int col);
bool levelHasEnded(cell current);
bool isValid(int row, int col);
int cost(int r1, int c1, int r2, int c2);

int distances[8][8];
bool done[8][8];
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

	int t;
	int srcRow, srcCol, dstRow, dstCol;
	cell currentCell;
	cin>>t;
	while(t--){
		cin>>srcRow>>srcCol>>dstRow>>dstCol;
		srcRow=7-srcRow;
		dstRow=7-dstRow;
		initializeDistancesAndDone(srcRow, srcCol);
		queue<cell> q;
		
		int newRow, newCol;

		q.push(make_cell(srcRow, srcCol));
		q.push(make_cell(-1,-1));
		while(!q.empty()){
			currentCell=q.front();
			q.pop();
			if(levelHasEnded(currentCell)){
				//we have the value of destination
				if(distances[dstRow][dstCol]!=1000){
					break;
				}
				else{
					q.push(make_cell(-1,-1));
				}
			}
			else{
				//Calculate the permutations
				for(int i=0;i<8;i++){
					newRow=currentCell.row+per[i][0];
					newCol=currentCell.col+per[i][1];
					if(isValid(newRow,newCol)){
						distances[newRow][newCol]=min(distances[newRow][newCol],cost(currentCell.row, currentCell.col, newRow, newCol)+distances[currentCell.row][currentCell.col]);
						q.push(make_cell(newRow,newCol));
						done[newRow][newCol]=true;
					}
				}
			}
		}
		cout<<distances[dstRow][dstCol]<<"\n";
	}
}
int cost(int r1, int c1, int r2, int c2){
	return (7-r1)*(7-r2)+c1*c2;
}
bool isValid(int row, int col){
	if(done[row][col])
		return false;
	if(row>7||row<0||col>7||col<0)
		return false;
	return true;
}
bool levelHasEnded(cell current){
	if(current.row==-1||current.col==-1)
		return true;
	return false;
}
cell make_cell(int row, int col){
	cell temp;
	temp.row=row;
	temp.col=col;
	return temp;
}
void initializeDistancesAndDone(int row, int col){
	int i,j;
	for(i=0;i<8;i++){
		for(j=0;j<8;j++){
			distances[i][j]=1000;
			done[i][j]=false;
		}
	}
	distances[row][col]=0;
	done[row][col]=true;
}
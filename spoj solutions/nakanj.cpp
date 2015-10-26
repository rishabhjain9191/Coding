#include <iostream>
#include <queue>
using namespace std;
typedef struct{
	int row;
	int col;
}cell;

void initializeDistancesAndDone(char src[3]);
cell make_cell(int row, int col);
bool levelHasEnded(cell current);
bool isValid(int row, int col);

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
	char src[3],dst[3];
	cell currentCell;
	cin>>t;
	while(t--){
		cin>>src>>dst;
		initializeDistancesAndDone(src);
		queue<cell> q;
		int row='8'-src[1];
		int col=src[0]-'a';

		int destRow='8'-dst[1];
		int destCol=dst[0]-'a';

		int newRow, newCol;

		q.push(make_cell(row, col));
		q.push(make_cell(-1,-1));
		while(!q.empty()){
			currentCell=q.front();
			q.pop();
			if(levelHasEnded(currentCell)){
				//we have the value of destination
				if(distances[destRow][destCol]!=1000){
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
						distances[newRow][newCol]=min(distances[newRow][newCol],1+distances[currentCell.row][currentCell.col]);
						q.push(make_cell(newRow,newCol));
						done[newRow][newCol]=true;
					}
				}
			}
		}
		cout<<distances[destRow][destCol]<<"\n";
	}
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
void initializeDistancesAndDone(char src[3]){
	int i,j;
	for(i=0;i<8;i++){
		for(j=0;j<8;j++){
			distances[i][j]=1000;
			done[i][j]=false;
		}
	}
	int row='8'-src[1];
	int col=src[0]-'a';
	distances[row][col]=0;
	done[row][col]=true;
}
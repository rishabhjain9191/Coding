#include <iostream>
#include <vector>
using namespace std;
const int max_val=10000;
typedef struct{
	int row;
	int col;
}cell;
int chess[8][8];
int done[8][8];
int a,b,c,d;
int mymin(int x, int y);
int cost(int, int, int, int);
int P(int row, int col);
vector<cell> path;
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

int main(){
	cin>>a>>b>>c>>d;
	int i,j;
	int mini=max_val;
	for(i=0;i<8;i++){
		for(j=0;j<8;j++){
			done[i][j]=max_val;
		}
	}
	//done[a][b]=1;
	cell temp;
	temp.row=a;
	temp.col=b;
	path.push_back(temp);
	i=0;
	for(i=0;i<8;i++){
		//mini=mymin(mini,P(a+per[i][0],b+per[i][1])+cost(a,b,a+per[i][0],b+per[i][1]));
		cout<<a+per[i][0]<<", "<<b+per[i][1]<<"-";
		//cout<<"mini="<<mini<<"\n";
		//cout<<cost(a,b,a+per[i][0],b+per[i][1])<<"\n";
		cout<<"\n";
	}
	if(mini>=max_val)
		mini=-1;
	cout<<"\nmin="<<mini;
	return 0;
}
int P(int row, int col){
	//check if this is in the path
	int j,k=0;
	//cout<<path.size()<<"\n";
	cout<<"("<<row<<", "<<col<<") : \n";
	for(j=0;j<path.size();j++){
		cout<<"("<<path[j].row<<", "<<path[j].col<<")\n";
		if(path[j].row==row&&path[j].col==col)
			k=1;
	}
	if(k==1)
		return max_val;
	//cin>>j;
	if(row>7||row<0)
		return max_val;
	if(done[row][col]==-1)
		return max_val;
	if(col>7||col<0)
		return max_val;
	if(row==c&&col==d)
		return 0;
	else{
		int i,j;
		int mini=max_val;
		cell temp;
		temp.row=row;
		temp.col=col;
		path.push_back(temp);
		for(i=0;i<8;i++){
		//cout<<row+per[i][0]<<", "<<col+per[i][1]<<"\n";
		mini=mymin(mini,P(row+per[i][0],col+per[i][1])+ cost(row,col,row+per[i][0],col+per[i][1]));
		//cout<<mini<<"\n";
		}
		if(mini>=max_val){
			done[row][col]=-1;
		}
		else{
			if(mini<done[row][col])
				done[row][col]=mini;
			else
				mini=done[row][col];
		}
		path.pop_back();
		return mini;	
	}
}
int cost(int r1, int c1, int r2, int c2){
	return r1*r2+c1*c2;
}
int mymin(int x, int y){
	if(x<y)
		return x;
	return y;
}
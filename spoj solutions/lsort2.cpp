#include <iostream>
using namespace std;

int N;
int input[1002];
int position[1002];
int M[1002][1002];
int L[1002][1002];
int D[1002][1002];

void initializeM(int n);
void initializeD(int n);
void initializeL(int n);

int newPositionLeft(int row, int col);
int newPositionDown(int row, int col);

int main(){
	int t;
	int i,j,k,step,n;
	int row,col;
	cin>>t;
	while(t--){
		cin>>N;
		for(i=1;i<=N;i++){
			cin>>n;
			input[i]=n;
			position[n]=i;
		}
		initializeM(N);
		initializeL(N);
		initializeD(N);
		//Step=1 complete
		step=1;
		//traverse the matrix diagnol-wise
		j=1;
		for(k=N-1;k>=1;k--){
			//cout<<"j="<<j<<"\n";
						step++;

			for(i=1;i<=k;i++){
				//Cell=(i,i+j)
				row=i;
				col=i+j;
				//Do the logic
				//M[row][col]=min(M[row][col-1]+step*newPositionLeft(row,col),M[row+1][col]+step*newPositionDown(row,col));
				M[row][col]=min(M[row][col-1]+step*L[row][col],M[row+1][col]+step*D[row][col]);
				//cout<<M[row][col]<<"\n";
			}
			j++;
		}
		cout<<M[1][N]<<"\n";
	}
	return 0;
}
void initializeM(int n){
	for(int i=1;i<=n;i++){
		M[i][i]=position[i];
	}
}
int newPositionLeft(int row, int col){
	int res=position[col];
	for(int prev=row;prev<col;prev++){
		if(position[prev]<position[col])
			res--;
	}
	return res;
}
int newPositionDown(int row, int col){
	int res=position[row];
	for(int prev=col;prev>row;prev--){
		if(position[prev]<position[row])
			res--;
	}
	return res;
}
void initializeL(int n){
	int i,j,k;
	int row,col;
	j=1;
	for(i=1;i<=N;i++){
		L[i][i]=position[i];
	}
	for(k=N-1;k>=1;k--){
		for(i=1;i<=k;i++){
			//Cell=(i,i+j)
			row=i;
			col=i+j;
			//Do the logic
			//L[row][col]=L[row][col-1]-(position[row]<position[col]?1:0);
			L[row][col]=L[row+1][col]-(position[row]<position[col]?1:0);
			//cout<<L[row][col]<<" ";
		}
		//cout<<"\n";
		j++;
	}



}

void initializeD(int n){
	int i,j,k;
	int row, col;
	j=1;
	for(i=1;i<=N;i++){
		D[i][i]=position[i];
	}
	for(k=N-1;k>=1;k--){
		for(i=1;i<=k;i++){
			//Cell=(i,i+j)
			row=i;
			col=i+j;
			//Do the logic
			D[row][col]=D[row][col-1]-(position[col]<position[row]?1:0);
			//cout<<D[row][col]<<" ";
		}
		j++;
		//cout<<"\n";
	}



}



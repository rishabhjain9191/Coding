#include <iostream>
using namespace std;
int rows, columns;
int row[100001];
int column[100001];

int P(int ary[100001], int cols);
int main(){
	int i,j;
	cin>>rows>>columns;
	while(rows!=0&&columns!=0){
		for(i=0;i<rows;i++){
			for(j=0;j<columns;j++){
				cin>>row[j];
			}
			row[j]=0;
			column[i]=P(row, columns);
		}
		column[i]=0;
		cout<<P(column, rows)<<"\n";
		cin>>rows>>columns;
	}
	return 0;
}
int P(int ary[100001], int cols){
	int p2=0;
	int ans,p1,i;
	ans=p1=ary[cols-1];
	for(i=cols-2;i>=0;i--){
		ans=max(ary[i]+p2,p1);
		p2=p1;
		p1=ans;
	}
	return ans;
}
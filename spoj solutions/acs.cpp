#include <iostream>
#include <cmath>
#define COLUMN 5678
using namespace std;
int PresentToOriginalRow[1240];
int PresentToOriginalColumn[5680];

int OriginalToPresentRow[1240];
int OriginalToPresentColumn[5680];

double valueAtRC(int row, int column);
int findOriginalRowColumn(double w, double *row, double *column);

int main(){
	for(int row=1;row<=1234;row++){
		PresentToOriginalRow[row]=row;
		OriginalToPresentRow[row]=row;
	}
	for(int col=1;col<=5678;col++){
		PresentToOriginalColumn[col]=col;
		OriginalToPresentColumn[col]=col;
	}
	char query;
	int r1, r2;
	int c1, c2;
	int originalRow, originalColumn;
	int r, c;
	int  temp;
	double w, rw, cw;
	while(cin>>query){
		//cin>>query;
		//cout<<query;
		if(query=='R'){
			cin>>r1>>r2;
			OriginalToPresentRow[PresentToOriginalRow[r1]]=r2;
			OriginalToPresentRow[PresentToOriginalRow[r2]]=r1;
			temp=PresentToOriginalRow[r1];
			PresentToOriginalRow[r1]=PresentToOriginalRow[r2];
			PresentToOriginalRow[r2]=temp;
		}
		else if(query=='C'){
			cin>>c1>>c2;
			OriginalToPresentColumn[PresentToOriginalColumn[c1]]=c2;
			OriginalToPresentColumn[PresentToOriginalColumn[c2]]=c1;
			temp=PresentToOriginalColumn[c1];
			PresentToOriginalColumn[c1]=PresentToOriginalColumn[c2];
			PresentToOriginalColumn[c2]=temp;	
		}
		else if(query=='Q'){
			cin>>r>>c;
			originalRow=PresentToOriginalRow[r];
			originalColumn=PresentToOriginalColumn[c];
			cout<<(int)valueAtRC(originalRow, originalColumn)<<"\n";
		}
		else{
			cin>>w;
			findOriginalRowColumn(w, &rw, &cw);
			cout<<OriginalToPresentRow[(int)rw]<<" "<<OriginalToPresentColumn[(int)cw]<<"\n";
		}
	}
	return 0;
}
double valueAtRC(int row, int column){
	//cout<<COLUMN*(row-1)+column;
	return COLUMN*(row-1)+column;
}
int findOriginalRowColumn(double w, double *row, double *column){
	*row=ceil(w/COLUMN);
	//cout<<ceil(0.00017611835)<<"\n";
	*column=w-COLUMN*(*row-1);
	//cout<<*row<<", "<<*column<<"\n";
}
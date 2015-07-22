#include <iostream>
#include <cstdio>

using namespace std;
typedef unsigned long long ULL;

ULL makeMove(char move);
ULL newColOnRight();
ULL newColOnLeft();
ULL newColOnUp();
ULL newColOnDown();
ULL getCurrentElem();
ULL calculateT1();
ULL calculateT2();
ULL getCol();
ULL noOfCols(ULL diagonal);

ULL N;
ULL currentDiagonal=1;
ULL currentCol=1;
int main(){
	ULL moves;
	char move;
	scanf("%llu", &N);
	scanf("%llu", &moves);
	ULL res=1;
	scanf("%c", &move);
	for(ULL i=0;i<moves;i++){
		scanf("%c", &move);
		res+=makeMove(move);
	}
	printf("%llu\n", res);
	return 0;
}
ULL makeMove(char move){
	switch(move){
		case 'R':
			currentCol=newColOnRight();
			currentDiagonal=currentDiagonal+1;
			break;
		case 'L':
			currentCol=newColOnLeft();
			currentDiagonal=currentDiagonal-1;
			break;
		case 'U':
			currentCol=newColOnUp();
			currentDiagonal=currentDiagonal-1;
			break;
		case 'D':
			currentCol=newColOnDown();
			currentDiagonal=currentDiagonal+1;
			break;
	}
	ULL currentElem=getCurrentElem();
	//cout<<currentElem<<"\n";
	return currentElem;
}
ULL newColOnRight(){
	if(currentDiagonal<N)
		return currentCol+1;
	return currentCol;
}
ULL newColOnLeft(){
	if(currentDiagonal<=N)
		return currentCol-1;
	return currentCol;
}
ULL newColOnUp(){
	if(currentDiagonal<=N)
		return currentCol;
	return currentCol+1;
}
ULL newColOnDown(){
	if(currentDiagonal<N)
		return currentCol;
	return currentCol-1;
}
ULL getCurrentElem(){
	ULL T1=calculateT1();
	ULL T2=calculateT2();
	ULL col=getCol();
	//cout<<currentDiagonal<<" "<<currentCol<<"\n";
	//cout<<T1<<" "<<T2<<" "<<col<<"\n";
	return /*(currentDiagonal-1)**/(T1+T2)+col;
}
ULL calculateT1(){
	ULL alpha=min(currentDiagonal-1, N);
	ULL res=alpha*(alpha+1)/2;
	return res;
}
ULL calculateT2(){
	if(currentDiagonal>N){
		ULL res=(currentDiagonal-N-1)*(3*N-currentDiagonal)/2;
		return res;
	}
	else{
		return 0;
	}
}
ULL getCol(){
	if(currentDiagonal&1){
			return currentCol;
	}
	else{
		ULL res=noOfCols(currentDiagonal)-currentCol+1;
		return res;
	}
}
ULL noOfCols(ULL diagonal){
	if(diagonal<=N){
		return diagonal;
	}
	else{
		return 2*N-diagonal;
	}
}

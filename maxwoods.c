#include <stdio.h>
typedef struct{
	int right;
	int left;
	char entity;
}Cell;
//typedef struct cell Cell;
int max(int, int);
int main(){
	Cell ary[202][202];
	int m,n;
	int i,j;
	int t, tests;
	//m=5;
	//n=5;
	scanf("%d\n", &t);

	for(tests=0;tests<t;tests++){
		scanf("%d %d\n", &m, &n);
		//get the input
	for(i=0;i<m;i++){
		for(j=1;j<n+1;j++){
			scanf("%c", &(ary[i][j].entity));
			//printf("\nInput scanned : %d", ary[i][j].entity);
		}
		scanf("\n");
	}
	//scanf("\n");
	//Initialize the endpoints
	for(i=0;i<=m;i++){
		ary[i][j].right=0;
		ary[i][j].left=0;
		ary[i][j].entity='#';
		//So that, we dont have to check the starting points
		ary[i][0].right=0;
		ary[i][0].right=0;
		ary[i][0].entity='#';
	}
	i=m;
	for(j=0;j<=n+1;j++){
		ary[i][j].right=0;
		ary[i][j].left=0;	
		ary[i][j].entity='#';
	}
	//
	/*
	for(i=0;i<m+1;i++){
		for(j=0;j<n+2;j++){
			printf("%c ",ary[i][j].entity);
		}
		printf("\n");
	}
	*/
	//Calculate the result
	
	for(i=m-1;i>=0;i--){
		//Calculate the right values.
		for(j=n;j>0;j--){
			if(ary[i][j].entity=='#')
				ary[i][j].right=0;
			else if(ary[i][j].entity=='T')
				ary[i][j].right=max(ary[i][j+1].right, ary[i+1][j].left)+1;
			else
				ary[i][j].right=max(ary[i][j+1].right, ary[i+1][j].left);
		}
		//Calculate the left values
		for(j=1;j<=n;j++){
			if(ary[i][j].entity=='#')
				ary[i][j].left=0;
			else if(ary[i][j].entity=='T')
				ary[i][j].left=max(ary[i][j-1].left, ary[i+1][j].right)+1;
			else
				ary[i][j].left=max(ary[i][j-1].left, ary[i+1][j].right);
		}
	}
	printf("%d\n", ary[0][1].right);

	}

}
int max(int a, int b){
	if(a>=b)
		return a;
	else
		return b;
}
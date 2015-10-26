#include <iostream>
using namespace std;
void copy(int **ary, int);
int main(){
 int a[10];
 int *p=a;
 copy(&p, 10); 
 for(int i=0;i<10;i++){
 	printf("%d\n", a[i]);
 }
}
void copy(int **ary, int size){
	for(int i =0;i<size;i++){
		*(*ary+i)=i;
	}
}

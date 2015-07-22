#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

char *ptrn;
int *F;
int m;//Pattern length
void calculateF();
int main(){
	while(scanf("%d", &m)==1){
		ptrn=new char[m+1];
		F=new int[m+1];
		scanf("%s\n", ptrn);
		//cout<<ptrn;
		calculateF();
		char c;
		c=getchar();
		vector<int> res;
		int ptrnPtr=0, textPtr=0, count=1;
		while(c!='\n'&&c!=EOF){
			//cout<<count<<"\n";
			if(ptrn[ptrnPtr]==c){
				ptrnPtr++;
				if(ptrnPtr==m){
					res.push_back(count-m);
					ptrnPtr=F[m];
				}
				c=getchar();
				count++;
			}
			else{
				if(ptrnPtr==0){
					c=getchar();
					count++;
				}
				else{
					ptrnPtr=F[ptrnPtr];
				}
			}
			
		}
		if(res.size()==0){
			printf("\n");
		}
		else
		{
			for(int i=0;i<res.size();i++){
				printf("%d\n", res[i]);
			}
		}
		res.clear();
		delete[] F;
		delete[] ptrn;
	}
	return 0;
}


void calculateF(){
	F[0]=0;
	F[1]=0;
	int j=0;
	for(int i=2;i<=m;i++){
		j=F[i-1];
		while(1)
		{
			if(ptrn[i-1]==ptrn[j]){
					j++;
					F[i]=j;
					break;
				}
				else{
					if(j==0){
						F[i]=0;
						break;
					}
					else{
						j=F[j];
					}
				}
			}
	}
}
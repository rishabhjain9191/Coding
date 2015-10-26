#include<stdio.h>
#include<string.h>
char abc[1001];
int DP[1001][1001];
int len;
int PalindromeLengthPuzzle(char* input1[])
{
	//Write code here
	int i=0,j;
	//return sizeof(input1);
	while(strlen(*(input1+i))!=0){
		//printf("%s\n", *(input1+i));
		abc[i]=*(*(input1+i));
		i++;
	}
	
	abc[i]='\0';
	//printf("\nabc=%s\n", abc);
	//return abc[0];
	len=strlen(abc);
	
	for(i=0;i<=len;i++){
		for(j=0;j<=len;j++){
			DP[i][j]=-1;
		}
	}
	//printf("%d", len);
	return P(0, len-1);
}
int P(int s,int e){
	int ans;
	if(s==e)
	return 1;
	if(s>e)
	return 0;
	if(DP[s][e]!=-1)
		return DP[s][e];
	int v1=0;
	if(abc[s]==abc[e])
		v1=2+P(s+1, e-1);
	ans= max(max(P(s+1,e), P(s, e-1)), v1);
	DP[s][e]=ans;
	return ans;
}
int max(int a, int b){
	if(a>b)
	return a;
	return b;
}
int main(){
	char s1[]="Bharti";
	char s2[]="Bharat";
	char s3[]="Akash";
	char s4[]="Bhavya";
	char s5[]="Chand";
	char s6[]="Brijesh";
	char s7[]="Chetak";
	char s8[]="Arvind";
	char s9[]="Bhavna";
	char s10[]="\0";
	char *s[]={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10};
	printf("%d", PalindromeLengthPuzzle(s));
}

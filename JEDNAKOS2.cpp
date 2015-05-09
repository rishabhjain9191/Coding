#include <iostream>
#define INF 99999999
using namespace std;
int input[1001];
int inputSize;
int output;
int dp[1001][2001];
bool done[1001][2001];

int P(int doneSoFar, int requiredSum);
int main(){
	char str[1001];
	cin>>str;
	int i=0;
	while(str[i]!='='){
		input[i]=str[i]-'0';
		i++;
	}
	inputSize=i;
	sscanf(str+i+1, "%d", &output);
	//cout<<inputSize;
	cout<<P(0,output)<<"\n";
	return 0;
}

int P(int doneSoFar,int requiredSum)
{
    if(done[doneSoFar][requiredSum])
    {
        return dp[doneSoFar][requiredSum];
    }

    int &ret=dp[doneSoFar][requiredSum];
    done[doneSoFar][requiredSum]=1;
    ret=INF;

    int i=doneSoFar;

    while(i<inputSize && input[i]==0)
    {
        ++i;
    }



    int u=0;

    if(i<inputSize)
    {
        u=input[i];

        for(i=i+1;i<inputSize && u<=requiredSum;++i)
        {
            ret=min(ret,1+P(i,requiredSum-u));
            u=u*10+input[i];
        }
    }

    if(i==inputSize && u==requiredSum)
    {
        ret=0;
    }

    return ret;
}

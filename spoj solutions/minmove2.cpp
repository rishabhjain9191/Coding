#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;
int main(){
    char str[100002];
    int len;
    scanf("%s", str);
    len=strlen(str);
    int i=0, j=1, k=0;    
    char a,b;
    while(i+k<2*len && j+k<2*len){
        a=str[(i+k)%len];
        b=str[(j+k)%len];
        if(a>b){
            i+=k+1;
            k=0;
            if(i<=j)
                i=j+1;
        }
        else if(a<b){
            j+=k+1;
            k=0;
            if(j<=i)
                j=i+1;
        }
        else{
            k++;
        }
    }
    printf("%d\n", min(i,j));
    return 0;
}
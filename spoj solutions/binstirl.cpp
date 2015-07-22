#include <iostream>
#include <cstdio>
using namespace std;
typedef int ULL;
int main(){
    int t;
    ULL n, m;
    scanf("%d", &t);
    for(int i=0;i<t;i++){
        scanf("%d %d", &n, &m);
        //(((n-m)&((k-1)/2))==0)
        printf("%d\n", (((n-m)&((m-1)/2))==0) );
    }
    return 0;
}

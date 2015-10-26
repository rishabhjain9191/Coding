#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;
int main(){
    char str[100001];
    int len;
    scanf("%s", str);
    len=strlen(str);
    int currentFirst, potentialFirst, comparator, next;
    currentFirst=0;
    potentialFirst=0;
    next=1;
    comparator=0;
    int rotations=0;
    while(currentFirst<len-1 && next!=currentFirst){
        if(str[next]<str[comparator]){
            if(potentialFirst==0){
                potentialFirst=next;
            }
            rotations+=potentialFirst-currentFirst;
            currentFirst=potentialFirst;
            next=(currentFirst+1)%len;
            potentialFirst=next;
            comparator=currentFirst;
        }
        else if(str[next]>str[comparator]){
            next=(next+1)%len;
            potentialFirst=currentFirst;
            comparator=currentFirst;
        }
        else if(str[next]==str[currentFirst]){
            potentialFirst=next;
            comparator=currentFirst+1;
            next=(next+1)%len;
        }
        else if(str[next]==str[comparator]){
            next=(next+1)%len;
            comparator++;
        }
    
    }
    printf("%d\n", rotations);
    return 0;
}

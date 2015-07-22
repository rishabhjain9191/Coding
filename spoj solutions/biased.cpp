#include <iostream>
#define MAX 100001
using namespace std;
int unused[MAX];
int toBeConsidered[MAX], counts[MAX];
int N;
int unusedSize, toBeConsideredSize;

int main(){
    int t, input;
    char teamName[50];
    scanf("%d", &t);
    while(t--){
      scanf("%d", &N);
      unusedSize=toBeConsideredSize=0;
      for(int i=1;i<=N;i++){
        counts[i]=0;
        toBeConsidered[i]=0;
      }
      for(int i=0;i<N;i++){
        scanf("%s %d",teamName,  &input);
        counts[input]++;
        if(counts[input]>1){
            toBeConsidered[input]++;
        }
      }
      for(int i=1;i<=N;i++){
        if(counts[i]==0)
            unused[unusedSize++]=i;
      }
        int nextAvailable=0;
        long long int dist=0;
            for(int i=1;i<=N;i++){
                while(toBeConsidered[i]>0){
                dist+=abs(i-unused[nextAvailable]);
                toBeConsidered[i]--;
                nextAvailable++;
                }    
        }
    printf("%lld\n", dist);
    }
    return 0;
}

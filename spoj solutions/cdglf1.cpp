#include <iostream>
#include <string.h>
using namespace std;
int DP[102][102];
int profits[102];
int n,m;
int startfrom(int broomNo, int noOfBroomsBought);

int main(){
  int i;
  memset(DP, -1, sizeof DP);
  cin>>n>>m;
  for(i=0;i<n;i++){
    cin>>profits[i];
  }
  int maxi=0;
  for(i=n-1;i>=0;i--){
    maxi=max(maxi, startfrom(i, 0));
  }
  cout<<"ans : "<<maxi;

}
int startfrom(int broomNo,int noOfBroomsBought){
  if(broomNo>=n){
    DP[broomNo][noOfBroomsBought]=0;
    return 0;
  }
  if(noOfBroomsBought>m){
    DP[broomNo][noOfBroomsBought]=0;
    return 0;
  }
  if(DP[broomNo][noOfBroomsBought]!=-1){
    return DP[broomNo][broomNo];
  }
  else{
    DP[broomNo][noOfBroomsBought]=max(profits[broomNo]+startfrom(broomNo+1, noOfBroomsBought+1), startfrom(broomNo+1, noOfBroomsBought));
    return DP[noOfBroomsBought][noOfBroomsBought];
}

}

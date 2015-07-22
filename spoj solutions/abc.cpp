/*
File Name : 
Created By :
*/
#include <iostream>
#include <string>
#include <vector>
#include <queue>
using namespace std;
int abc[10]={2};
int main(){
    priority_queue<int, vector<int>, greater<int> > left, right;
    right.push(1000);
    right.push(999);
    right.push(9999);
    while(!right.empty()){
        cout<<right.top()<<"\n";
        right.pop();
    }    
}

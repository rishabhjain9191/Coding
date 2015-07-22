#include <iostream>
#include <cstring>
using namespace std;
int main(){
    //char str[500];
   // cin>>str;
    //gets(str);
    string str;
    getline(cin,str);
    cout<<str;
    int k=1;
    cout<<"\n";
    for(int i=0;i<8;i++){
    for(int j=0;j<7;j++){
        //cout<<"Hello";
        cout<<str.substr(k,2)<<"\n";
        k=k+3;
    }
    cout<<str.substr(k,2);
    k=k+4+3;
    }
return 0;
}

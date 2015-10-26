#include <iostream>
#include <string>
#include <map>
using namespace std;
map<string, char> mymap;
mymap["def"]='B';
int main(){
    
    mymap["abcd"]='A';
    cout<<mymap["abcd"];
    
    return 0;
}

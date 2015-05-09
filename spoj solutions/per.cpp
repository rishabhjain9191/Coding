#include <iostream>
using namespace std;
int main(){
	int i,j,k,l;
	for(i=0;i<8;i++){
		for(j=0;j<8;j++){
			for(k=0;k<8;k++){
				for(l=0;l<8;l++){
					cout<<i<<" "<<j<<" "<<k<<" "<<l<<"\n";
				}
			}
		}
	}
	return 0;
}
#include <iostream>
#include <cmath>
using namespace std;
long gcd(long H,long U){
	return U==0?H:gcd(U,H%U);
};
int checkMul(long H, long U, long D){
	if(H%gcd(U,D)==0){
		return 1;
	}
	return 0;
};
bool isInt(float k)
{
  return std::floor(k) == k;
};
int main(){

	int T;
	long H, U, D;
	int i;
	float a;
	float b=0.0;
	int found=0;
	cin>>T;
	for(i=0;i<T;i++){
		cin>>H>>U>>D;
		if(checkMul(H,U,D)){
			b=0.0;
			while(!found){
				a=(b*D+H)/U;
				//cout <<a;
				if(isInt(a)){
					cout<<a+b<<"\n";
					found=1;
				}
				b++;
			}
		}
		else{
			cout<<"-1"<<"\n";
		}
	}
}
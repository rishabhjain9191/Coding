#include <iostream>
#include <string>

using namespace std;

int main(){
	int T, i;
	long j, cm, cn, m, n, cr, ck, k, l;
	string str;
	//string substr;
	cin>>T;
	for(i=0;i<T;i++){
		
		cin>>m>>n;
		cin>>str;
		cm=0;
		cn=0;
		for(j=1;j<=str.length();j++){
			k=0;
			while(k+j<=str.length()){
				//cout<<k<<" "<<k+j<<"\n";
				string substr=str.substr(k, j);
				//cout<<substr<<"\n";
				
				cr=0;
				ck=0;
				for(l=0;l<substr.length();l++){
					if(substr.at(l)=='R'){
						cr++;
					}
					else{
						ck++;
					}
				}
				if(cr==m){
					cm++;
				}
				if(ck==n){
					cn++;
				}
				
				k++;
			}
		}
		cout<<cm<<" "<<cn<<"\n";
	}
}
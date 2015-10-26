#include <iostream>
using namespace std;
int main(){
	//Applying Bruteforce
	int N[10];
	int i,j,k,l,m,n,o;
	for(i=0;i<10;i++){
		N[i]=i;
	}
	for(i=1;i<10;i++){
		for(j=0;j<10;j++){
			if(j!=i){
				for(k=0;k<10;k++){
					if(k!=j&&k!=i){
						for(l=0;l<10;l++){
							if(l!=k&&l!=j&&l!=i){
								for(m=0;m<10;m++){
									if(m!=l&&m!=i&&m!=j&&m!=k){
										for(n=0;n<10;n++){
											if(n!=m&&n!=i&&n!=j&&n!=k&&n!=l){
												for(o=0;o<10;o++){
													if(o!=n&&o!=i&&o!=j&&o!=k&&o!=l&&o!=m){
														if((N[i]*N[j]*N[k]==N[k]*N[l]*N[m])&&(N[k]*N[l]*N[m]==N[m]*N[n]*N[o])){
															cout<<N[i]<<N[j]<<N[k]<<N[l]<<N[m]<<N[n]<<N[o]<<"\n";
															//cout<<N[l];
															//return 0;
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return 0;
}
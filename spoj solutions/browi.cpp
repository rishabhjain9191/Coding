#include <iostream>
using namespace std;
int N;
long int Numbers[201];
long int maxes[201];
long int mines[201];
//int DP1[100][100],DP2[100][100];

int main(){
	maxes[0]=0;
	mines[0]=1000001;
	int i;
	cin>>N;
	while(N!=-1){
	for(i=1;i<=N;i++){
		cin>>Numbers[i];
	}
	Numbers[0]=0;
	//cout<<"input takens";
	for(i=1;i<=N;i++){
		maxes[i]=Numbers[i];
		mines[i]=Numbers[i];
	}
	//memset(DP1, 0, sizeof DP1);
	//memset(DP1, 0, sizeof DP2);
	long int **p1, **p2, **temp;
	p1=new long int*[201];
	p2=new long int*[201];
	for(i=0;i<201;i++){
		p1[i]=new long int[201]();
		p2[i]=new long int[201]();
	}
	int j,k;
	int a,b,c;
	for(i=N;i>0;i--){
		for(j=0;j<i;j++){
			for(k=0;k<i;k++){
				if(j!=k||(j==0&&k==0)){
					//cout<<"["<<j<<","<<k<<"]= max{";
					//if skip
					a=p1[j][k];
					//cout<<"["<<j<<", "<<k<<"],";
					//if can color black
					
					if(Numbers[i]>maxes[k]){
						b=p1[j][i]+1;
						//cout<<"["<<j<<","<<i<<"], ";
					}
					else
						b=0;
					if(Numbers[i]<mines[j]){
						c=p1[i][k]+1;
						//cout<<"["<<i<<","<<k<<"], ";

					}
					else
						c=0;
					p2[j][k]=max(max(a,b),c);
					//cout<<"}\n";
				}
			}
		}
		//cout<<i<<"--->";
		/*for(j=0;j<i;j++){
			for(k=0;k<i;k++){
				cout<<p2[j][k]<<" ";
			}
			cout<<"\n";
		}*/
		temp=p1;
		p1=p2;
		p2=temp;
	}
	cout<<N-p1[0][0]<<"\n";
cin>>N;
}
}
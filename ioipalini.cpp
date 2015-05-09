#include <iostream>
#include <string>
using namespace std;
int main(){
	int N;
	char str[5001];
	int i,j,k,l,m,n,o;
	cin>>N;
	cin>>str;
	int *p0, *p1, *pc, *temp;
	p0=new int[N]();
	p1=new int[N]();
	pc=new int[N]();
	//for(n=0;n<N-1;n++){
		
		//Fill-up pc
		k=-1;
		m=0;
		for(i=N-2;i>=0;i--){
			m=0;
			k++;
			l=i;
			for(j=N-1;j>k;j--){
				//cout<<"\n"<<l<<", "<<j;
				if(str[j]==str[l])
					pc[m]=p0[m+1];
				else
					pc[m]=min(p1[m], p1[m+1])+1;
				l--;
				m++;
			}
			temp=pc;
			pc=p0;
			p0=p1;
			p1=temp;

		}
		//print the arrays
		/*cout<<"\n";
		for(o=0;o<N;o++){
			cout<<p0[o]<<" ";
		}
		cout<<"\n";
		for(o=0;o<N;o++){
			cout<<p1[o]<<" ";
		}
		cout<<"\n";
		for(o=0;o<N;o++){
			cout<<pc[o]<<" ";
		}
		cout<<"\n";
		cout<<"--------------\n";*/
		//Change the pointers
		
	//}
	cout<<temp[0]<<"\n";

}
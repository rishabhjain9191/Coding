#include <iostream>
using namespace std;
typedef struct{
	int length;
	int number[3000];
}veryLargeNumber;
void assign(veryLargeNumber *n1, int number);
void printVLN(veryLargeNumber *n);
void sumVLM(veryLargeNumber *pi1,veryLargeNumber *pi2,veryLargeNumber *pc);
int main(){
	veryLargeNumber *pi1, *pi2, *pc,*temp;
	veryLargeNumber n1, n2, n3;
	int i;
	assign(&n1, 2);
	assign(&n2, 3);	
	pi2=&n1;
	//printVLN(pi2);
	pi1=&n2;
	pc=&n3;
	int n;
	//cin>>n;
	while(!cin.eof()){
	cin>>n;
	if(n==1){
		cout<<"2\n";
	}
	else if(n==2){
		cout<<"3\n";
	}
	else{
		for(i=3;i<=n;i++){
			//pc=pi1+pi2
			sumVLM(pi1,pi2,pc);
			temp=pc;
			pc=pi2;
			pi2=pi1;
			pi1=temp;
		}
		printVLN(temp);
	}
//cin>>n;
}
	return 0;
}
void assign(veryLargeNumber *n1, int number){
	int i,n;
	i=0;
	do{
		n=number%10;
		n1->number[i]=n;
		i++;
		number=number/10;
	}while(number!=0);
	n1->length=i;
	//cout<<"length = "<<n1->length<<"\n";
}
void printVLN(veryLargeNumber *n){
	int i;
	for(i=n->length-1;i>=0;i--){
		cout<<n->number[i];
	}
	cout<<"\n";
}
void sumVLM(veryLargeNumber *pi1,veryLargeNumber *pi2,veryLargeNumber *pc){
	//pc=pi1+pi2;
	int minLen=min(pi1->length, pi2->length);
	int i,pcLen=0,carry=0,sum;
	pcLen=0;
	for(i=0;i<minLen;i++){
		sum=pi1->number[i]+pi2->number[i]+carry;
		//if(sum>9){
			carry=sum/10;
			sum=sum%10;
		//}
		pc->number[pcLen++]=sum;
	}
	int maxLen=max(pi1->length, pi2->length);
	veryLargeNumber *ptr;
	if(pi1->length>pi2->length){
		ptr=pi1;
	}
	else{
		ptr=pi2;
	}
	for(;i<ptr->length;i++){
		sum=ptr->number[i]+carry;
		carry=sum/10;
		sum=sum%10;
		pc->number[pcLen++]=sum;
	}
	//cout<<"carry : "<<carry<<"\n";
	if(carry>0)
	pc->number[pcLen++]=carry;

	pc->length=pcLen;
}
#include <iostream>
#include <cstdio>
#include <queue>
using namespace std;
typedef unsigned long long ULL;
void calculate();
int main(){
	int t, input;
	bool reset=true;
	scanf("%d", &t);
	while(t--){
		calculate();
		printf("\n");
	}
	return 0;
}
void calculate(){
	ULL input, root;
	bool stop=false;
	//priority_queue<int, vector<int>,std::greater<int> >left;
	//priority_queue<int, vector<int>, std::less<int> > right;
	priority_queue<ULL > left;
	priority_queue<ULL, vector<ULL>, greater<ULL> > right;
	
	//cout<<left.top()<<"\n";
	//left.push(-1);
	//right.push(1000);
	int sizeLeft=0,sizeRight=0, nextElem;
	scanf("%llu", &input);
	root=input;
	while(!stop){
		scanf("%llu", &input);
		//cout<<"input : "<<input<<"\n";
		switch(input){
			case -1:
				printf("%llu\n", root);
				if(sizeLeft==0 && sizeRight==0){
					scanf("%llu", &input);
					root=input;
					if(input==0){
						stop=true;
					}
					break;
				}
				if(sizeLeft==sizeRight){
					//cout<<"1st if\n";
					root=left.top();
					left.pop();
					sizeLeft--;
				}
				else if(sizeRight>sizeLeft){
					//cout<<"2nd if\n";
					root=right.top();
					right.pop();
					sizeRight--;
				}
				break;
			case 0:stop=true;break;
			default:
				if(input<root){
					//cout<<"pushing"<<input<<" in left\n";
					left.push(input);
					sizeLeft++;
				}
				else{
					//cout<<"pushing"<<input<<" in right\n";
					right.push(input);
					sizeRight++;
					//cout<<"pushed "<<right.top()<<"\n";
				}
				if(sizeLeft>sizeRight){
					//cout<<"In forst if\n";
					nextElem=left.top();
					left.pop();
					sizeLeft--;
					right.push(root);
					root=nextElem;
					sizeRight++;
				}
				if(sizeRight>sizeLeft+1){
					//cout<<"In second if\n";
					nextElem=right.top();
					right.pop();
					sizeRight--;
					left.push(root);
					root=nextElem;
					sizeLeft++;
				}
				break;
		}
		//cout<<"root : "<<root<<", Left : size : "<<sizeLeft<<", top : "<<left.top()<<", right : size : "<<sizeRight<<" top : "<<right.top()<<"\n";

	}
}
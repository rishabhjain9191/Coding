#include <iostream>
#include <cstdio>
#include <stack>
using namespace std;
int main(){
	int t, i;
	int K, index, idx;
	unsigned long long a, b[60], r, n, N;
	scanf("%d", &t);
	while(t--){
		stack<int> s;
		scanf("%llu %d", &N, &K);
		scanf("%llu", &a);
		b[1]=a;
		if(a>N){
			printf("-1\n");
			for(int j=2;j<=K;j++)
				scanf("%llu", &a);
			continue;
		}
		idx=1;
		for(i=2;i<=K;i++){
			scanf("%llu", &a);
			//cout<<a<<"\n";
			r=a+2*b[i-1];
			//cout<<r<<"\n";
			if(r<=N){idx=i;}
				b[i]=r;
		}
		//idx;
		if(b[idx]==N)printf("%d\n", idx);
		else{
			//cout<<idx<<"\n";
			n=N-b[idx];
			index=idx-1;
			s.push(idx);
			while(n>0&&index>=1){
				if(b[index]<=n){
					s.push(index);
					n=n-b[index];
				}
				index--;
			}
			if(n==0){
				while(!s.empty()){
					if(s.size()==1){
						printf("%d",s.top());	
					}
					else printf("%d ",s.top());
					s.pop();
				}
				printf("\n");
			}
			else{
				printf("-1\n");
			}
		}
	}
	return 0;
}
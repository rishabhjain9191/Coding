#include <iostream>
#include <list>
#include <cstdlib>
int M[1001][1001];
using namespace std;

int size(list<char> str);
bool canChoose(char c, pair<char,char> last_pair);
void initializeM(int N);
int P(list<char> str, int step, pair<char,char> last_pair);
const int max_num=0x3f3f3f3f;
int main(){
	int t;
	cin>>t;
	int N,i;
	char input;
	while(t--){
		cin>>N;
		initializeM(N);
		list<char> str;
		for(i=0;i<N;i++){
			cin>>input;
			str.push_back(input);
		}
		int mini=max_num,cost;
		int step=1;
		char x;
		i=0;
		for(list<char>::iterator list_iter = str.begin();list_iter != str.end(); list_iter++){
			i++;
			list<char> str1(str);
			x=*list_iter;
			str1.remove(x);
			cost=i*step;
			//cout<<x<<"\n";
			mini=min(mini, cost+P(str1, step+1, make_pair(x,x)));
		}
		cout<<mini<<"\n";

	}
	return 0;
}
int P(list<char> str, int step, pair<char,char> last_pair){
	if(size(str)==1){
		return step;
	}
	int l=last_pair.first-48;
	int r=last_pair.second-48;
	//cout<<l<<", "<<r<<"\n";
	if(M[l][r]<max_num){
		return M[l][r];
	}
	else{
		int k=0;
		int i=0;
		int mini=max_num,cost;
		char x;
		for(list<char>::iterator list_iter = str.begin();list_iter != str.end(); list_iter++){
			//cout<<*list_iter<<"\n";
			i++;
			if(k>0){
				break;
			}
			if(canChoose(*list_iter, last_pair)){
				k++;
				list<char> str1(str);
				x=*list_iter;
				str1.remove(x);
				if(x<last_pair.first){
					last_pair.first=x;
				}
				else{
					last_pair.second=x;
				}
				cost=i*step;
				mini=min(mini, cost+P(str1, step+1, last_pair));
			}
		}
		M[l][r]=mini;
		return mini;
	}
}
bool canChoose(char c, pair<char,char> last_pair){
	if(abs(last_pair.first-c)==1||abs(c-last_pair.second)==1)
		return true;
	return false;
}
void initializeM(int N){
	int i,j;
	for(i=0;i<=N;i++){
		for(j=0;j<=N;j++){
			M[i][j]=max_num;
		}
	}
}
int size(list<char> str){
	int i=0;
	list<char>::iterator iter;
	for(iter=str.begin();iter!=str.end();iter++){
		i++;
		if(i>=2)
			break;
	}
	return i;
}


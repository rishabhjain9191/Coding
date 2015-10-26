#include <iostream>
#include <cmath>
#include <string>
using namespace std;
int P(int pic, int sumSoFar, string str);
int stoi(string str, int end, int base);
int power(int a, int b);
int L;
string input,output;
int main(){
	
	cin>>input>>output;
	L=input.length();
	int ans=P(1,0,input);
	cout<<ans;
	return 0;
}
int P(int pic, int sumSoFar, string str){
	if(pic>=str.length()){
		if(sumSoFar+stoi(str,str.length(),10)==stoi(output,output.length(),10))
			return 0;
		else
			return 1000;
	}
	else{
		//opt1;
		int sumSoFar1=sumSoFar;
		sumSoFar1+=stoi(str,pic,10);
		//string str1(str);
		int r=0;
		string::iterator iter;
		for(iter=str.begin();iter!=str.end();iter++){
			if(r>=pic)
				break;
			r++;
		}
		string str1(iter,str.end());
		int opt1=P(pic, sumSoFar1, str1)+1;
		int opt2=P(pic+1, sumSoFar, str);
		return min(opt1, opt2);
	}
}
int stoi(string str, int end, int base){
	string::iterator i;
	int l=0;
	int res=0;
	int d=power(10,end-1);
	int p=0;
	for(p=0;p<=str.length(),l<end;p++){
		res+=d*(str[p]-48);
		d=d/10;
		l++;
	}
	return res;
}
int power(int a, int b){
	int res=1;
	while(b>0){
		res=res*a;
		b--;
	}
	return res;
}
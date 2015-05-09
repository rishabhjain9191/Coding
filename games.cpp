#include <iostream>
#include <string>
#include <math.h>
#include <cstring>
//using namespace std;
long gcd(long p, long q);
long strToLong(const char *numberStr);
int main(){
	std::string number;
	int t,i;
	std::string dot(".");
	std::cin>>t;
	for(i=0;i<t;i++){
		std::cin>>number;
		//Find the position of .
		std::size_t posOfDot=number.find(dot);
		//If no dot=>only 1 game is required
		if(posOfDot==std::string::npos){
			std::cout<<1<<std::endl;
		}
		//Otherwise
		else{
			//Find the number
			std::string intNumber=number.substr(0,posOfDot)+number.substr(posOfDot+1);
			//find number of places after dot
			int frac=number.substr(posOfDot+1).length();
			long p=strToLong(intNumber.c_str());
			long q=pow(10, frac);
			std::cout<<q/gcd(p,q)<<std::endl;
		}
	}
}
long gcd(long p, long q){
	return q==0?p:gcd(q,p%q);
}
long strToLong(const char *numberStr){
	long number=0;
	//std::cout<<numberStr;
	int i=0;
	while(*(numberStr+i)!='\0'){
		number=number*10+(*(numberStr+i)-48);
		i++;
	}
	
	//astd::cout<<number;
	return number;
}
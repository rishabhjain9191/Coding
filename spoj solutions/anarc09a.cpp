#include <iostream>
#include <string>
using namespace std;
class stack{
private:
	char a[2001];
	//int len;
	int top;
	void dissolveMe(void);
public:
	stack(){
		top=-1;
		//length=top+1;
	}
	void push(char input);
	char pop(void);
	char peep(void);
	void reset(void);
	int length(void){
		return top+1;
	}
};
int checkReplacements(char , char );
int main(){
	stack mystack;
	char a,b;
	int replacements;
	string input;
	cin>>input;
	int i,t;
	t=1;
	while(input[0]!='-'){
		//cout<<input.length()<<"\n";
		for(i=0;i<input.length();i++){
			mystack.push(input[i]);
		}
		replacements=0;
		while(mystack.length()>0){
			//cout<<mystack.length()<<"\n";
			a=mystack.pop();
			b=mystack.pop();
						//cout<<a<<","<<b<<"\n";

			replacements+=checkReplacements(a,b);
			//i++;
		}
		cout<<t<<". "<<replacements<<"\n";
		t++;
		cin>>input;
	}
	return 0;
}
int checkReplacements(char a, char b){
	if(a=='}'&&b=='{')
		return 0;
	else if(a=='{'&&b=='{')
		return 1;
	else if(a=='}'&&b=='}')
		return 1;
	else
		return 2;
}
void stack::push(char input){
	top++;
	a[top]=input;
	if(input=='}'){
		dissolveMe();
	}
}
void stack::dissolveMe(){
	bool possible=true;
	//do{
		if(top>=1){
		if(a[top]=='}'&&a[top-1]=='{'){
			pop();
			pop();
		}
		else{
			possible=false;
		}
	}
	//}while(possible);
}
char stack::pop(void){
	char res=a[top];
	top--;
	return res;
}
char stack::peep(void){
	return a[top];
}
void stack::reset(void){
	top=-1;
}
#include <iostream>
#include <string>
#include <map>
using namespace std;
typedef struct Trie{
	Trie *ptr[26];
};
Trie *t;
void insertIntoTrie(char input[10]);
void printTrie(Trie *t);
bool isLeafNode(Trie *p);
char findChar(int, int);
int P(int start,int end, Trie *root);
void buildMap();
bool rootReset=false;

string seq;
int seqLen;
map<string, char> mymap;


/*
mymap[".-"]='A';
mymap["-..."]='B';
mymap["-.-."]='C';
mymap["-.."]='D';
mymap["."]='E';
mymap["..-."]='F';
mymap["--."]='G';
mymap["...."]='H';
mymap[".."]='I';
mymap[".---"]='J';
mymap["-.-"]='K';
mymap[".-.."]='L';
mymap["--"]='M';
mymap["-."]='N';
mymap["---"]='O';
mymap[".--."]='P';
mymap["--.-"]='Q';
mymap[".-."]='R';
mymap["...."]='S';
mymap["-"]='T';
mymap["..-"]='U';
mymap["...-"]='V';
mymap[".--"]='W';
mymap["-..-"]='X';
mymap["-.--"]='Y';
mymap["--.."]='Z';
*/

int main(){
	buildMap();
	t=new Trie;
	int i;
	char input[22];
	int noOfWords;
	cin>>seq;
	seqLen=seq.size();
	cin>>noOfWords;
	for(i=0;i<noOfWords;i++){
		cin>>input;
		insertIntoTrie(input);
	}
	cout<<P(0,0,t);
	return 0;
}
void buildMap(){
	mymap[".-"]='A';
	mymap["-..."]='B';
	mymap["-.-."]='C';
	mymap["-.."]='D';
	mymap["."]='E';
	mymap["..-."]='F';
	mymap["--."]='G';
	mymap["...."]='H';
	mymap[".."]='I';
	mymap[".---"]='J';
	mymap["-.-"]='K';
	mymap[".-.."]='L';
	mymap["--"]='M';
	mymap["-."]='N';
	mymap["---"]='O';
	mymap[".--."]='P';
	mymap["--.-"]='Q';
	mymap[".-."]='R';
	mymap["...."]='S';
	mymap["-"]='T';
	mymap["..-"]='U';
	mymap["...-"]='V';
	mymap[".--"]='W';
	mymap["-..-"]='X';
	mymap["-.--"]='Y';
	mymap["--.."]='Z';
}
int P(int start,int  end, Trie *root){
	cout<<start<<end;
	char c;
	if(end==seqLen){
		cout<<"In if : \n";
		c=findChar(start, end-1);
		cout<<c<<"\n";
		if(end-start==0){
			if(rootReset){
				rootReset=false;
				return 1;
			}
			if(isLeafNode(root)){
				cout<<"Returning 1";
				return 1;
			}
			cout<<"Returning 0";
			return 0;
		}
		else if(c=='$'){
			cout<<"Returning 0";
			return 0;
		}
		else{
			if(root->ptr[c-'A']==NULL){
				cout<<"Returning 0";
				return 0;
			}
			else{
				if(!isLeafNode(root->ptr[c-'A'])){
					cout<<"Returning 0";
					return 0;
				}
				else{
					cout<<"Returning 1";
					return 1;
				}
			}

		}
	}
	else{
		int ans;
		cout<<"In Else : \n";
		int opt1=0, opt2=0;
		c=findChar(start, end);
		cout<<c<<"\n";
		if(c!='$'){
			if(root->ptr[c-'A']==NULL){
				opt1+=P(start, end+1, root);
			}
			else{
				printf("%c ", c);
				if(!isLeafNode(root->ptr[c-'A'])){
					cout<<"is not leaf node\n";
					opt1+=P(end+1, end+1, root->ptr[c-'A']);
				}
				else{
					cout<<"is leaf node\n";
					rootReset=true;
					opt1+=P(end+1, end+1, t);
				}
			}
		}
		opt2+=P(start, end+1, root);
		cout<<"returing "<<opt1+opt2;
		return opt1+opt2;
	}
}
void insertIntoTrie(char input[10]){
	Trie *p=t;
	for(int i=0;i<strlen(input);i++){
		if(p->ptr[input[i]-'A']==NULL){
			cout<<"inserting"<<"\n";
			p->ptr[input[i]-'A']=new Trie;
		}
		p=p->ptr[input[i]-'A'];
	}
}
bool isLeafNode(Trie *p){
	for(int i=0;i<26;i++){
		if(p->ptr[i]!=NULL)
			return false;
	}
	return true;
}
char findChar(int start, int end){
	string s(seq.substr(start, end-start+1));
	map<string, char>::iterator p;
	p=mymap.find(s);
	if(p==mymap.end())
		return '$';
	return p->second;
}
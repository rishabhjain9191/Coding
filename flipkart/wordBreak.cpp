#include <iostream>
#include <string>
using namespace std;
typedef struct Trie{
	Trie *a[27];
	Trie(){
		for(int i=0;i<27;i++){
			a[i]=NULL;
		}
	}
};
void process(char a[20]);
bool P(int index, Trie *p);

Trie *t;
char s[200];
int main(){
	int totalWords;
	char input[20];
	t=new Trie;
	cin>>totalWords;
	for(int i=0;i<totalWords;i++){
		cin>>input;
		//process(input);
	}
	char abc[100];
	cin.getline(abc, sizeof(abc));
	//cin>>s;
	cout<<abc;
	//cout<<P(0, t);
	return 0;
}

bool P(int index, Trie *p){
	cout<<index<<"\n";
	if(index>=strlen(s)){
		return true;
	}
	if(s[index]==' '){
		return P(index+1, p);
	}
	if(p->a[s[index]-'a']!=NULL){
		p=p->a[s[index]-'a'];
	}
	else{
		return false;
	}
	if(p->a['$'-'a']!=NULL){
		return P(index+1, p);
	}
	else{
		return P(index+1, p)+P(index+1, t);
	}
}
void process(char str[20]){
	Trie *temp=t;
	for(int i=0;i<strlen(str);i++){
		if(temp->a[str[i]-'a']!=NULL){
			temp=temp->a[str[i]-'a'];
		}
		else{
			temp->a[str[i]-'a']=new Trie;
		}
	}
	//Leaf node;
	temp->a[27]=new Trie;
}
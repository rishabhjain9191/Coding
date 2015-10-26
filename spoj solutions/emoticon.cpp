#include <iostream>
#include <string>
#include <map>
using namespace std;
typedef struct Trie{
	map<char, Trie *> valueAt;
};
Trie *root;
void insertIntoTrie(char emoticon[]);
bool findInTrie(string s, int index, Trie *t);
int P(string s, int index, Trie *t, int);
int main(){
	int n;
	root=new Trie();
	char emoticon[101];
	cin>>n;
	for(int i=0;i<n;i++){
		cin>>emoticon;
		insertIntoTrie(emoticon);
	}
	int m;
	cin>>m;
	string s;
	for(int i=0;i<m;i++){
		cin>>s;
		cout<<P(s, 0, root, 0)<<"-----\n";
	}
	return 0;
}
int P(string s, int index, Trie *t, int call){
	cout<<"Call : "<<call<<"\n";
	cout<<index<<"\n";
	if(index>s.length()){return 0;}
	if(t==NULL){return 0;}
	if(t->valueAt['@']!=NULL){
		cout<<"at block 1, index = "<<index<<"\n";
		int res=1+P(s, index+1, t->valueAt[s[index]], 1);
		//cout<<"in block 1"
		return res;
	}
	if(t->valueAt[s[index]]!=NULL){
		int res=P(s, index+1, t->valueAt[s[index]], 2)+P(s, index+1, root, 3);
		return res;
	}
	else{
		return 0;
	}
}
void insertIntoTrie(char emoticon[]){
	int l=strlen(emoticon);
	Trie *t=root;
	for(int i=0;i<l;i++){
		if((t->valueAt).find(emoticon[i])==(t->valueAt).end()){
			t->valueAt[emoticon[i]]=new Trie;
		}
		t=t->valueAt[emoticon[i]];
	}
	t->valueAt['@']=new Trie;
}
bool findInTrie(string s, int index, Trie *t){
	cout<<index<<"\n";
	if(index>=s.length()){
		if(t->valueAt['@']==NULL)return false;
		else return true;
	}
	else{
		if(t->valueAt[s[index]]!=NULL){
			return findInTrie(s, index+1, t->valueAt[s[index]]);
		}
		else{
			return false;
		}
	}
}

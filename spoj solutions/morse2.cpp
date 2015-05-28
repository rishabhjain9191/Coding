#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <cstring>
#include <cstdlib>
using namespace std;
map<char,string> MorseCode;
map<char,int> Index;
typedef struct Trie{
	Trie *ptr[3];
	int leafCount;
	map<int, int> store;
	Trie(){
		ptr[0]=NULL;
		ptr[1]=NULL;
		ptr[2]=NULL;
		leafCount=0;
	}
};
vector<Trie *> *nodes;
map<int, int >::iterator iter1;
map<int, int >::iterator iter2;
map<int, int> temp;
Trie *t;
string seq;
int seqLen;

int P(Trie *root, int charToConsider);
bool isLeafNode(Trie *node);
void process(char input[21]);
void insertMorseCodeInTrie(string mc);
void buildMap();
void deleteTrie();
int counter=0;
int main(){
	buildMap();
	int T;
	cin>>T;
	while(T--){
		t=new Trie;
		nodes=new vector<Trie *>;
		int i;
		char input[22];
		int noOfWords;
		cin>>seq;
		seqLen=seq.size();
		cin>>noOfWords;
		for(i=0;i<noOfWords;i++){
			cin>>input;
			process(input);
		}
		cout<<P(t, 0)<<"\n";
		deleteTrie();
		delete nodes;
	}
	return 0;
}
int P(Trie *root, int charToConsider){
	//cout<<charToConsider<<"\n";
	root=root->ptr[Index[seq[charToConsider]]];
	if(root==NULL){
		//cout<<"First Return \n";
		return 0;
	}
	if(charToConsider>=seqLen-1){
		if(isLeafNode(root))
			return root->leafCount;
		return 0;
	}
	iter1=root->store.find(charToConsider);
	if(iter1!=root->store.end()){
		return iter1->second;
	}
	if(isLeafNode(root)){
		//cout<<"Leaf found\n";
		int ans= P(t, charToConsider+1)*root->leafCount + P(root, charToConsider+1);
		//cout<<ans<<"L\n";
		root->store[charToConsider]=ans;
		return ans;
	}
	else{
		//cout<<"Non Leaf\n";
		int ans= P(root, charToConsider+1);
		//cout<<ans<<"E\n";
		root->store[charToConsider]=ans;
		return ans;
	}
}
bool isLeafNode(Trie *node){
	if(node->ptr[2])
		return true;
	return false;
}
void process(char input[21]){
	//cout<<++counter<<" :  ";
	int i,j,k=0;
	string mc;
	Trie *p=t;
	Trie *temp;
	for(j=0;j<strlen(input);j++){
		mc=MorseCode[input[j]];
		//cout<<mc;
		for(i=0;i<mc.size();i++){
			if(p->ptr[Index[mc[i]]]==NULL){
				temp=new Trie;
				p->ptr[Index[mc[i]]]=temp;
				nodes->push_back(temp);
			}
			p=p->ptr[Index[mc[i]]];
			
		}
		k+=i;
	}
	//cout<<" : "<<k<<"\n";
	p->leafCount++;
	p->ptr[Index['$']]=new Trie;
}
void deleteTrie(){
	for(int i=0;i<nodes->size();i++){
		delete nodes->at(i);
	}
}
void buildMap(){
	MorseCode['A']=".-";
	MorseCode['B']="-...";
	MorseCode['C']="-.-.";
	MorseCode['D']="-..";
	MorseCode['E']=".";
	MorseCode['F']="..-.";
	MorseCode['G']="--.";
	MorseCode['H']="....";
	MorseCode['I']="..";
	MorseCode['J']=".---";
	MorseCode['K']="-.-";
	MorseCode['L']=".-..";
	MorseCode['M']="--";
	MorseCode['N']="-.";
	MorseCode['O']="---";
	MorseCode['P']=".--.";
	MorseCode['Q']="--.-";
	MorseCode['R']=".-.";
	MorseCode['S']="...";
	MorseCode['T']="-";
	MorseCode['U']="..-";
	MorseCode['V']="...-";
	MorseCode['W']=".--";
	MorseCode['X']="-..-";
	MorseCode['Y']="-.--";
	MorseCode['Z']="--..";

	Index['-']=0;
	Index['.']=1;
	Index['$']=2;
}
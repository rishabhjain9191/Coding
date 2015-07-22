#include <iostream>
#include <map>
#include <stack>
using namespace std;
typedef struct Directory{
	string name;
	Directory *parent;
	map<string, Directory *> folders;
};
Directory *root=new Directory;
Directory *currentDirectory=root;

void displayPWD();
void processCD();

int main(){
	root->name="/";
	root->parent=NULL;
	int noOfCommands;
	string command;
	cin>>noOfCommands;
	for(int i=0;i<noOfCommands;i++){
		cin>>command;
		if(command=="pwd")
			displayPWD();
		else
			processCD();
	}
	return 0;
}
void processCD(){
	//cout<<"process cd";
	Directory *temp;
	string param, dir;
	map<string, Directory *>::iterator iter;
	cin>>param;
	size_t index=0;
	size_t nextDirIndex;
	Directory *cur;
	if(param[0]=='/'){
		cur=root;
		index++;
	}
	else
		cur=currentDirectory;
	while(nextDirIndex!=string::npos){
		nextDirIndex=param.find("/", index);
		dir=param.substr(index, nextDirIndex-index);
		if(dir==".."){
			cur=cur->parent;
		}
		else{
			iter=cur->folders.find(dir);
			if(iter==cur->folders.end()){
				temp=new Directory;
				temp->name=dir;
				temp->parent=cur;
				cur->folders[dir]=temp;
				cur=temp;
			}
			else{
				cur=iter->second;
			}
		}
		index=nextDirIndex+1;
	}
	currentDirectory=cur;
}
void displayPWD(){
	stack<string> result;
	result.push("/");
	Directory *cur;
	cur=currentDirectory;
	while(cur->name!="/"){
		result.push(cur->name);
		result.push("/");
		cur=cur->parent;
	}
	while(!result.empty()){
		cout<<result.top();
		result.pop();
	}
	cout<<"\n";
}
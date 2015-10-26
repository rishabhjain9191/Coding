#include <iostream>
#include <vector>
using namespace std;
vector<int> *Tree;
bool visited[100002]={false};
bool visited2[100002]={false};
int VC[100002]={0};
int noOfNodes;

int vertexCover(int rootVertex);

int main(){
	int v1, v2;
	cin>>noOfNodes;
	Tree=new vector<int>[noOfNodes+1];
	for(int i=0;i<noOfNodes-1;i++){
		cin>>v1>>v2;
		Tree[v1].push_back(v2);
		Tree[v2].push_back(v1);
	}
	visited[0]=true;
	visited2[0]=true;

	cout<<vertexCover(1)<<"\n";
	return 0;
}
int vertexCover(int rootVertex){
	//cout<<"Root-"<<rootVertex<<"\n";
	if(VC[rootVertex])
		return VC[rootVertex];
	int opt1=1, opt2=0;
	int child;
	visited[rootVertex]=true;
	//visited2[rootVertex]=true;

	//opt1-Root is visited, Calculate vertex cover of all children
	for(int i=0;i<Tree[rootVertex].size();i++){
		child=Tree[rootVertex][i];
		if(!visited[child]){
			//treat root as incuded in vertex cover
			opt1+=vertexCover(child);
			//Root is not included in the vertex cover, so all its children need to be added to vertex cover-adding 1 + vertex cover of the grandchildren.
			//cout<<"child="<<child<<"\n";
			visited2[child]=true;
			opt2++;
			for(int j=0;j<Tree[child].size();j++){
				//opt2+=1;
				//cout<<Tree[child][j]<<"\n";
				if(/*!visited2[Tree[child][j]]&&*/Tree[child][j]!=rootVertex){
					//cout<<"Calculating opt2\n";
					opt2+=vertexCover(Tree[child][j]);
				}
				else{
					//opt2+=VC
				}
			}
		}
	}
	//cout<<"("<<opt1<<opt2<<")"<<"\n";
	int ans;
	ans=min(opt1,opt2);
	if(ans<0)
		ans=0;
	VC[rootVertex]=ans;
	return ans;
	
	
}

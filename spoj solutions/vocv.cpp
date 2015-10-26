#include <iostream>
#include <vector>
using namespace std;

#define MOD 10007;
vector<int> *Tree;
bool visited[100002]={false};
int VC[100002]={0};
int ns[100002]={0};
int noOfNodes;

int vertexCover(int rootVertex);

int main(){
	int v1, v2,t,i;
	cin>>t;
	while(t--){
	cin>>noOfNodes;
	Tree=new vector<int>[noOfNodes+1];
	for(i=0;i<noOfNodes-1;i++){
		cin>>v1>>v2;
		Tree[v1].push_back(v2);
		Tree[v2].push_back(v1);
		ns[i]=1;
		visited[i]=false;
		VC[i]=0;
	}
	ns[i]=1;
	visited[i]=false;
	visited[i+1]=false;
	VC[i]=0;
	VC[i+1]=0;

	visited[0]=true;
	
	cout<<vertexCover(1)<<" ";
	cout<<ns[1]<<"\n";
	delete []Tree;
	}
	return 0;
}
int vertexCover(int rootVertex){
	if(VC[rootVertex])
		return VC[rootVertex];
	int opt1=1, opt2=0;
	int ns_opt1=1, ns_opt2=1;
	int child;
	visited[rootVertex]=true;
	//opt1-Root is visited, Calculate vertex cover of all children
	for(int i=0;i<Tree[rootVertex].size();i++){
		child=Tree[rootVertex][i];
		if(!visited[child]){
			//treat root as incuded in vertex cover
			opt1+=vertexCover(child);
			ns_opt1=(ns_opt1*ns[child])%MOD;
			//Root is not included in the vertex cover, so all its children need to be added to vertex cover-adding 1 + vertex cover of the grandchildren.
			opt2++;
			for(int j=0;j<Tree[child].size();j++){
				if(Tree[child][j]!=rootVertex){
					opt2+=vertexCover(Tree[child][j]);
					ns_opt2=(ns_opt2*ns[Tree[child][j]])%MOD;
				}
			}
		}
	}
	int ans;
	ans=min(opt1,opt2);
	if(opt1==opt2){
		ns[rootVertex]=(ns_opt1+ns_opt2)%MOD;
	}
	else if(opt1<opt2)
		ns[rootVertex]=ns_opt1;
	else
		ns[rootVertex]=ns_opt2;
	VC[rootVertex]=ans;
	return ans;
}

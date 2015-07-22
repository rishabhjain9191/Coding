#include <iostream>
#include <vector>
#define MAX 1010
using namespace std;
int labyrinth[MAX][MAX];
vector<pair<int, int> > nodes;
vector<int> *Tree;
bool visited[MAX*MAX];
int maxVertex=0;
pair<int, int> top;

int Diameter(int Startingnode);
int P(int node, int dist);

int main(){
	int testCases;
	int row, column;
	int currentRow, currentCol;
	char block;
	cin>>testCases;
	while(testCases--){
		cin>>column>>row;
		for(int i=0;i<row;i++){
			for(int j=0;j<column;j++){
				cin>>block;
				labyrinth[i][j]=-1;
				if(block=='.'){
					nodes.push_back(make_pair(i, j));
					labyrinth[i][j]=nodes.size()-1;
				}
				
			}
		}
/*		for(int i=0;i<row;i++){
			for(int j=0;j<column;j++){
				cout<<labyrinth[i][j]<<" ";
			}
			cout<<"\n";
		}*/
		Tree=new vector<int>[nodes.size()+1];
		for(int i=0;i<nodes.size();i++){
			currentRow=nodes[i].first;
			currentCol=nodes[i].second;
			if(currentRow>0){
				if(labyrinth[currentRow-1][currentCol]!=-1)
					Tree[i].push_back(labyrinth[currentRow-1][currentCol]);
			}
			if(currentRow<row-1){
				if(labyrinth[currentRow+1][currentCol]!=-1){
					Tree[i].push_back(labyrinth[currentRow+1][currentCol]);		
				}
			}
			if(currentCol>0){
				if(labyrinth[currentRow][currentCol-1]!=-1)
					Tree[i].push_back(labyrinth[currentRow][currentCol-1]);
			}
			if(currentCol<column-1){
				if(labyrinth[currentRow][currentCol+1]!=-1){
					Tree[i].push_back(labyrinth[currentRow][currentCol+1]);		
				}
			}

		}
		/*cout<<"\n";
		for(int i=0;i<nodes.size();i++){
			cout<<i<<"->";
			for(int j=0;j<Tree[i].size();j++){
				cout<<Tree[i][j]<<"->";
			}
			cout<<"/\n";
		}*/
		cout<<"Maximum rope length is "<<Diameter(0)<<"."<<"\n";
		delete []Tree;
		nodes.clear();
	}
	return 0;
}
int Diameter(int Startingnode){
	int res1, res2;
	top.first=top.second=0;
	for(int i=0;i<=nodes.size();i++)
		visited[i]=false;
	P(Startingnode, 0);
	//top.first=top.second=0;
	//cout<<maxVertex<<"\n";
	for(int i=0;i<=nodes.size();i++)
		visited[i]=false;
	res2=P(top.second, 0);
	return top.first;
}
int P(int node, int dist){
	//cout<<node<<" "<<dist<<"\n";
	visited[node]=true;
	int maxi=0;
	if(dist>top.first){
		top.first=dist;
		top.second=node;
	}
	for(int i=0;i<Tree[node].size();i++){
		if(!visited[Tree[node][i]])
			maxi=max(maxi, P(Tree[node][i], dist+1));
	}
	return maxi;
}
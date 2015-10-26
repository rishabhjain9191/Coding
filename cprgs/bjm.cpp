#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;
pair<int, int> go(pair<int, int > from, int direction);
int main(){
	vector <pair<int, int> > res;
	pair<int, int> current;
	int directions[6]={1, 2, 3, 4, 5, 6};
	current=make_pair(0,0);
	res.push_back(current);
	int N=183;
	int n=1;
	for(int i=0;i<N;i++){
		current=go(current, 6);
		res.push_back(current);
		//res[n++]=current;
		for(int k=0;k<i;k++){
			current=go(current, directions[0]);
			res.push_back(current);
			//res[n++]=current;
		}
		for(int j=1;j<6;j++){
			for(int k=0;k<i+1;k++){
				current=go(current, directions[j]);
				res.push_back(current);
				//res[n++]=current;
			}
		}
	}
	int input;
	while(scanf("%d", &input)==1){
		printf("%d %d\n", res[input-1].first, res[input-1].second);
	}
	/*for(int i=0;i<res.size();i++){
			cout<<res[i].first<<", "<<res[i].second<<"\n";
	}*/
	return 0;
}
pair<int, int> go(pair<int, int > from, int direction){
	pair<int, int> res;
	res=from;
	switch(direction){
		case 1:
			//diagnol down, x-1, y+1
			res.first--;
			res.second++;
			break;
		case 2:
			//left, x-1
			res.first--;
			break;
		case 3:
			//up, y-1
			res.second--;
			break;
		case 4:
			//diagnol up, x+1, y-1
			res.first++;
			res.second--;
			break;
		case 5:
			//right, x+1
			res.first++;
			break;
		case 6:
			//down, y+1
			res.second++;
			break;
	}
	return res;
}
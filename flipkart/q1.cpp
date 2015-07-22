#include <iostream>
#include <queue>
using namespace std;
queue<int> q;
int main(){
	int noOfGroups, busCapacity, input, rounds;
	cin>>noOfGroups>>busCapacity>>rounds;
	for(int i=0;i<noOfGroups;i++){
		cin>>input;
		q.push(input);
	}
	int earnings=0, people, p, p1;
	while(rounds--){
		people=0;
		p1=0;
		p1+=q.front();
		while(p1<=busCapacity){
			people+=q.front();
			p=q.front();
			q.pop();
			q.push(p);
			p1+=q.front();
		}
		earnings+=people;
	}
	cout<<earnings<<"\n";
	return 0;
}
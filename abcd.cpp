#include <iostream>
using namespace std;
int tSteps=0;
int total=0;
int d=0;
int P, Q, N;

void Pr(int x, int y, int steps);
int main(){
	int x, y;
	cin>>P>>Q>>N>>x>>y;
	Pr(x, y, 0);
	cout<<(tSteps-d)*100/tSteps;
	return 0;
}

void Pr(int x, int y, int steps){
	if(steps==N){
		tSteps++;
		if(x<0||x>P){
			d++;
		}
		else if(y<0||y>Q){
			d++;
		}
		return;
	}
	else{
		Pr(x+1, y, steps+1);
		Pr(x-1, y, steps+1);
		Pr(x, y+1, steps+1);
		Pr(x, y-1, steps+1);
	}
}
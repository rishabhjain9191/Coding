#include <iostream>
#include <map>
using namespace std;
#define INF 10101010.10101010
typedef struct point{
	int x;
	int y;
};
point gunPoints;
float slope(point input);
int main(){
	point input;
	map<float, int> slopes;
	map<float, int>::iterator iter;
	int noOfPoints;
	cin>>noOfPoints;
	cin>>gunPoints.x;
	cin>>gunPoints.y;
	int sl, linesRequired=0;
	for(int i=0;i<noOfPoints;i++){
		cin>>input.x>>input.y;
		sl=slope(input);
		iter=slopes.find(sl);
		if(iter==slopes.end()){
			slopes[sl]=1;
			linesRequired++;
		}	
	}
	cout<<linesRequired<<"\n";
	return 0;
}
float slope(point input){
	if(gunPoints.x-input.x==0)
		return INF;
	return (gunPoints.y-input.y)/(gunPoints.x-input.x);
}
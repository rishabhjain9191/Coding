#include <iostream>
using namespace std;
int Station[100002];
int main(){
	int t,i;
	int j,stations;
	long int maxPeople;
	cin>>t;
	for(i=0;i<t;i++){
		cin>>stations>>maxPeople;
		for(j=0;j<stations;j++){
			cin>>Station[j];
		}
		Station[j]=10;
		int maxStationsVisited=0;
		int startingPoint=0;
		int currentPoint=-1;
		long int peopleSeen=0;
		long int minPeopleSeen=maxPeople+1;
		long int maxPeopleSeen=0;
		int stationsVisited=-1;
		do{
		while(maxPeopleSeen<=maxPeople&&currentPoint<stations){
			stationsVisited++;
			peopleSeen=maxPeopleSeen;
			currentPoint++;
			maxPeopleSeen+=Station[currentPoint];
		}
		if(stationsVisited>=maxStationsVisited){
			maxStationsVisited=stationsVisited;
			minPeopleSeen=peopleSeen;
		}
		//change the starting point of the window
		maxPeopleSeen=maxPeopleSeen-Station[startingPoint];
		startingPoint++;
		stationsVisited--;
		}while(startingPoint<stations);
		cout<<minPeopleSeen<<" "<<maxStationsVisited<<"\n";
	}
	return 0;
}

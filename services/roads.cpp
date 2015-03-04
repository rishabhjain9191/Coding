#include <iostream>
#include <map>
using namespace std;
typedef struct{
	int destination;
	int length;
	int toll;
	Road *next;
}Road;
std::map<int, Road *> paths;
int coins, cities, roads;
void insertRoad(int s, int d, int l, int t);
int main(){
	int T,i;
	int s,d,l,t;
	Road *j;
	Road *r=NULL;
	cin>>t;
	while(T--){
		cin>>coins>>cities>>roads;
		for(i=1;i<=cities;i++){
			paths.insert(i, r);
		}
		for(i=0;i<roads;i++){
			cin>>s>>d>>l>>t;
			insertRoad(s, d, l, t);
		}
		for(i=1;i<=cities;i++){
			cout<<i<<"-->";
			for(j=paths[i];j!=null;j=j->next){
				cout<<j->destination<<", "<<j->length<<", "<<j->toll;
				cout<<"->";
			}
			cout<<"\n";
		}
	}
	return 0;
}
void insertRoad(int s, int d, int l, int t){
	Road *r=new Road();
	r.destination=d;
	r.length=l;
	r.toll=t;
	r.next=paths[s];
	paths[s]=r;
}
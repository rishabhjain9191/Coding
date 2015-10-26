#include <iostream>
#include <queue>
using namespace std;
int main(){
	int t;
	int n1, n2, input;
	cin>>t;
	while(t--){
		priority_queue<int> GodzillaMonsters, MechaGodzillaMonsters;
		cin>>n1>>n2;
		for(int i=0;i<n1;i++){
			cin>>input;
			GodzillaMonsters.push(input);
		}	
		for(int i=0;i<n2;i++){
			cin>>input;
			MechaGodzillaMonsters.push(input);
		}
		while(!GodzillaMonsters.empty() && !MechaGodzillaMonsters.empty()){
			if(GodzillaMonsters.top()<MechaGodzillaMonsters.top()){
				GodzillaMonsters.pop();
			}
			else if(MechaGodzillaMonsters.top()<GodzillaMonsters.top()){
				MechaGodzillaMonsters.pop();
			}
			else{
				MechaGodzillaMonsters.pop();
			}
		}
		if(MechaGodzillaMonsters.empty()){
			cout<<"Godzilla\n";
		}
		else if(GodzillaMonsters.empty()){
			cout<<"MechaGodzilla\n";
		}
	}
	return 0;
}
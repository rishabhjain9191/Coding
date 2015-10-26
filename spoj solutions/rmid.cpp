#include <iostream>
#include <cstdio>
#include <list>
using namespace std;
int main(){
	int input;
	bool putEmptyLine=false;
	list<int> numbers;
	list<int>::iterator median, prev, next;
	int count=0;
	median=numbers.begin();
	while(scanf("%d", &input)!=EOF){
		switch(input){
			case 0:
				numbers.clear();
				median=numbers.begin();
				putEmptyLine=true;
				break;
			case -1:
				if(putEmptyLine){printf("\n");putEmptyLine=false;}
				printf("%d\n", *median);
				median--;prev=median;median++;
				median++;next=median;median--;
				numbers.erase(median);
				(count&1)?median=prev:median=next;
				count--;
				break;
			default:
				numbers.push_back(input);
				count++;
				if(count&1)
					median++;
				break;
		}
	}
	return 0;
}

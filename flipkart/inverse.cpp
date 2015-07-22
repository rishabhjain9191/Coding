#include <iostream>
#define MAX 100
using namespace std;

int merge(int *, int first, int mid, int last);
int inverse(int *, int first, int last);

int main(){
	int size;
	int array[MAX];
	cin>>size;
	for(int i=0;i<size;i++){
		cin>>array[i];
	}
	cout<<"The inverse is : "<<inverse(array, 0, size-1)<<"\n";
	return 0;
}
int inverse(int *a, int first, int last){
	if(first>=last){
		return 0;
	}
	else{
		int noOfInverses=0;
		int mid=(first+last)/2;
		noOfInverses+=inverse(a, first, mid);
		noOfInverses+=inverse(a, mid+1, last);
		noOfInverses+=merge(a, first, mid, last);
		return noOfInverses;
	}
}
int merge(int *a, int first, int mid, int last){
	//Sorted : first-mid and mid+1-last
	//cout<<first<<", "<<mid<<", "<<last<<"\n";
	int p1, p2, minElem;
	int temp[100];
	int count=0, invCount=0;
	p1=first;
	p2=mid+1;
	while(p1<=mid && p2<=last){
		minElem=min(a[p1], a[p2]);
		temp[count++]=minElem;
		if(minElem==a[p1]){
			p1++;
		}
		else{
			invCount+=mid-p1+1;
			//cout<<invCount<<"\n";
			p2++;
		}
	}
	while(p1<=mid){
		temp[count++]=a[p1++];
	}
	while(p2<=last){
		temp[count++]=a[p2++];
	}
	count=0;
	for(int i=first;i<=last;i++){
		a[i]=temp[count++];
	}
	return invCount;
}
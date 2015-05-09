#include <iostream>
#include <string>
//using namespace std;
bool isPalindrome(std::string);
int main()
{
	std::string abc, sub;
	std::cin>>abc;
	int stringlength=abc.length();
	int noOfSubstrings,numberofsubstring, substrings, lengthOfSubstring;

	lengthOfSubstring=stringlength;

	for(noOfSubstrings=1;noOfSubstrings<=stringlength-1;noOfSubstrings++){
		for(substrings=0;substrings<noOfSubstrings;substrings++){
			sub=abc.substr(substrings,lengthOfSubstring);
			if(isPalindrome(sub)){
				std::cout<<"Max Length = "<<lengthOfSubstring<<"\n";
				std::cout<<"SubString : "<<sub;

				return 0;
			}
		}
		lengthOfSubstring--;
	}
}
bool isPalindrome(std::string sub){
	int length=sub.length();
	int i, match=0;
	if(length==1){
		return true;
	}
	else{
		for(i=0;i<length/2;i++){
			if(sub.at(i)==sub.at(length-i-1)){
				match++;
			}
		}
		if(match==length/2){
			return true;
		}
		else{
			return false;
		}

	}
	return false;

}

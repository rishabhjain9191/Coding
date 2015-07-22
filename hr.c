#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>
#include <assert.h>
#include <limits.h>
#include <stdbool.h>
char* removeDuplicateChars(char* input) {
    int arr[26]={0};
    int i,j=0;
    char *res=(char *)malloc(10240*sizeof(char));
    printf("%s", input);
    for(i=0;i<strlen(input);i++){
        if(!arr[input[i]-'a']){
            res[j]=input[i];
            arr[input[i]-'a']=1;
            j++;
        }
    }
    res[j]='\0';
    printf("\n%s\n", res);
    return res;
}
int main() {
    //FILE *f = fopen(getenv("OUTPUT_PATH"), "w");
    char* res;
    char* _input;
    _input = (char *)malloc(10240 * sizeof(char));
    scanf("\n%[^\n]",_input);
    printf("%s\n", _input);
    res = removeDuplicateChars(_input);
    //fprintf(f, "%s\n", res);
    
    //fclose(f);
    return 0;
}

#include<stdio.h>  
#include<string.h> 
int  main()  
{  
        //Defining  variables                
        char  pattern[30];  
        int i, j, len, len1;

        //Fetching  input  from  console  
        gets(pattern);  
                      
        
        j=strlen(pattern);
        len=j;
        if(len>=2)
        {
        for(i=strlen(pattern)-2;i>=0;i--){
        	pattern[j]=pattern[i];
        	j++;
        }
        pattern[j]='\0';
        printf("%s\n", pattern);
        len1=strlen(pattern);
        pattern[len-1]=' ';
        printf("%s\n", pattern);
        for(i=1;i<=len-2;i++){
        	pattern[len-i-1]=' ';
        	pattern[len+i-1]=' ';
        	printf("%s\n", pattern);
        }
    }
    else if(len==1){
    	printf("%c%c", pattern[0], pattern[0]);
    }
        return  0;  
}
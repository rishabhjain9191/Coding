#include<stdio.h>  
  
int  main()  
{  
  //Declaring  variables  
        int  a[5][5],p,q;  
        int totalpoints=0;  
        int i,j; 
        int r,c;                               
        //Fetching  input  from  console  
        for  (p  =  0;  p  <  5;  p++)  
        {  
                for  (q  =  0;  q  <  5;  q++)  
                {  
  
                        scanf("%d",&a[p][q]);  
                }  
        }  
  
        for(p=0;p<5;p++){
            for(q=0;q<5;q++){
                r=0;
                c=0;
                for(i=0;i<5;i++){
                    if(i!=q){
                        if(a[p][q]<a[p][i]){
                            r=1;
                        }
                    }
                }
                for(j=0;j<5;j++){
                    if(j!=p){
                        if(a[p][q]>a[j][q]){
                            c=1;
                        }
                    }
                }
                if(r+c==0){
                    printf("%d,%d\n", p+1,q+1);
                    totalpoints++;
                }
            }
        }
        if(totalpoints==0){
            printf("No saddle points\n");
        }  
                        
        return  0;  
          
}
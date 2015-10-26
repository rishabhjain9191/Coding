#include <stdio.h>
int modulo(int a, int b, int c){
int i;
long long res=1;
for(i=0;i<b;i++){
res*=a;
res%=c;
}
return res%c;
}
int main(){
int res;
printf("%d", modulo(4,8,3));
printf("%d", 32%3);
res=32;
res%=3;
printf("%d", res);
}


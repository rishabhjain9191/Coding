from array import array
n=input()
DP=array('i',[])
DP[0]=0
DP[1]=2
DP[2]=3
if n==1:
	print DP[1]
elif n==2:
	print DP[2]
else:
	for i in range(3,n+1):
		DP[i]=DP[i-1]+DP[i-2]
	print DP[n]
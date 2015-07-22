import sys
import re
def hcf(a, b):
	if a==0:
		return b
	return hcf(b%a, a)

pat=re.compile(r'[a-zA-Z]+')
wordsEncountered={}
noOfGames=0
s=0
for line in sys.stdin:
   	words=pat.findall(line)
   	for word in words:
   		if word=="BULLSHIT":
   			noOfGames=noOfGames+1
   			s+=len(wordsEncountered)
   			wordsEncountered={}
   		else:
   			word=word.lower();
	   		if word in wordsEncountered:
	   			continue
	   		else:
	   			wordsEncountered[word]=1
d=hcf(s, noOfGames)
print s/d,"/", noOfGames/d


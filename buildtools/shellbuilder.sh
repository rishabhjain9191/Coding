#!/bin/bash

rm -f ./builds/TimeTrackerCSExtension.zxp
rsync -av --exclude='buildtools' --exclude='.git*' '../' './temp/'

read -s -p "Enter Password: " mypassword
 ./ZXPSignCmd -sign ./temp/ ./builds/TimeTrackerCSExtension.zxp ./cert/latestSigningCertificate.p12 $mypassword -tsa http://tsa.starfieldtech.com

rm -r ./temp/
open ./builds/TimeTrackerCSExtension.zxp

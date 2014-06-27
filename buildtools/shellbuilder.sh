#!/bin/bash

rm -f ./builds/TimeTrackerCSExtension.zxp
rsync -av --exclude='buildtools' --exclude='.git*' '../' './temp/'

read -s -p "Enter Password: " mypassword
 ./ZXPSignCmd -sign ./temp/ ./builds/TimeTrackerCSExtension.zxp ./cert/signingCertificate.p12 $mypassword -tsa https://timestamp.geotrust.com/tsa

rm -r ./temp/
open ./builds/TimeTrackerCSExtension.zxp
#!/bin/bash

./testVersionAndIdEqual.sh
if [[ $? != 100 ]]; then
	./build.sh
fi
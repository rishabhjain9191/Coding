#!/bin/bash

TESTVERSIONANDIDEQUALPASS=true

function populateArrayFromXPathsArrayUsingRegex() {
	declare -a array=("${!1}")
	RESULTARRAY=()
	local regex=$2 xmlLintCmd="xmllint ../CSXS/manifest.xml --xpath "
	for i in ${!array[@]}; do
		array[$i]=`$xmlLintCmd ${array[$i]}`
		if [[ ${array[$i]} =~ $regex ]]; then
			RESULTARRAY[$i]="${BASH_REMATCH[1]}"
#			echo afterRegex ${RESULTARRAY[$i]}
		fi
	done
}

function allEqual() {
	PASSED=true
	if [[ "${!1}" ]]; then
		declare -a array=("${!1}")
	    local COMPARE=""
		for i in ${!array[@]}; do
			if [[ $COMPARE == "" ]]; then
				COMPARE=${array[$i]}
			elif [[ $COMPARE != ${array[$i]} ]]; then
				PASSED=false
				echo 'Error:' ${array[$i]} 'not equal to' $COMPARE
			fi
			#echo $COMPARE ${array[$i]}
		done
	else
		PASSED=false
		echo 'Error: Empty array passed into allEqual'
	fi
}

function logTestResult() {
	local passMsg=$1
	if [[ $PASSED == true ]]; then
		echo 'PASS:' $passMsg
	else
		echo 'FAIL: NOT' $passMsg
		TESTVERSIONANDIDEQUALPASS=false
		exit 100
	fi
}

versionRegex="[^\"]*=\"([^\"]*)\""
versionXPaths=("//ExtensionList/Extension/@Version" "//ExtensionManifest/@ExtensionBundleVersion")
populateArrayFromXPathsArrayUsingRegex versionXPaths[@] $versionRegex
#echo ${RESULTARRAY[@]}
allEqual RESULTARRAY[@]
logTestResult 'All version numbers equal in manifest.xml'

#"//HostList/Host"

idRegex="[^\"]*=\"([^\"\.]*)[\"\.]"
IDXPaths=("//ExtensionManifest/@ExtensionBundleId" "//ExtensionList/Extension/@Id" "//DispatchInfoList/Extension/@Id" )
populateArrayFromXPathsArrayUsingRegex IDXPaths[@] $idRegex
#echo ${RESULTARRAY[@]}
allEqual RESULTARRAY[@]
logTestResult 'All version numbers equal in manifest.xml'

# TODO: Get and write the Id and Version #
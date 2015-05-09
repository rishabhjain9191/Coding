/*
 * AE2A.cpp
 *
 *  Created on: Apr 18, 2015
 *      Author: ngoyal
 */

#include <iostream>
//#include
using namespace std;
long long int num[1000][6000];
//long long int denom	[1000][6000];

long long int solve(long int n, long int k) {
	if (num[n][k] != -1) {
		return num[n][k];
	}
	if (k < n || k > 6 * n)
		return 0;
	if (n == 1) {
		num[n][k] = 100 / 6;
	} else {
		num[n][k] = (solve(n - 1, k - 1) + solve(n - 1, k - 2)
				+ solve(n - 1, k - 3) + solve(n - 1, k - 4)
				+ solve(n - 1, k - 5) + solve(n - 1, k - 6)) / 6;
	}
	return num[n][k];
}

//long long int getDenom(long int n){
//
//}

int main() {

	int T;
	cin >> T;
	while (T--) {
		long int n, k;
		cin >> n >> k;
		memset(num, -1, sizeof(num));
		long long int result = solve(n, k);
		cout << result << "\n";
	}
}
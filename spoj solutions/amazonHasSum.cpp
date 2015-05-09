#include <vector>
#include <list>
#include <map>
#include <set>
#include <queue>
#include <deque>
#include <stack>
#include <bitset>
#include <algorithm>
#include <functional>
#include <numeric>
#include <utility>
#include <sstream>
#include <iostream>
#include <iomanip>
#include <cstdio>
#include <cstring>
#include <cmath>
#include <cstdlib>
#include <ctime>
using namespace std;

class node 
{
    public:    
        int val;
        node * right, * left;
};

void insert(node ** tree, node * item)
{
        if(!(*tree))
        {
                *tree = item;
                return;
        }
        if(item->val<(*tree)->val)
        {
                insert(&(*tree)->left, item);
        }

        else if(item->val>(*tree)->val)
        {
                insert(&(*tree)->right, item);
        }
}


/* Write your custom functions here */
int gsum;
bool done=false;
int res(node* root, int sum){
    //cout<<"\n"<<sum;
    node *lc=root->left;
    node *rc=root->right;
    //cout<<root->left->val;
    if(lc==NULL&&rc==NULL){
        //cout<<sum<<"\n";
        if(gsum==sum){
            done=true;
            return 1;
        }
        return 0;
    }
        else{
            if(!done){
            if(lc!=NULL){
                //cout<<"\nleft "<<lc->val;
                if(res(lc,sum+lc->val)){
                    return 1;
                }
            }
            if(rc!=NULL){
                //cout<<"\nright "<<rc->val;
                if(res(rc,sum+rc->val)){
                    return 1;
                }
            }
            return 0;
        }
        }
    
}
int hasPathSum(node* root, int sum){
    gsum=sum;
    //cout<<root->val;
    return res(root,root->val);
    //return 0;
    /*
   The structure of the node is as follows:
      class node {
         public:
             node * left, *right;
             int val;
      };
*/
}


int main() {
    node  * _root, * root_curr;
    int root_i=0, root_cnt = 0, root_num = 0;
    _root = NULL;
    cin >> root_cnt;
    for(root_i = 0; root_i < root_cnt; root_i++)
    {
        scanf("%d", &root_num);
        root_curr = (node *)malloc(sizeof(node));

        root_curr->left = root_curr->right = NULL;
        root_curr->val = root_num;

        insert(&_root, root_curr);
    }
    
    int _x; 
    cin >> _x;
    cout << hasPathSum(_root, _x) << endl;
    return 0;
}

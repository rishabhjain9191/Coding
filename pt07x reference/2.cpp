#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include <cstring>
#include <queue>
#define MOD 1000000007
#define MAX 100001
using namespace std;
int a,b;
vector<vector<int> >G,G1;
bool vis[MAX];
int dp[MAX];
int n;
void Build()
{
    int node;
    fill(&vis[0],&vis[n+1],false);
    queue<int>q;
    q.push(1);
    while(!q.empty())
    {
        int top=q.front();
        q.pop();
        if(vis[top])continue;
        vis[top]=1;
        for (int i=0; i<G[top].size(); i++)
        {
            node =G[top][i];
            if(!vis[node])
            {
                q.push(node);
                G1[top].push_back(node);
            }
        }
    }
}
int solve(int node)
{
    if(G1[node].size()==0)
        return 0;
    int ans=0;
   
    for (int i=0; i<G1[node].size(); i++)
        ans+=solve(G1[node][i]);
    for (int i=0; i<G1[node].size(); i++)
    {
        if(!vis[G1[node][i]])
        {
            vis[node]=1;
            break;
        }
    }
    if(vis[node])ans++;
 
    return dp[node]=ans ;
}
int main()
{
 
    scanf("%d",&n);
    G.assign( n+1,vector<int>());
    G1.assign(n+1,vector<int>());
    fill(&dp[0],&dp[n+1],-1);
     
    for (int i=0; i<n-1; i++)
    {
        scanf("%d %d",&a,&b);
        G[a].push_back(b);
        G[b].push_back(a);
    }
    Build();
    fill(&vis[0],&vis[n+1],false);
 
 
    printf("%d\n",solve(1));
 
 
    return 0;
}
#include <stdio.h>
typedef enum{
    PSH,
    ADD,
    POP,
    SET,
    HLT
}InstructionSet;
const int program[]={
    PSH,5,
    PSH,6,
    ADD,
    POP,
    HLT
};
int ip=0;//Instruction Pointer
int main(){
    int instr=program[ip];
    return 0;
}
int fetch(){
    return program[ip];
}

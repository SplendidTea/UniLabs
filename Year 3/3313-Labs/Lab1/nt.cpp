#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>
#include <iostream>
#include <fstream>
#include <chrono>
#include <thread>
#include <signal.h>

using namespace std;
using namespace chrono;
using namespace this_thread;
int main() {

//var decs
int ret;
string userData;

// Takes user input
cout << "Enter an Input type done to exit" << endl;
cin >> userData;

//forks
ret=fork();

//parent
if (ret>0){

//kills parent and children process if "done" is detected
if(userData == "done"){

kill(0,SIGTERM);

}

//calls itself otherwise
else
{
main();
}
}

//child
if (ret==0)
{
	//uses child pid as txt name when creating file
string x= to_string(getpid());
std::ofstream outfile(x);

//infinite loop wait 1 second then writes to a new line
while(1){
sleep_for(seconds(1));
outfile << userData << endl;
}
 //ends the file writer
outfile.close();




}



//exit value
return 0;
}




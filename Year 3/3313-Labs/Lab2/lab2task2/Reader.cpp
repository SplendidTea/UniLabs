#include <iostream>
#include "SharedObject.h"
#include "Semaphore.h"

struct MyShared {
	int gnumreport;
	int gtID;
	int gDelay;
	bool isRunning;
};

int main(void)
{
	std::cout << "I am a reader" << std::endl;
Semaphore sem1("sem1" ,1,false); //semaphore decs
Semaphore sem2("sem2" ,1,false);
	Shared<MyShared> sharedMemory("sharedMemory");

//polls shared memory TODO needs to be changed with semaphores 
	while (true) {
		if (sharedMemory->isRunning == true)
		{
		sem2.Wait(); //decreases by 1
		
		//output of all the info
			std::cout << sharedMemory->gtID << " " << sharedMemory->gnumreport << " " << sharedMemory->gDelay << std::endl;
			
			
			sem1.Signal(); //increases by 1
		}

		else
		{
			break;
		}
	}
}

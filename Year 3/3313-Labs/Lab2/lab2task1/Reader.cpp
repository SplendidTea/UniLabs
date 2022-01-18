#include <iostream>
#include "SharedObject.h"


struct MyShared {
	int gnumreport;
	int gtID;
	int gDelay;
	bool isRunning;
};

int main(void)
{
	std::cout << "I am a reader" << std::endl;

	Shared<MyShared> sharedMemory("sharedMemory");

//polls shared memory TODO needs to be changed with semaphores 
	while (true) {
		if (sharedMemory->isRunning == true)
		{
			std::cout << sharedMemory->gtID << " " << sharedMemory->gnumreport << " " << sharedMemory->gDelay << std::endl;
			sleep(1);
		}

		else
		{
			break;
		}
	}
}

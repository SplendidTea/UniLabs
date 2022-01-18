
#include <iostream>
#include "SharedObject.h"
#include "thread.h"
#include "Semaphore.h"

//TODO Add semaphores for task 2, in both the reader and writer and fix 
//variable threads not being declared in the scope
struct MyShared {
	int gnumreport;
	int gtID;
	int gDelay;
	bool isRunning;
};
class WriterThread : public Thread {
public:
//var dec

	int 	threadNum;
	int		delayID;
	int		reports = 0;
	bool	flag;



	WriterThread(int in, int delay) :Thread(8 * 1000) {
		this->threadNum = in;
		this->delayID = delay; //or whatever you want/need here
	}

	virtual long ThreadMain(void) override {
		
			//declare shared memory var so this thread can access it
		
		Semaphore sem1("sem1",1,false); //Semaphore Decs
		Semaphore sem2("sem2",1,false);
			Shared<MyShared> sharedMemory("sharedMemory");
		while (true)
		{
		//sends the threadcount, reportcount, and delay to the shared memory
		
		sem1.Wait(); //Decreases by 1
			sharedMemory->gtID = threadNum;
			sharedMemory->gnumreport = reports + 1;
			sharedMemory->gDelay = delayID;

			reports++;

sem2.Signal(); //inc by 1

			usleep(delayID*100000);
			if (flag) {//Exit loop to end the thread
				break;
			}
		}
		return 0;
	}
};





int main(void)
{
	std::cout << "I am a Writer" << std::endl;

	////////////////////////////////////////////////////////////////////////
	// This is a possible starting point for using threads and shared memory. 
	// You do not have to start with this
	////////////////////////////////////////////////////////////////////////

	Shared<MyShared> shared("sharedMemory", true); //This is the owner of sharedMamory
	std::string userData;
	WriterThread*threads;
	std::string delaaynum;
	int delaynum;
	int threadc = 1;
	Semaphore sem1("sem1",1,true); //Semaphore Decs
	Semaphore sem2("sem2",1,true);
	while (true) {
		std::cout << "New Writer?" << std::endl;
		std::cin >> userData;
//if user types in Y then it moves on to the next statment


		if (userData == "Y")
		{
			std::cout << "delay plox" << std::endl;
			
			std::cin >> delaaynum;
			//user enters in delay
			delaynum=std::stoi(delaaynum);
			
			//sets the shared memory to run
			shared->isRunning = true;

//creates a new writerthread and sends threadc and delaynum
			WriterThread*threads = new WriterThread(threadc, delaynum);

//increments the thread count
			threadc++;


		}
		//if user enters N stops it
		else if (userData == "N")
		{
			shared->isRunning = false;
			break;
		}
		else {
			std::cout << "Something went wrong" << std::endl;
			break;
		}



	}
	//deletes the thread
	//example for one thread thread1
	threads->flag = true;
	delete threads;

}


////////////////////////////////////////////////////////////////////////
// This is a possible starting point for using threads and shared memory. 
// You do not have to start with this
////////////////////////////////////////////////////////////////////////


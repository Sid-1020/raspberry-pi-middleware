/* Program: Sample Program
   Purpose: Provide an example of a program structure
   File: sampleMain.c
   Programmer: G. Mobus
   Date: 9/20/13
   Description: This program is meant to provide an example of how to structure a typical
                C program. This file contains the main function and one helper function.
*/

#include <stdio.h>	// for printf and scanf functions
#include "sampleMain.h"		// The main header file needed for this program

/* Sub function prototypes need to be listed
Prototypes in the header file
*/

/* Function: main
   Uses library: libraryFiles used
   Recieves: standard parameters (see parameter list)
   Returns: normal is int for main
*/
int main (void) { //
	int errorCode = 0;
	Salary theSalary = 0.0;

	theSalary = getSalary();
	if (theSalary < MIN_SALARY || theSalary > MAX_SALARY) {
		printf("%s\n", "Error detected. Terminating program. ");
		errorCode = BAD_SALARY;
	}
	else printf("%s %f\n", "The salary entered is: ", theSalary);
	return errorCode;
}

/* Function: getSalary
   Uses library: standard I/O
   Recieves: void
   Returns: Salary
*/
Salary getSalary (void) {
	Salary salary = 0.0;

	printf ("%s", promptString);
	scanf("%f", &salary);
	printf("\n");
	return salary;
}

// end of file


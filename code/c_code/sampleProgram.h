/* Program: SampleProgram
   Purpose: Provides an example of a sample program header file
   File: sampleProgram.h
   Programmer: G. Mobus
   Date: 9/20/13
   Description: This program is meant to provide an example of how to structure a typical
                C program. This file demonstrates the use of a user-written header file for
                a program.
*/

/* Defines:
This section includes all #defines needed in the system
Internal documentation (comments) as needed
*/
#define MIN_SALARY 10.00		// minimum salary value
#define MAX_SALARY 100.00		// maximum salary value
#define BAD_SALARY 1			// error for bad salary entry

/* Hidden constants and variables if any
Internal documentation (comments) as needed
*/
char * promptString = "Enter salary (format nnn.nn): ";

/* Typedefs:
This section includes all typedef declarations
Internal documentation (comments) as needed
*/
typedef float Salary; 	// new type needed for formatted salary input

/* Function Prototypes:
This section includes all function prototypes
Internal documentation (comments) as needed
*/
// getSalary: prompts the user to input a floating point number
Salary getSalary (void);

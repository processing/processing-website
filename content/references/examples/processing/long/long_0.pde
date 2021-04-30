long a;           // Declare variable 'a' of type long and assign a large value:
//a = 2147483648; // Error: The literal of type int is out of range
a = 2147483648L;  // Instead, add an "L" to the number to mark it as a long

long b = -256;    // Declare variable 'b' and assign it the value -256
long c = a + b;   // Declare variable 'c' and assign it the sum of 'a' and 'b'
int i = (int)c;   // Converts the value of 'c' from a long to an int

 // Declare variable 'a' of type byte
byte a;

// Assign 23 to 'a'
a = 23;

// Declare variable 'b' and assign it the value -128
byte b = -128;

// Declare variable 'c' and assign it the sum of 'a' and 'b'.
// By default, when two bytes are added, they are converted
// to an integer. To keep the answer as a byte, cast them
// to a byte with the byte() conversion function
byte c = byte(a + b);

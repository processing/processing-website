String s1 = "    Somerville MA ";
println(s1);  // Prints "    Somerville MA "
String s2 = trim(s1);
println(s2);  // Prints "Somerville MA"

String[] a1 = { " inconsistent ", " spacing" };  // Note spaces
String[] a2 = trim(a1);
printArray(a2);
// Prints the following array contents to the console:
// [0] "inconsistent"
// [1] "spacing"

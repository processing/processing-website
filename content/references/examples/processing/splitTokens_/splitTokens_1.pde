// Despite the bad formatting, the data is parsed correctly.
// The ", " as delimiter means to break whenever a comma *or*
// a space is found in the String. Unlike the split() function, 
// multiple adjacent delimiters are treated as a single break.
String s = "a, b c ,,d "; 
String[] q = splitTokens(s, ", ");
println(q.length + " values found");  // Prints "4 values found"
println(q[0]);  // Prints "a"
println(q[1]);  // Prints "b"
println(q[2]);  // Prints "c"
println(q[3]);  // Prints "d"

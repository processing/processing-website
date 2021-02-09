String[] a = { "OH", "NY", "CA" };
a = splice(a, "KY", 1);  // Splice one value into an array
println(a);
// Prints the following array contents to the console:
// [0] "OH"
// [1] "KY"
// [2] "NY"
// [3] "CA"

println();  // Prints a blank line

String[] b = { "VA", "CO", "IL" };
a = splice(a, b, 2);  // Splice one array of values into another
println(a);
// Prints the following array contents to the console:
// [0] "OH"
// [1] "KY"
// [2] "VA"
// [3] "CO"
// [4] "IL"
// [5] "NY"
// [6] "CA"

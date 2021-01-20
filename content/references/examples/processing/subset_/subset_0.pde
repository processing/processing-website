String[] sa1 = { "OH", "NY", "CA", "VA", "CO", "IL" };
String[] sa2 = subset(sa1, 1);
println(sa2);
// Prints the following array contents to the console:
// [0] "NY"
// [1] "CA"
// [2] "VA"
// [3] "CO"
// [4] "IL"
println();
String[] sa3 = subset(sa1, 2, 3);
println(sa3);
// Prints the following array contents to the console:
// [0] "CA"
// [1] "VA"
// [2] "CO"

int a=200, b=40, c=90;
String sa = nf(a, 10);
println(sa);  // Prints "0000000200"
String sb = nf(b, 5);
println(sb);  // Prints "00040"
String sc = nf(c, 3);
println(sc);  // Prints "090"

float d = 200.94, e = 40.2, f = 9.012;
String sd = nf(d, 10, 4);
println(sd);  // Prints "0000000200.9400"
String se = nf(e, 5, 3);
println(se);  // Prints "00040.200"
String sf = nf(f, 3, 5);
println(sf);  // Prints "009.01200"

String sf2 = nf(f, 0, 5);
println(sf2);  // Prints "9.01200"
String sf3 = nf(f, 0, 2);
println(sf3);  // Prints "9.01"

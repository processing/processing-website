int a=200, b=-40, c=90; 
String sa = nfs(a, 10); 
println(sa);  // Prints " 0000000200" 
String sb = nfs(b, 5); 
println(sb);  // Prints "-00040" 
String sc = nfs(c, 3); 
println(sc);  // Prints " 090" 
 
float d = -200.94, e = 40.2, f = -9.012; 
String sd = nfs(d, 10, 4); 
println(sd);  // Prints "-0000000200.9400" 
String se = nfs(e, 5, 3); 
println(se);  // Prints " 00040.200" 
String sf = nfs(f, 3, 5); 
println(sf);  // Prints "-009.01200" 

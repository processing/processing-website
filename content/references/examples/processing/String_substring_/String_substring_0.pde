String str1 = "CCCP"; 
String str2 = "Rabbit"; 
String ss1 = str1.substring(2);     // Returns "CP"
String ss2 = str2.substring(3);     // Returns "bit"
String ss3 = str2.substring(0, 2);  // Returns "Ra"
println(ss1 + ":" + ss2 + ":" + ss3);  // Prints "CP:bit:Ra"

// Open a file and read its binary data 
byte b[] = loadBytes("something.dat"); 
 
// Print each value, from 0 to 255 
for (int i = 0; i < b.length; i++) { 
  // Every tenth number, start a new line 
  if ((i % 10) == 0) { 
    println(); 
  } 
  // bytes are from -128 to 127, this converts to 0 to 255 
  int a = b[i] & 0xff; 
  print(a + " "); 
} 
// Print a blank line at the end 
println(); 

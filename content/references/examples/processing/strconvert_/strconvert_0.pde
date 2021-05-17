boolean b = false;
byte y = -28;
char c = 'R';
float f = -32.6;
int i = 1024;

String sb = str(b);
String sy = str(y); 
String sc = str(c);
String sf = str(f);
String si = str(i);

sb = sb + sy + sc + sf + si;

println(sb);  // Prints 'false-28R-32.61024'

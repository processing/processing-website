import processing.net.*; 
Client myClient; 
String inString;
byte interesting = 10;

void setup() { 
  size (300, 100);
  // Connect to the local machine at port 10002.
  // This example will not run if you haven't
  // previously started a server on this port.
  myClient = new Client(this, "127.0.0.1", 10002); 
} 

void draw() { 
  if (myClient.available() > 0) { 
    background(0); 
    inString = myClient.readString(); 
    println(inString); 
  }
} 


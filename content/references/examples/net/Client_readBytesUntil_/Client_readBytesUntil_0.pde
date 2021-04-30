// Creates a client that listens for input
// until it gets a linefeed character, and puts 
// the bytes it gets into a byte[] buffer.

import processing.net.*; 
Client myClient; 
byte[] byteBuffer = new byte[12];
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
    // Read until we get a linefeed
    int byteCount = myClient.readBytesUntil(interesting, byteBuffer); 
    // Convert the byte array to a String
    String myString = new String(byteBuffer);
    // Display the string
    println(myString); 
  } 
} 


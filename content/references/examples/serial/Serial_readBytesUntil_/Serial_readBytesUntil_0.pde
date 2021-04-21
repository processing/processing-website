// Example by Tom Igoe

import processing.serial.*;

Serial myPort;  // The serial port

void setup() {
  // List all the available serial ports:
  printArray(Serial.list());
  // Open the port you are using at the rate you want:
  myPort = new Serial(this, Serial.list()[0], 9600);
  myPort.write(65);
}

void draw() {
  while (myPort.available() > 0) {
    int lf = 10;
    // Expand array size to the number of bytes you expect:
    byte[] inBuffer = new byte[7];
    myPort.readBytesUntil(lf, inBuffer);
    if (inBuffer != null) {
      String myString = new String(inBuffer);
      println(myString);
    }
  }
}


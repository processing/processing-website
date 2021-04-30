// Example by Tom Igoe

import processing.serial.*;

// The serial port:
Serial myPort;       

// List all the available serial ports:
printArray(Serial.list());

// Open the port you are using at the rate you want:
myPort = new Serial(this, Serial.list()[0], 9600);
  
// Send a capital A out the serial port:
myPort.write(65);


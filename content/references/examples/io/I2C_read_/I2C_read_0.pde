import processing.io.*;
I2C compass;

void setup() {
  //printArray(I2C.list());
  compass = new I2C(I2C.list()[0]);
}

void draw() {
  // read the heading over I2C from a compass module
  // with address 33 (hex 0x21)
  compass.beginTransmission(0x21);
  // first send a command byte
  compass.write(0x41);
  // read in two bytes
  byte[] in = compass.read(2);

  // put bytes together to tenth of degrees
  // & 0xff makes sure the byte is not interpreted as a negative value
  int deg = (in[0] & 0xff) << 8 | (in[1] & 0xff);
  println((deg / 10.0));
}


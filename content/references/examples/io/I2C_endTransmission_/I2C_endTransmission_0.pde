import processing.io.*;
I2C dac;

void setup() {
  //printArray(I2C.list());
  dac = new I2C(I2C.list()[0]);
}

void draw() {
  background(map(mouseX, 0, width, 0, 255));

  // send value over I2C to a digital-to-analog
  // converter with address 96 (hex 0x60)
  int val = int(4095 * map(mouseX, 0, width, 0.0, 1.0));
  dac.beginTransmission(0x60);
  dac.write(val >> 8);
  dac.write(val & 255);
  dac.endTransmission();
}


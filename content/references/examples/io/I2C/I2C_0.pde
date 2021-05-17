import processing.io.*;
I2C i2c;

void setup() {
  //printArray(I2C.list());
  i2c = new I2C(I2C.list()[0]);
}

void draw() {
  background(map(mouseX, 0, width, 0, 255));

  // send value over I2C to an digital-to-analog
  // converter with address 96 (hex 0x60)
  int val = int(4095 * map(mouseX, 0, width, 0.0, 1.0));
  i2c.beginTransmission(0x60);
  i2c.write(val >> 8);
  i2c.write(val & 255);
  i2c.endTransmission();
}


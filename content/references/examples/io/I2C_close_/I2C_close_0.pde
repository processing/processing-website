import processing.io.*;
I2C i2c;

void setup() {
  //printArray(I2C.list());
  i2c = new I2C(I2C.list()[0]);
  // send a value over I2C to a digital-to-analog
  // converter with address 96 (hex 0x60)
  int val = 4095;
  i2c.beginTransmission(0x60);
  i2c.write(val >> 8);
  i2c.write(val & 255);
  i2c.endTransmission();
  // and close interface again
  i2c.close();
}


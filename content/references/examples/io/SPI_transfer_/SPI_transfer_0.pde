import processing.io.*;
SPI adc;

void setup() {
  //printArray(SPI.list());
  adc = new SPI(SPI.list()[0]);
  adc.settings(500000, SPI.MSBFIRST, SPI.MODE0);
}

void draw() {
  // read in values over SPI from an analog-to-digital
  // converter
  // dummy write, actual values don't matter
  byte[] out = { 0, 0 };
  byte[] in = adc.transfer(out);
  // some input bit shifting according to the datasheet
  int val = ((in[0] & 0x1f) << 5) | ((in[1] & 0xf8) >> 3);
  // val is between 0 and 1023
  println(val);
}


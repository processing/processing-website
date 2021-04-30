import processing.io.*;

void setup() {
  println("Available I2C interfaces:");
  printArray(I2C.list());
}


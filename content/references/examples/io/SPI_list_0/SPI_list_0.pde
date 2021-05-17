import processing.io.*;

void setup() {
  println("Available SPI interfaces:");
  printArray(SPI.list());
}


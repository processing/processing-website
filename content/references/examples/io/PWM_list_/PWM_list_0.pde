import processing.io.*;

void setup() {
  println("Available PWM channels:");
  printArray(PWM.list());
}


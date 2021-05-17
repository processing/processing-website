import processing.io.*;
color bgcolor = 0;

void setup() {
  GPIO.pinMode(4, GPIO.INPUT);
  GPIO.attachInterrupt(4, this, "pinEvent", GPIO.RISING);
}

void draw() {
  background(bgcolor);
}

void pinEvent(int pin) {
  println("Received interrupt");
  bgcolor = color(255);
  // disable further interrupts from occuring on this pin
  GPIO.releaseInterrupt(pin);
}


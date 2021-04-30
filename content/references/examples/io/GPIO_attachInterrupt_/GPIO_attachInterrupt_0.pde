import processing.io.*;
color bgcolor = 0;

void setup() {
  GPIO.pinMode(4, GPIO.INPUT);
  GPIO.attachInterrupt(4, this, "pinEvent", GPIO.RISING);
}

void draw() {
  background(bgcolor);
}

// this function will be called whenever GPIO 4 is brought from low to high
void pinEvent(int pin) {
  println("Received interrupt");
  if (bgcolor == 0) {
    bgcolor = color(255);
  } else {
    bgcolor = color(0);
  }
}


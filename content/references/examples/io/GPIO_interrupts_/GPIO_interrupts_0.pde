import processing.io.*;
color bgcolor = 0;

void setup() {
  GPIO.pinMode(4, GPIO.INPUT);
  GPIO.pinMode(5, GPIO.INPUT);
  GPIO.attachInterrupt(4, this, "pinEvent", GPIO.RISING);
  GPIO.attachInterrupt(5, this, "pinEvent", GPIO.RISING);
}

void draw() {
  background(bgcolor);
}

void pinEvent(int pin) {
  GPIO.noInterrupts();
  println("Received interrupt on pin" + pin);
  if (bgcolor == 0) {
    bgcolor = color(255);
  } else {
    bgcolor = color(0);
  }
  // re-enable interrupts
  GPIO.interrupts();
}


import processing.io.*;
LED greenLed;
boolean ledOn = false;

void setup() {
  // the green LED is led0 on the Raspberry Pi
  greenLed = new LED("led0");
  frameRate(1);
}

void draw() {
  ledOn = !ledOn;
  if (ledOn) {
  	greenLed.brightness(1.0);
  } else {
  	greenLed.brightness(0.0);
  }
}

// cleanup on keypress
void keyPressed() {
  led.close();
  exit();
}


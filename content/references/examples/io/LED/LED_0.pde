import processing.io.*;
LED greenLed;
boolean ledOn = false;

void setup() {
  // list all available LEDs
  printArray(LED.list());

  // the green LED is led0 on the Raspberry Pi
  greenLed = new LED("led0");
  frameRate(0.5);
}

void draw() {
  ledOn = !ledOn;
  if (ledOn) {
  	greenLed.brightness(1.0);
  } else {
  	greenLed.brightness(0.0);
  }
}


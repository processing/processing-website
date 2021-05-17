import processing.io.*;
boolean ledOn = false;

void setup() {
  GPIO.pinMode(4, GPIO.OUTPUT);

  // On the Raspberry Pi, GPIO 4 is pin 7 on the pin header,
  // located on the fourth row, above one of the ground pins

  frameRate(0.5);
}

void draw() {
  ledOn = !ledOn;
  if (ledOn) {
    GPIO.digitalWrite(4, GPIO.LOW);
  } else {
    GPIO.digitalWrite(4, GPIO.HIGH);
  }
}

// cleanup on keypress
void keyPressed() {
  GPIO.releasePin(4);
  exit();
}


import processing.io.*;
SoftwareServo servo;

void setup() {
  servo = new SoftwareServo(this);
  servo.attach(4);

  // On the Raspberry Pi, GPIO 4 is pin 7 on the pin header,
  // located on the fourth row, above one of the ground pins
}

void draw() {
  // we don't go right to the edge to prevent
  // making the servo unhappy
  float angle = 90 + sin(frameCount / 100.0)*85;
  servo.write(angle);
}

void keyPressed() {
  // press a key to release or re-attach the motor
  if (servo.attached()) {
    servo.detach();
  } else {
    servo.attach(4);
  }
}


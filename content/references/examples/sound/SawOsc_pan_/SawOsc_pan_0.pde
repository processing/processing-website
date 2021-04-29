import processing.sound.*;
SawOsc saw;

void setup() {
  size(640, 360);
  background(255);
    
  // Create square wave oscillator.
  saw = new SawOsc(this);
  saw.play();
}

void draw() {
  // Map mouseX from -1.0 to 1.0 for left to right
  saw.pan(map(mouseX, 0, width, -1.0, 1.0));
}


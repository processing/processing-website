import processing.sound.*;
SinOsc sine;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the sine oscillator
  sine = new SinOsc(this);
  sine.play();
}      

void draw() {
  // Map mouseX from -1.0 to 1.0 for left to right
  sine.pan(map(mouseX, 0, width, -1.0, 1.0));
}


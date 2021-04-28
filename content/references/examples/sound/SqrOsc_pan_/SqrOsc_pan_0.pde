import processing.sound.*;
SqrOsc square;

void setup() {
  size(640, 360);
  background(255);
    
  // Create square wave oscillator.
  square = new SqrOsc(this);
  square.play();
}      

void draw() {
  // Map mouseX from -1.0 to 1.0 for left to right
  square.pan(map(mouseX, 0, width, -1.0, 1.0));
}


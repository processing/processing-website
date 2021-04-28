import processing.sound.*;
TriOsc triangle;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the triangle oscillator
  triangle = new TriOsc(this);
  triangle.play();
}      

void draw() {
  // Map mouseX from -1.0 to 1.0 for left to right
  triangle.pan(map(mouseX, 0, width, -1.0, 1.0));
}

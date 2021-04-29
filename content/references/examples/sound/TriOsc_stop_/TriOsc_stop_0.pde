import processing.sound.*;
TriOsc triangle;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the sine oscillator
  triangle = new TriOsc(this);
  triangle.play();
}      

void draw() {
}

void mousePressed() {
  triangle.stop();
}

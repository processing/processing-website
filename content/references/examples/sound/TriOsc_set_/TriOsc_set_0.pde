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
}

void mousePressed() {
  float freq=200;
  float amp=0.5;
  float add=0.0;
  float pos=1;
  triangle.set(freq, amp, add, pos);
}

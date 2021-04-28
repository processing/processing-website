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
}

void mousePressed() {
  float freq=200;
  float amp=0.5;
  float add=0.0;
  float pos=1;
  square.set(freq, amp, add, pos);
}

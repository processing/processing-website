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
}

void mousePressed() {
  float freq=200;
  float amp=0.5;
  float add=0.0;
  float pos=1;
  sine.set(freq, amp, add, pos);
}


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
}

void mousePressed() {
  float freq=200;
  float amp=0.5;
  float add=0.0;
  float pos=1;
  saw.set(freq, amp, add, pos);
}


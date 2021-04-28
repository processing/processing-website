import processing.sound.*;
Pulse pulse;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the pulse oscillator
  pulse = new Pulse(this);
  pulse.play();
}      

void draw() {
}

void mousePressed() {
  float freq=200;
  float plswidth=0.5;
  float amp=0.5;
  float add=0.0;
  float pos=1;
  pulse.set(freq, plswidth, amp, add, pos);
}


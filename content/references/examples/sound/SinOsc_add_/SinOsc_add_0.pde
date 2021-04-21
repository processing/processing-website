import processing.sound.*;
SinOsc sine;

void setup() {
  size(640, 360);
  background(255);
   
  // Create the sine oscillator
  sine = new SinOsc(this);
  sine.play();
  sine.add(0.5);
}      

void draw() {
}


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


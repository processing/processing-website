import processing.sound.*;
AudioIn in;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the Input stream
  in = new AudioIn(this, 0);
  in.play();
}      

void draw() {
}

void mousePressed() {
  float amp=0.5;
  float add=0.0;
  float pos=1;
  in.set(amp, add, pos);
}


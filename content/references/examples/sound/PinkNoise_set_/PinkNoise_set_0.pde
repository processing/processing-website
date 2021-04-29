import processing.sound.*;
PinkNoise noise;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the noise generator
  noise = new PinkNoise(this);
  noise.play();
}      

void draw() {
}

void mousePressed() {
  float amp=0.5;
  float add=0.0;
  float pos=1;
  noise.set(amp, add, pos);
}


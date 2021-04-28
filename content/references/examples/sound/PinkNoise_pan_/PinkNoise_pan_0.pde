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
  // Map mouseX from -1.0 to 1.0 for left to right
  noise.pan(map(mouseX, 0, width, -1.0, 1.0));
}


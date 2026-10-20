import processing.sound.*;
BrownNoise noise;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the noise generator
  noise = new BrownNoise(this);
  noise.play();
}      

void draw() {
}

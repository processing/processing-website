import processing.sound.*;
WhiteNoise noise;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the noise generator
  noise = new WhiteNoise(this);
  noise.play();
  noise.add(0.1);
}      

void draw() {
}

import processing.sound.*;

WhiteNoise noise;
LowPass lowPass;

float amp=0.0;

void setup() {
  size(640,360);
  background(255);
    
  // Create a noise generator and a bandpass filter
  noise = new WhiteNoise(this);
  lowPass = new LowPass(this);
    
  noise.play(0.5);
  lowPass.process(noise, 800);
}      

void draw() {
}
